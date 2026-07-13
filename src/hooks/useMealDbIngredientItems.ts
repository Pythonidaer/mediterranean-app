import { useState, useEffect } from "react";
import { getMealDbIngredientItems } from "../services/mealDb/mealDbClient";
import type { MealDbIngredientListItem } from "../services/mealDb/mealDbTypes";

/**
 * Fetches TheMealDB's full ingredient list (name + category type) once and
 * caches it for the session. Pre-warms as soon as any consuming component mounts.
 */
export function useMealDbIngredientItems(): MealDbIngredientListItem[] {
  const [items, setItems] = useState<MealDbIngredientListItem[]>([]);

  useEffect(() => {
    void getMealDbIngredientItems().then(setItems);
  }, []);

  return items;
}
