import { describe, it, expect } from "vitest";
import {
  mapMealToExternalRecipe,
  parseInstructions,
  extractIngredients,
  parseTags,
} from "../services/mealDb/mealDbMappers";
import type { MealDbMeal } from "../services/mealDb/mealDbTypes";

function makeMeal(overrides: Partial<MealDbMeal> = {}): MealDbMeal {
  return {
    idMeal: "52772",
    strMeal: "Test Meal",
    strCategory: "Chicken",
    strArea: "British",
    strInstructions: null,
    strMealThumb: "https://example.com/img.jpg",
    strTags: null,
    strYoutube: null,
    strSource: null,
    strIngredient1: null,
    strIngredient2: null,
    strIngredient3: null,
    strIngredient4: null,
    strIngredient5: null,
    strIngredient6: null,
    strIngredient7: null,
    strIngredient8: null,
    strIngredient9: null,
    strIngredient10: null,
    strIngredient11: null,
    strIngredient12: null,
    strIngredient13: null,
    strIngredient14: null,
    strIngredient15: null,
    strIngredient16: null,
    strIngredient17: null,
    strIngredient18: null,
    strIngredient19: null,
    strIngredient20: null,
    strMeasure1: null,
    strMeasure2: null,
    strMeasure3: null,
    strMeasure4: null,
    strMeasure5: null,
    strMeasure6: null,
    strMeasure7: null,
    strMeasure8: null,
    strMeasure9: null,
    strMeasure10: null,
    strMeasure11: null,
    strMeasure12: null,
    strMeasure13: null,
    strMeasure14: null,
    strMeasure15: null,
    strMeasure16: null,
    strMeasure17: null,
    strMeasure18: null,
    strMeasure19: null,
    strMeasure20: null,
    ...overrides,
  };
}

describe("mapMealToExternalRecipe", () => {
  it("sets source to themealdb", () => {
    const recipe = mapMealToExternalRecipe(makeMeal());
    expect(recipe.source).toBe("themealdb");
  });

  it("maps idMeal to externalId", () => {
    const recipe = mapMealToExternalRecipe(makeMeal({ idMeal: "99999" }));
    expect(recipe.externalId).toBe("99999");
  });

  it("generates slug from idMeal", () => {
    const recipe = mapMealToExternalRecipe(makeMeal({ idMeal: "12345" }));
    expect(recipe.slug).toBe("themealdb-12345");
  });

  it("maps strMeal to title", () => {
    const recipe = mapMealToExternalRecipe(makeMeal({ strMeal: "Butter Chicken" }));
    expect(recipe.title).toBe("Butter Chicken");
  });

  it("maps strCategory to providerCategory", () => {
    const recipe = mapMealToExternalRecipe(makeMeal({ strCategory: "Seafood" }));
    expect(recipe.providerCategory).toBe("Seafood");
  });

  it("sets providerCategory to undefined when null", () => {
    const recipe = mapMealToExternalRecipe(makeMeal({ strCategory: null }));
    expect(recipe.providerCategory).toBeUndefined();
  });

  it("maps strArea to cuisine", () => {
    const recipe = mapMealToExternalRecipe(makeMeal({ strArea: "Italian" }));
    expect(recipe.cuisine).toBe("Italian");
  });

  it("maps strMealThumb to imageUrl", () => {
    const recipe = mapMealToExternalRecipe(
      makeMeal({ strMealThumb: "https://img.example.com/meal.jpg" })
    );
    expect(recipe.imageUrl).toBe("https://img.example.com/meal.jpg");
  });

  it("sets imageUrl to undefined when null", () => {
    const recipe = mapMealToExternalRecipe(makeMeal({ strMealThumb: null }));
    expect(recipe.imageUrl).toBeUndefined();
  });

  it("maps strYoutube to youtubeUrl", () => {
    const recipe = mapMealToExternalRecipe(
      makeMeal({ strYoutube: "https://www.youtube.com/watch?v=abc123" })
    );
    expect(recipe.youtubeUrl).toBe("https://www.youtube.com/watch?v=abc123");
  });

  it("maps strSource to sourceUrl", () => {
    const recipe = mapMealToExternalRecipe(
      makeMeal({ strSource: "https://example.com/recipe" })
    );
    expect(recipe.sourceUrl).toBe("https://example.com/recipe");
  });
});

