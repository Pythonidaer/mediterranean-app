import { useState, useCallback, useRef } from "react";
import type { ExternalRecipeMatch } from "../types/externalRecipe";
import { searchMealsByIngredients } from "../services/mealDb/mealDbClient";

type IngredientSearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; results: ExternalRecipeMatch[] }
  | { status: "error"; error: string };

export function useIngredientRecipeSearch() {
  const [state, setState] = useState<IngredientSearchState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setState({ status: "idle" });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ status: "loading" });

    try {
      const results = await searchMealsByIngredients(ingredients, controller.signal);
      if (!controller.signal.aborted) {
        setState({ status: "success", results });
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        const message =
          err instanceof Error ? err.message : "Search failed. Please try again.";
        setState({ status: "error", error: message });
      }
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({ status: "idle" });
  }, []);

  return { state, search, reset };
}
