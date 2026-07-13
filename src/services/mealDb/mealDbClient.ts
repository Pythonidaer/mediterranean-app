import type {
  MealDbSearchResponse,
  MealDbFilterResponse,
  MealDbIngredientListResponse,
  MealDbIngredientListItem,
  MealDbLookupResponse,
  MealDbSummary,
} from "./mealDbTypes";
import type { ExternalRecipe, ExternalRecipeMatch } from "../../types/externalRecipe";
import { mapMealToExternalRecipe } from "./mealDbMappers";
import { normalizeIngredient } from "../../utils/ingredientNormalization";

const API_KEY = (import.meta.env.VITE_MEALDB_API_KEY as string | undefined) ?? "1";
const BASE_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;
const MAX_INGREDIENTS = 5;
const MAX_LOOKUPS = 12;
/** Max number of TheMealDB ingredient names to search per user ingredient. */
const MAX_WILDCARD_MATCHES = 3;

const cache = new Map<string, unknown>();

function getCached<T>(key: string): T | undefined {
  return cache.get(key) as T | undefined;
}

function setCached<T>(key: string, value: T): void {
  cache.set(key, value);
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// ─── Ingredient-list wildcard lookup ─────────────────────────────────────────

/**
 * Singleton promise so concurrent calls share one in-flight request.
 * Returns full ingredient items (name + type) from TheMealDB.
 * Exported for the Ingredient Glossary page.
 */
let _ingredientItemsPromise: Promise<MealDbIngredientListItem[]> | null = null;

export async function getMealDbIngredientItems(): Promise<MealDbIngredientListItem[]> {
  if (!_ingredientItemsPromise) {
    _ingredientItemsPromise = (async () => {
      const cacheKey = "mealdb:ingredientitems";
      const cached = getCached<MealDbIngredientListItem[]>(cacheKey);
      if (cached) return cached;

      try {
        const url = `${BASE_URL}/list.php?i=list`;
        const data = await fetchJson<MealDbIngredientListResponse>(url);
        const items = data.meals ?? [];
        setCached(cacheKey, items);
        return items;
      } catch {
        return [];
      }
    })();
  }
  return _ingredientItemsPromise;
}

/**
 * Returns just the ingredient name strings (derived from the full items cache).
 * Exported so UI hooks can pre-warm the cache on mount.
 */
let _ingredientListPromise: Promise<string[]> | null = null;

export async function getMealDbIngredientList(): Promise<string[]> {
  if (!_ingredientListPromise) {
    _ingredientListPromise = getMealDbIngredientItems().then((items) =>
      items.map((i) => i.strIngredient),
    );
  }
  return _ingredientListPromise;
}

/**
 * Given a user query (already alias-normalized), return the TheMealDB ingredient
 * names that best match it, ranked by specificity.
 *
 * Scoring (lower = better):
 *   0 – exact match (case-insensitive)
 *   1 – simple plural/singular  (e.g. "potato" ↔ "Potatoes")
 *   2 – TheMealDB name ends with the query as a word  ("Charlotte Potatoes")
 *   3 – TheMealDB name starts with the query as a word ("Chicken Breast")
 *
 * Results are capped at MAX_WILDCARD_MATCHES to limit parallel API calls.
 */
function findMatchingMealDbIngredients(
  query: string,
  allIngredients: string[]
): string[] {
  const q = query.toLowerCase();

  type Scored = { ing: string; score: number };
  const scored: Scored[] = [];

  for (const ing of allIngredients) {
    const il = ing.toLowerCase();

    if (il === q) {
      scored.push({ ing, score: 0 });
    } else if (il === q + "s" || il === q + "es" || q === il + "s" || q === il + "es") {
      // Simple plural/singular pairs: potato↔potatoes, mushroom↔mushrooms
      scored.push({ ing, score: 1 });
    } else if (il.endsWith(" " + q) || il.endsWith(" " + q + "s") || il.endsWith(" " + q + "es")) {
      // Name ends with the query as a whole word: "Charlotte Potatoes"
      scored.push({ ing, score: 2 });
    } else if (il.startsWith(q + " ")) {
      // Name starts with the query: "Chicken Breast", "Mushroom Sauce"
      scored.push({ ing, score: 3 });
    }
  }

  return scored
    .sort((a, b) => a.score - b.score)
    .slice(0, MAX_WILDCARD_MATCHES)
    .map((s) => s.ing);
}

// ─── Low-level filter call (exact TheMealDB ingredient name) ─────────────────

async function filterByExactMealDbIngredient(
  mealDbName: string,
  signal?: AbortSignal
): Promise<MealDbSummary[]> {
  const cacheKey = `mealdb:ingredient:${mealDbName.toLowerCase()}`;
  const cached = getCached<MealDbSummary[]>(cacheKey);
  if (cached) return cached;

  const url = `${BASE_URL}/filter.php?i=${encodeURIComponent(mealDbName)}`;
  const data = await fetchJson<MealDbFilterResponse>(url, signal);

  const results = data.meals ?? [];
  setCached(cacheKey, results);
  return results;
}

// ─── Public filter: resolves user input → matching TheMealDB names → meals ───

async function filterMealsByIngredient(
  ingredient: string,
  signal?: AbortSignal
): Promise<MealDbSummary[]> {
  const normalized = normalizeIngredient(ingredient);

  // Try to resolve via the wildcard ingredient list.
  const allIngredients = await getMealDbIngredientList();
  const matchingNames =
    allIngredients.length > 0
      ? findMatchingMealDbIngredients(normalized, allIngredients)
      : [normalized]; // fallback: use normalized name directly

  if (matchingNames.length === 0) return [];

  const settled = await Promise.allSettled(
    matchingNames.map((name) => filterByExactMealDbIngredient(name, signal))
  );

  // Merge results, deduplicating by meal ID.
  const seen = new Set<string>();
  const merged: MealDbSummary[] = [];
  for (const result of settled) {
    if (result.status === "fulfilled") {
      for (const meal of result.value) {
        if (!seen.has(meal.idMeal)) {
          seen.add(meal.idMeal);
          merged.push(meal);
        }
      }
    }
  }
  return merged;
}

export async function searchMealsByName(
  query: string,
  signal?: AbortSignal
): Promise<ExternalRecipe[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const cacheKey = `mealdb:name:${normalizeIngredient(trimmed)}`;
  const cached = getCached<ExternalRecipe[]>(cacheKey);
  if (cached) return cached;

  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(trimmed)}`;
  const data = await fetchJson<MealDbSearchResponse>(url, signal);

  if (!data.meals) return [];

  const results = data.meals.map(mapMealToExternalRecipe);
  setCached(cacheKey, results);
  return results;
}

export async function getMealById(
  id: string,
  signal?: AbortSignal
): Promise<ExternalRecipe | null> {
  const cacheKey = `mealdb:meal:${id}`;
  const cached = getCached<ExternalRecipe>(cacheKey);
  if (cached) return cached;

  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  const data = await fetchJson<MealDbLookupResponse>(url, signal);

  if (!data.meals || data.meals.length === 0) return null;

  const result = mapMealToExternalRecipe(data.meals[0]);
  setCached(cacheKey, result);
  return result;
}

function ingredientsMatch(userNorm: string, recipeNorm: string): boolean {
  return (
    userNorm === recipeNorm ||
    userNorm.includes(recipeNorm) ||
    recipeNorm.includes(userNorm)
  );
}

export async function searchMealsByIngredients(
  ingredients: string[],
  signal?: AbortSignal
): Promise<ExternalRecipeMatch[]> {
  if (ingredients.length === 0) return [];

  const normalized = [
    ...new Set(ingredients.map(normalizeIngredient)),
  ].slice(0, MAX_INGREDIENTS);

  const settledResults = await Promise.allSettled(
    normalized.map((ing) => filterMealsByIngredient(ing, signal))
  );

  type MealEntry = {
    summary: MealDbSummary;
    matchCount: number;
    matchedInputs: string[];
  };
  const mealMap = new Map<string, MealEntry>();

  settledResults.forEach((result, index) => {
    if (result.status !== "fulfilled") return;
    const inputIngredient = normalized[index];
    for (const summary of result.value) {
      const existing = mealMap.get(summary.idMeal);
      if (existing) {
        existing.matchCount += 1;
        existing.matchedInputs.push(inputIngredient);
      } else {
        mealMap.set(summary.idMeal, {
          summary,
          matchCount: 1,
          matchedInputs: [inputIngredient],
        });
      }
    }
  });

  const candidates = [...mealMap.values()]
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, MAX_LOOKUPS);

  if (candidates.length === 0) return [];

  const detailResults = await Promise.allSettled(
    candidates.map((c) => getMealById(c.summary.idMeal, signal))
  );

  const matches: ExternalRecipeMatch[] = [];

  detailResults.forEach((result) => {
    if (result.status !== "fulfilled" || !result.value) return;
    const recipe = result.value;

    const matchedIngredients: string[] = [];
    const missingIngredients: string[] = [];

    for (const ing of recipe.ingredients) {
      const normalizedRecipeIng = normalizeIngredient(ing.normalizedName);
      const hasIt = normalized.some((userIng) =>
        ingredientsMatch(normalizeIngredient(userIng), normalizedRecipeIng)
      );

      if (hasIt) {
        matchedIngredients.push(ing.name);
      } else {
        missingIngredients.push(ing.name);
      }
    }

    const matchPercentage =
      recipe.ingredients.length === 0
        ? 0
        : Math.round((matchedIngredients.length / recipe.ingredients.length) * 100);

    const enteredIngredientMatchCount = normalized.filter((userIng) => {
      const normalizedUserIng = normalizeIngredient(userIng);
      return recipe.ingredients.some((recipeIng) =>
        ingredientsMatch(normalizedUserIng, normalizeIngredient(recipeIng.normalizedName))
      );
    }).length;

    matches.push({
      recipe,
      matchedIngredients,
      missingIngredients,
      enteredIngredientMatchCount,
      enteredIngredientCount: ingredients.length,
      recipeIngredientCount: recipe.ingredients.length,
      matchPercentage,
    });
  });

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
