import { useState, useEffect } from "react";
import { getMealDbIngredientList } from "../services/mealDb/mealDbClient";

/**
 * Fetches TheMealDB's canonical ingredient vocabulary once and caches it for
 * the session. The list pre-warms as soon as any component that uses this hook
 * mounts, so it is ready before the user starts typing.
 */
export function useMealDbIngredientList(): string[] {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    void getMealDbIngredientList().then(setList);
  }, []);

  return list;
}
