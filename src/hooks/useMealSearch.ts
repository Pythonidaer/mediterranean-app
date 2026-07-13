import { useState, useCallback, useRef } from "react";
import type { ExternalRecipe } from "../types/externalRecipe";
import { searchMealsByName } from "../services/mealDb/mealDbClient";

type MealSearchState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "success"; results: ExternalRecipe[]; query: string }
  | { status: "error"; error: string; query: string };

export function useMealSearch() {
  const [state, setState] = useState<MealSearchState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setState({ status: "idle" });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ status: "loading", query: trimmed });

    try {
      const results = await searchMealsByName(trimmed, controller.signal);
      if (!controller.signal.aborted) {
        setState({ status: "success", results, query: trimmed });
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        const message =
          err instanceof Error ? err.message : "Search failed. Please try again.";
        setState({ status: "error", error: message, query: trimmed });
      }
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({ status: "idle" });
  }, []);

  return { state, search, reset };
}
