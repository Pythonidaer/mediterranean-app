import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, RefreshCw } from "lucide-react";
import { curatedRecipes } from "../data/curatedRecipes";
import RecipeFilters from "../components/recipes/RecipeFilters";
import RecipeGrid from "../components/recipes/RecipeGrid";
import ExternalRecipeCard from "../components/recipes/ExternalRecipeCard";
import PageContainer from "../components/layout/PageContainer";
import { filterAndSearch } from "../utils/recipeFilters";
import { useMealSearch } from "../hooks/useMealSearch";

const MIN_QUERY_LENGTH = 3;

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const { state: externalState, search: searchExternal, reset: resetExternal } =
    useMealSearch();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    if (!searchQuery) {
      resetExternal();
    }
  }, [searchQuery, resetExternal]);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    const params: Record<string, string> = {};
    if (cat !== "All") params.category = cat;
    setSearchParams(params);
  }

  function handleExternalSearch() {
    void searchExternal(searchQuery);
  }

  const filtered = filterAndSearch(curatedRecipes, activeCategory, searchQuery);
  const canSearchExternal =
    searchQuery.trim().length >= MIN_QUERY_LENGTH &&
    externalState.status !== "loading";

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-1">
          Curated Recipes
        </h1>
        <p className="text-muted-foreground text-sm">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} — all
          batch-friendly and Mediterranean.
        </p>
      </div>

      <div className="mb-8">
        <RecipeFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {canSearchExternal && (
          <div className="mt-3">
            {externalState.status === "idle" && (
              <button
                onClick={handleExternalSearch}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Search size={14} />
                Search TheMealDB for &ldquo;{searchQuery}&rdquo;
              </button>
            )}
            {(externalState.status === "success" ||
              externalState.status === "error") && (
              <button
                onClick={handleExternalSearch}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
              >
                <RefreshCw size={14} />
                Search TheMealDB again
              </button>
            )}
          </div>
        )}
      </div>

      <RecipeGrid
        recipes={filtered}
        emptyMessage="No recipes match your search. Try a different filter or keyword."
      />

      {/* External name search results */}
      {(externalState.status === "loading" ||
        externalState.status === "success" ||
        externalState.status === "error") && (
        <section
          aria-labelledby="external-name-heading"
          className="mt-12 pt-10 border-t border-border"
        >
          <h2
            id="external-name-heading"
            className="text-xl font-bold text-foreground mb-6"
          >
            Recipes from TheMealDB
          </h2>

          <div aria-live="polite" aria-atomic="true">
            {externalState.status === "loading" && (
              <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">
                  Searching TheMealDB for &ldquo;
                  {externalState.query}&rdquo;...
                </p>
              </div>
            )}

            {externalState.status === "error" && (
              <div className="text-center py-10">
                <p className="text-sm text-muted-foreground mb-4">
                  {externalState.error}
                </p>
                <button
                  onClick={handleExternalSearch}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <RefreshCw size={14} />
                  Retry
                </button>
              </div>
            )}

            {externalState.status === "success" &&
              externalState.results.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No results found on TheMealDB for &ldquo;
                  {externalState.query}&rdquo;.
                </p>
              )}

            {externalState.status === "success" &&
              externalState.results.length > 0 && (
                <>
                  <p className="text-sm text-muted-foreground mb-5">
                    {externalState.results.length} result
                    {externalState.results.length !== 1 ? "s" : ""} for
                    &ldquo;{externalState.query}&rdquo;
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {externalState.results.map((recipe) => (
                      <ExternalRecipeCard
                        key={recipe.externalId}
                        recipe={recipe}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-6">
                    Recipe data provided by TheMealDB.
                  </p>
                </>
              )}
          </div>
        </section>
      )}
    </PageContainer>
  );
}
