import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import IngredientInput from "../components/ingredients/IngredientInput";
import IngredientMatchCard from "../components/ingredients/IngredientMatchCard";
import { recipes } from "../data/recipes";
import { matchRecipes, getMatchLabel } from "../utils/ingredientMatching";

export default function IngredientSearchPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);

  function addIngredient(ing: string) {
    setIngredients((prev) =>
      prev.map((i) => i.toLowerCase()).includes(ing.toLowerCase())
        ? prev
        : [...prev, ing]
    );
  }

  function removeIngredient(ing: string) {
    setIngredients((prev) => prev.filter((i) => i !== ing));
  }

  const results = matchRecipes(recipes, ingredients);

  return (
    <PageContainer className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          What Can I Make?
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
          Add what's in your fridge and pantry. We'll rank recipes by how close you are to cooking them.
        </p>
      </div>

      {/* Input */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-soft">
        <IngredientInput
          ingredients={ingredients}
          onAdd={addIngredient}
          onRemove={removeIngredient}
          onClear={() => setIngredients([])}
        />
      </div>

      {/* Results */}
      {ingredients.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Add an ingredient above to find matching recipes.
        </div>
      )}

      {ingredients.length > 0 && results.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No matching recipes found. Try adding more ingredients.
        </div>
      )}

      {results.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-foreground">
            {results.length} recipe{results.length !== 1 ? "s" : ""} you can make
          </h2>

          {/* Group results by match label */}
          {(["You have everything", "Missing 1 ingredient", "Missing 2 ingredients", "Partial match"] as const).map((label) => {
            const group = results.filter(
              (r) => getMatchLabel(r.missingIngredients.length) === label
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
                  <IngredientMatchCard key={result.recipe.id} result={result} />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
