import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { recipes } from "../data/recipes";
import RecipeFilters from "../components/recipes/RecipeFilters";
import RecipeGrid from "../components/recipes/RecipeGrid";
import PageContainer from "../components/layout/PageContainer";
import { filterAndSearch } from "../utils/recipeFilters";

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    const params: Record<string, string> = {};
    if (cat !== "All") params.category = cat;
    setSearchParams(params);
  }

  const filtered = filterAndSearch(recipes, activeCategory, searchQuery);

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-1">Recipes</h1>
        <p className="text-muted-foreground text-sm">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} — all batch-friendly and Mediterranean.
        </p>
      </div>

      <div className="mb-8">
        <RecipeFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <RecipeGrid
        recipes={filtered}
        emptyMessage="No recipes match your search. Try a different filter or keyword."
      />
    </PageContainer>
  );
}
