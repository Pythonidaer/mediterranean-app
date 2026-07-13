import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, RefreshCw } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import IngredientInput from "../components/ingredients/IngredientInput";
import IngredientMatchCard from "../components/ingredients/IngredientMatchCard";
import ExternalRecipeMatchCard from "../components/ingredients/ExternalRecipeMatchCard";
import { getExternalMatchLabel } from "../utils/externalMatchLabel";
import { curatedRecipes } from "../data/curatedRecipes";
import { matchRecipes, getMatchLabel } from "../utils/ingredientMatching";
import { useIngredientRecipeSearch } from "../hooks/useIngredientRecipeSearch";

const LOCAL_LABEL_ORDER = [
  "You have everything",
  "Missing 1 ingredient",
  "Missing 2 ingredients",
  "Partial match",
] as const;

const EXTERNAL_LABEL_ORDER = [
  "You have everything",
  "Strong ingredient match",
  "Good ingredient match",
  "Partial ingredient match",
] as const;

type ButtonState = "disabled" | "ready" | "dirty" | "searching";

export default function IngredientSearchPage() {
  const location = useLocation();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [submittedIngredients, setSubmittedIngredients] = useState<string[]>(
    [],
  );

  // Pre-fill an ingredient when navigating here from the Ingredient Glossary.
  const prefillIngredient = (
    location.state as { add?: string } | null
  )?.add;
  useEffect(() => {
    if (!prefillIngredient) return;
    setSelectedIngredients((prev) =>
      prev.map((i) => i.toLowerCase()).includes(prefillIngredient.toLowerCase())
        ? prev
        : [...prev, prefillIngredient],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [includeExternal, setIncludeExternal] = useState(true);
  const [externalWasSearched, setExternalWasSearched] = useState(false);

  const { state: externalState, search: searchExternal, reset: resetExternal } =
    useIngredientRecipeSearch();

  const hasSearched = submittedIngredients.length > 0;

  const isDirty =
    hasSearched &&
    (selectedIngredients.length !== submittedIngredients.length ||
      [...selectedIngredients].sort().join(",") !==
        [...submittedIngredients].sort().join(","));

  const isSearching = externalState.status === "loading";

  const buttonState: ButtonState = isSearching
    ? "searching"
    : selectedIngredients.length === 0
      ? "disabled"
      : isDirty
        ? "dirty"
        : "ready";

  const buttonLabel =
    buttonState === "searching"
      ? "Finding Recipes..."
      : buttonState === "dirty"
        ? "Update Results"
        : "Find Recipes";

  const localResults = hasSearched
    ? matchRecipes(curatedRecipes, submittedIngredients)
    : [];

  function handleSearch() {
    if (selectedIngredients.length === 0 || isSearching) return;
    const toSearch = [...selectedIngredients];
    setSubmittedIngredients(toSearch);
    setExternalWasSearched(includeExternal);
    if (includeExternal) {
      void searchExternal(toSearch);
    } else {
      resetExternal();
    }
  }

  function handleRetry() {
    setExternalWasSearched(true);
    void searchExternal(submittedIngredients);
  }

  function handleToggleExternal(checked: boolean) {
    setIncludeExternal(checked);
    if (!checked) {
      resetExternal();
      setExternalWasSearched(false);
    }
  }

  function addIngredient(ing: string) {
    setSelectedIngredients((prev) =>
      prev.map((i) => i.toLowerCase()).includes(ing.toLowerCase())
        ? prev
        : [...prev, ing],
    );
  }

  function removeIngredient(ing: string) {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ing));
  }

  function clearIngredients() {
    setSelectedIngredients([]);
  }

  return (
    <PageContainer className="max-w-3xl mx-auto">
      {/* Page heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          What Can I Make?
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
          Add what's in your fridge and pantry — we'll search curated recipes
          and beyond in one go.
        </p>
      </div>

      {/* Search card */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-soft">
        <IngredientInput
          ingredients={selectedIngredients}
          onAdd={addIngredient}
          onRemove={removeIngredient}
          onClear={clearIngredients}
          onSubmit={handleSearch}
          actionSlot={
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Primary action button */}
              <button
                onClick={handleSearch}
                disabled={
                  buttonState === "disabled" || buttonState === "searching"
                }
                aria-disabled={
                  buttonState === "disabled" || buttonState === "searching"
                }
                className={`shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all focus-visible:outline-2 focus-visible:outline-ring ${
                  buttonState === "disabled"
                    ? "bg-primary/40 text-primary-foreground cursor-not-allowed"
                    : buttonState === "searching"
                      ? "bg-primary/70 text-primary-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {buttonState === "searching" ? (
                  <span
                    aria-hidden="true"
                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"
                  />
                ) : (
                  <Search size={16} aria-hidden="true" />
                )}
                {buttonLabel}
              </button>

              {/* External search toggle */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <div className="relative shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={includeExternal}
                    onChange={(e) => handleToggleExternal(e.target.checked)}
                    className="sr-only peer"
                    aria-describedby="external-toggle-desc"
                  />
                  <div className="block w-9 h-5 bg-muted rounded-full peer-checked:bg-primary transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4 pointer-events-none" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">
                    Include additional recipe ideas
                  </span>
                  <p
                    id="external-toggle-desc"
                    className="text-xs text-muted-foreground leading-relaxed mt-0.5"
                  >
                    Searches TheMealDB for recipes beyond the curated
                    collection.
                  </p>
                </div>
              </label>
            </div>
          }
        />
      </div>

      {/* Search summary */}
      {hasSearched && (
        <p className="text-sm text-muted-foreground mb-6">
          Showing matches for:{" "}
          <span className="font-medium text-foreground">
            {submittedIngredients.join(", ")}
          </span>
        </p>
      )}

      {/* Section 1: Curated recipes */}
      <section aria-labelledby="local-results-heading" className="mb-10">
        <h2
          id="local-results-heading"
          className="text-base font-bold text-foreground mb-4"
        >
          Matches from our recipes
        </h2>

        {!hasSearched ? (
          <div className="bg-card border border-border rounded-2xl p-6 text-sm text-muted-foreground text-center leading-relaxed">
            Add a few ingredients to see which curated recipes are the closest
            match.
          </div>
        ) : localResults.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-6 text-sm text-muted-foreground text-center">
            No curated recipes matched those ingredients.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-muted-foreground">
              {localResults.length} recipe
              {localResults.length !== 1 ? "s" : ""}
            </p>
            {LOCAL_LABEL_ORDER.map((label) => {
              const group = localResults.filter(
                (r) => getMatchLabel(r.missingIngredients.length) === label,
              );
              if (group.length === 0) return null;
              return (
                <div key={label} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        label === "You have everything"
                          ? "bg-cucumber/20 text-cucumber-foreground"
                          : label === "Missing 1 ingredient"
                            ? "bg-lemon/50 text-lemon-foreground"
                            : label === "Missing 2 ingredients"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {group.length} recipe{group.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {group.map((result) => (
                    <IngredientMatchCard
                      key={result.recipe.id}
                      result={result}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 2: TheMealDB external */}
      <section
        aria-labelledby="external-results-heading"
        className="border-t border-border pt-10"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2
            id="external-results-heading"
            className="text-base font-bold text-foreground"
          >
            More recipe ideas
          </h2>
          <span className="text-xs text-muted-foreground">
            Powered by TheMealDB
          </span>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {/* Pre-search placeholder */}
          {!hasSearched || !externalWasSearched ? (
            <div className="bg-card border border-border rounded-2xl p-6 text-sm text-muted-foreground text-center leading-relaxed">
              {includeExternal
                ? "Include additional recipes to search beyond the curated collection."
                : 'Enable "Include additional recipe ideas" above to also search TheMealDB.'}
            </div>
          ) : externalState.status === "loading" ? (
            <div className="flex flex-col items-center gap-3 py-10 text-muted-foreground">
              <div
                aria-hidden="true"
                className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"
              />
              <p className="text-sm">Looking for more recipe ideas...</p>
            </div>
          ) : externalState.status === "error" ? (
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                Additional recipes couldn't be loaded.
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Your curated matches are still available above.
              </p>
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
              >
                <RefreshCw size={14} aria-hidden="true" />
                Retry
              </button>
            </div>
          ) : externalState.status === "success" &&
            externalState.results.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-6 text-sm text-muted-foreground text-center">
              No additional recipes were found.
            </div>
          ) : externalState.status === "success" &&
            externalState.results.length > 0 ? (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-muted-foreground">
                {externalState.results.length} result
                {externalState.results.length !== 1 ? "s" : ""}
              </p>
              {EXTERNAL_LABEL_ORDER.map((label) => {
                const group = externalState.results.filter(
                  (r) => getExternalMatchLabel(r.matchPercentage) === label,
                );
                if (group.length === 0) return null;
                return (
                  <div key={label} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          label === "You have everything" ||
                          label === "Strong ingredient match"
                            ? "bg-cucumber/20 text-cucumber-foreground"
                            : label === "Good ingredient match"
                              ? "bg-lemon/50 text-lemon-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {group.length} recipe{group.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {group.map((result) => (
                      <ExternalRecipeMatchCard
                        key={result.recipe.externalId}
                        result={result}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>
    </PageContainer>
  );
}
