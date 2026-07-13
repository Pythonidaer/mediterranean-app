import type {
  MealDbSearchResponse,
  MealDbFilterResponse,
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

async function filterMealsByIngredient(
  ingredient: string,
  signal?: AbortSignal
): Promise<MealDbSummary[]> {
  const normalized = normalizeIngredient(ingredient);
  const cacheKey = `mealdb:ingredient:${normalized}`;
  const cached = getCached<MealDbSummary[]>(cacheKey);
  if (cached) return cached;

  const url = `${BASE_URL}/filter.php?i=${encodeURIComponent(normalized)}`;
  const data = await fetchJson<MealDbFilterResponse>(url, signal);

  const results = data.meals ?? [];
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
