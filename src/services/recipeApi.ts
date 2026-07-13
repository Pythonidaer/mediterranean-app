/**
 * recipeApi.ts — Phase 2 service stub
 *
 * This file is intentionally empty in Phase 1.
 * When Phase 2 begins, this module will be responsible for:
 *
 * - Fetching recipes from an external API (e.g. Spoonacular, Edamam, or a custom backend)
 * - Searching recipes by multiple ingredients via API queries
 * - Transforming raw API responses into the internal `Recipe` type
 * - Handling loading, empty, and error states
 * - Separating curated local recipes from externally fetched results
 * - Optionally caching API responses to reduce network requests
 *
 * UI components must never import from this file directly in Phase 1.
 * They should always consume data via local `recipes.ts` or the hooks layer.
 * This separation ensures Phase 2 can be added without rewriting the UI.
 *
 * Example Phase 2 interface:
 *
 * import type { Recipe } from "../types/recipe";
 *
 * export async function searchByIngredients(ingredients: string[]): Promise<Recipe[]> {
 *   // 1. Call external API
 *   // 2. Map response to internal Recipe type
 *   // 3. Return normalized results
 * }
 *
 * export async function fetchRecipeById(externalId: string): Promise<Recipe> {
 *   // Fetch and normalize a single recipe
 * }
 */

export {};
