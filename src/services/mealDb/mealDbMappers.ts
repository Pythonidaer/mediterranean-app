import type { MealDbMeal } from "./mealDbTypes";
import type { ExternalRecipe, ExternalRecipeIngredient } from "../../types/externalRecipe";
import { normalizeIngredient } from "../../utils/ingredientNormalization";

function extractIngredients(meal: MealDbMeal): ExternalRecipeIngredient[] {
  const ingredients: ExternalRecipeIngredient[] = [];

  for (let index = 1; index <= 20; index += 1) {
    const name = meal[`strIngredient${index}`];
    const measure = meal[`strMeasure${index}`];

    if (!name?.trim()) {
      continue;
    }

    ingredients.push({
      name: name.trim(),
      normalizedName: normalizeIngredient(name),
      amount: measure?.trim() ?? "",
    });
  }

  return ingredients;
}

function parseInstructions(raw: string | null): string[] {
  if (!raw?.trim()) return [];
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => !/^\d+\.?$/.test(s));
}

function parseTags(raw: string | null): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

export function mapMealToExternalRecipe(meal: MealDbMeal): ExternalRecipe {
  return {
    source: "themealdb",
    externalId: meal.idMeal,
    slug: `themealdb-${meal.idMeal}`,
    title: meal.strMeal,
    imageUrl: meal.strMealThumb ?? undefined,
    providerCategory: meal.strCategory ?? undefined,
    cuisine: meal.strArea ?? undefined,
    tags: parseTags(meal.strTags),
    ingredients: extractIngredients(meal),
    instructions: parseInstructions(meal.strInstructions),
    sourceUrl: meal.strSource ?? undefined,
    youtubeUrl: meal.strYoutube ?? undefined,
  };
}

export { parseInstructions, extractIngredients, parseTags };
