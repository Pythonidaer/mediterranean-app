/**
 * recipeApi.ts — Phase 2 public API surface
 *
 * Phase 2 added TheMealDB as an external recipe source.
 * The implementation lives in src/services/mealDb/ and is accessed
 * via the hooks layer (useMealSearch, useIngredientRecipeSearch).
 *
 * Architecture:
 *   src/services/mealDb/mealDbClient.ts   — fetch helpers, caching, multi-ingredient search
 *   src/services/mealDb/mealDbMappers.ts  — raw API → ExternalRecipe type
 *   src/services/mealDb/mealDbTypes.ts    — TheMealDB response shapes
 *
 * Hooks (UI entry points):
 *   src/hooks/useMealSearch.ts                — name-based search with abort/retry
 *   src/hooks/useIngredientRecipeSearch.ts    — ingredient-based search with abort/retry
 *
 * Internal types:
 *   src/types/externalRecipe.ts   — ExternalRecipe, ExternalRecipeMatch
 *   src/types/recipe.ts           — curated Recipe (unchanged from Phase 1)
 *
 * To replace TheMealDB with another provider:
 *   1. Create a new src/services/<provider>/ directory.
 *   2. Implement the same ExternalRecipe output type.
 *   3. Swap the import in useMealSearch / useIngredientRecipeSearch.
 *   4. No UI component changes are required.
 */

export {
  searchMealsByName,
  getMealById,
  searchMealsByIngredients,
} from "./mealDb/mealDbClient";
