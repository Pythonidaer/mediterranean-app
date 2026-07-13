import type { Recipe, IngredientMatchResult } from "../types/recipe";

const ALIASES: Record<string, string> = {
  "garbanzo beans": "chickpeas",
  "garbanzo": "chickpeas",
  "chickpea": "chickpeas",
  "bell peppers": "bell pepper",
  "green pepper": "bell pepper",
  "red pepper": "bell pepper",
  "tomatoes": "tomato",
  "cherry tomatoes": "tomato",
  "crushed tomatoes": "tomato",
  "sun-dried tomatoes": "tomato",
  "eggplant": "eggplant",
  "aubergine": "eggplant",
  "courgette": "courgette",
  "zucchini": "courgette",
  "coriander": "coriander",
  "cilantro": "coriander",
  "greek yoghurt": "greek yogurt",
  "natural yogurt": "greek yogurt",
  "yogurt": "greek yogurt",
  "kalamata olives": "olives",
  "black olives": "olives",
  "green olives": "olives",
  "olive": "olives",
  "lemon juice": "lemon",
  "lemons": "lemon",
  "chicken breast": "chicken",
  "chicken thighs": "chicken",
  "chicken thigh": "chicken",
  "ground turkey": "turkey",
  "minced turkey": "turkey",
  "puy lentils": "lentils",
  "red lentils": "lentils",
  "green lentils": "lentils",
  "cannellini beans": "cannellini beans",
  "white beans": "cannellini beans",
  "baby spinach": "spinach",
  "fresh spinach": "spinach",
};

export function normalizeIngredient(name: string): string {
  const lower = name.toLowerCase().trim();
  return ALIASES[lower] ?? lower;
}

export function matchRecipes(
  recipes: Recipe[],
  userIngredients: string[]
): IngredientMatchResult[] {
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
