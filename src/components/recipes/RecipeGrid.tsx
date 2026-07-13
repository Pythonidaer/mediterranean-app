import type { CuratedRecipe } from "../../types/recipe";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: CuratedRecipe[];
  emptyMessage?: string;
}

export default function RecipeGrid({
  recipes,
  emptyMessage = "No recipes found.",
}: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground text-base">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