describe("extractIngredients", () => {
  it("extracts numbered ingredient fields 1-20", () => {
    const meal = makeMeal({
      strIngredient1: "Chicken",
      strMeasure1: "500g",
      strIngredient2: "Garlic",
      strMeasure2: "2 cloves",
    });
    const ingredients = extractIngredients(meal);
    expect(ingredients).toHaveLength(2);
    expect(ingredients[0]).toEqual({
      name: "Chicken",
      normalizedName: "chicken",
      amount: "500g",
    });
    expect(ingredients[1]).toEqual({
      name: "Garlic",
      normalizedName: "garlic",
      amount: "2 cloves",
    });
  });

  it("skips null ingredient fields", () => {
    const meal = makeMeal({
      strIngredient1: "Onion",
      strMeasure1: "1",
      strIngredient2: null,
      strMeasure2: null,
      strIngredient3: "Pepper",
      strMeasure3: "1 tsp",
    });
    const ingredients = extractIngredients(meal);
    expect(ingredients).toHaveLength(2);
    expect(ingredients[1].name).toBe("Pepper");
  });

  it("skips empty string ingredient fields", () => {
    const meal = makeMeal({
      strIngredient1: "Salt",
      strMeasure1: "pinch",
      strIngredient2: "  ",
      strMeasure2: "",
    });
    const ingredients = extractIngredients(meal);
    expect(ingredients).toHaveLength(1);
  });

  it("handles missing measure gracefully", () => {
    const meal = makeMeal({
      strIngredient1: "Paprika",
      strMeasure1: null,
    });
    const ingredients = extractIngredients(meal);
    expect(ingredients[0].amount).toBe("");
  });

  it("trims whitespace from ingredient names", () => {
    const meal = makeMeal({
      strIngredient1: "  Olive Oil  ",
      strMeasure1: "2 tbsp",
    });
    const ingredients = extractIngredients(meal);
    expect(ingredients[0].name).toBe("Olive Oil");
  });

  it("returns empty array when all ingredient fields are null", () => {
    const ingredients = extractIngredients(makeMeal());
    expect(ingredients).toHaveLength(0);
  });

  it("normalizes aliases in normalizedName", () => {
    const meal = makeMeal({
      strIngredient1: "Aubergine",
      strMeasure1: "1",
    });
    const ingredients = extractIngredients(meal);
    expect(ingredients[0].normalizedName).toBe("eggplant");
  });
});

describe("parseInstructions", () => {
  it("returns empty array for null input", () => {
    expect(parseInstructions(null)).toEqual([]);
  });

  it("returns empty array for empty string", () => {
    expect(parseInstructions("")).toEqual([]);
  });

  it("returns empty array for whitespace-only string", () => {
    expect(parseInstructions("   ")).toEqual([]);
  });

  it("splits on Windows line endings (CRLF)", () => {
    const raw = "Step one.\r\nStep two.\r\nStep three.";
    const steps = parseInstructions(raw);
    expect(steps).toEqual(["Step one.", "Step two.", "Step three."]);
  });

  it("splits on Unix line endings (LF)", () => {
    const raw = "Step one.\nStep two.\nStep three.";
    const steps = parseInstructions(raw);
    expect(steps).toEqual(["Step one.", "Step two.", "Step three."]);
  });

  it("removes empty lines after splitting", () => {
    const raw = "Step one.\r\n\r\nStep two.";
    const steps = parseInstructions(raw);
    expect(steps).toEqual(["Step one.", "Step two."]);
  });

  it("trims whitespace from each step", () => {
    const raw = "  Heat the pan.  \r\n  Add oil.  ";
    const steps = parseInstructions(raw);
    expect(steps).toEqual(["Heat the pan.", "Add oil."]);
  });

  it("strips bare number-only lines produced by TheMealDB step numbering", () => {
    const raw =
      "1\r\nHeat the pan.\r\n2\r\nAdd the oil.\r\n3\r\nServe hot.";
    const steps = parseInstructions(raw);
    expect(steps).toEqual(["Heat the pan.", "Add the oil.", "Serve hot."]);
  });

  it("strips bare numbers with trailing period", () => {
    const raw = "1.\r\nFirst step.\r\n2.\r\nSecond step.";
    const steps = parseInstructions(raw);
    expect(steps).toEqual(["First step.", "Second step."]);
  });

  it("keeps lines that start with a number but contain more text", () => {
    const raw = "1 lb. sharp cheddar cheese\r\n6 eggs, beaten";
    const steps = parseInstructions(raw);
    expect(steps).toEqual(["1 lb. sharp cheddar cheese", "6 eggs, beaten"]);
  });
});

describe("parseTags", () => {
  it("returns empty array for null", () => {
    expect(parseTags(null)).toEqual([]);
  });

  it("returns empty array for empty string", () => {
    expect(parseTags("")).toEqual([]);
  });

  it("splits comma-separated tags", () => {
    expect(parseTags("Spicy,Chicken,Quick")).toEqual([
      "Spicy",
      "Chicken",
      "Quick",
    ]);
  });

  it("trims whitespace from tags", () => {
    expect(parseTags(" Spicy , Chicken , Quick ")).toEqual([
      "Spicy",
      "Chicken",
      "Quick",
    ]);
  });

  it("filters empty tags after trim", () => {
    expect(parseTags("Spicy,,Quick")).toEqual(["Spicy", "Quick"]);
  });
});
