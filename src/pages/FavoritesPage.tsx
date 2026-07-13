import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import RecipeGrid from "../components/recipes/RecipeGrid";
import { useFavorites } from "../hooks/useFavorites";
import { recipes } from "../data/recipes";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-1">Favorites</h1>
        <p className="text-muted-foreground text-sm">
          Everything you've saved, ready when you're planning your week.
        </p>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="bg-card border border-border rounded-3xl p-14 flex flex-col items-center text-center gap-5">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
            <Heart size={24} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">
              You haven't saved any recipes yet
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Tap the heart on any recipe to keep it here for your next meal-prep Sunday.
            </p>
          </div>
          <Link
            to="/recipes"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
          >
            Browse recipes
          </Link>
        </div>
      ) : (
        <RecipeGrid
          recipes={favoriteRecipes}
          emptyMessage="No saved recipes."
        />
      )}
    </PageContainer>
  );
}
