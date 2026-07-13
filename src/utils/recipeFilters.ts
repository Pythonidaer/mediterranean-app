import type { CuratedRecipe } from "../types/recipe";
import { totalMinutes } from "./time";

export function filterByCategory(recipes: CuratedRecipe[], category: string): CuratedRecipe[] {
  if (!category || category === "All") return recipes;
  if (category === "Quick") {
    return recipes.filter((r) => totalMinutes(r.prepMinutes, r.cookMinutes) <= 30);
  }
  return recipes.filter((r) =>
    r.categories.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}

export function searchRecipes(recipes: CuratedRecipe[], query: string): CuratedRecipe[] {
  if (!query.trim()) return recipes;
  const q = query.toLowerCase().trim();
  return recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(q))
  );
}

export function filterAndSearch(
  recipes: CuratedRecipe[],
  category: string,
  query: string
): CuratedRecipe[] {
  return searchRecipes(filterByCategory(recipes, category), query);
}
