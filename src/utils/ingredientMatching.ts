import type { CuratedRecipe, CuratedIngredientMatchResult } from "../types/recipe";
import { normalizeIngredient } from "./ingredientNormalization";

export { normalizeIngredient } from "./ingredientNormalization";

export function matchRecipes(
  recipes: CuratedRecipe[],
  userIngredients: string[]
): CuratedIngredientMatchResult[] {
  if (userIngredients.length === 0) return [];

  const normalizedUser = userIngredients.map(normalizeIngredient);

  return recipes
    .map((recipe) => {
      const required = recipe.ingredients.filter((i) => !i.optional);
      const matched: string[] = [];
      const missing: string[] = [];

      for (const ing of required) {
        const normalizedIng = normalizeIngredient(ing.normalizedName);
        const hasIt = normalizedUser.some((u) => {
          const normalizedU = normalizeIngredient(u);
          return (
            normalizedU === normalizedIng ||
            normalizedU.includes(normalizedIng) ||
            normalizedIng.includes(normalizedU)
          );
        });

        if (hasIt) {
          matched.push(ing.name);
        } else {
          missing.push(ing.name);
        }
      }

      const matchPercentage =
        required.length === 0
          ? 100
          : Math.round((matched.length / required.length) * 100);

      return {
        recipe,
        matchPercentage,
        matchedIngredients: matched,
        missingIngredients: missing,
      };
    })
    .filter((r) => r.matchPercentage > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}

export function getMatchLabel(missing: number): string {
  if (missing === 0) return "You have everything";
  if (missing === 1) return "Missing 1 ingredient";
  if (missing === 2) return "Missing 2 ingredients";
  return "Partial match";
}
