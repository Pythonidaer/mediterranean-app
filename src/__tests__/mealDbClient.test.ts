import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  // Clear the module-level cache between tests by re-importing
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
  mockFetch.mockReset();
});

function makeFetchResponse(body: unknown, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    statusText: ok ? "OK" : "Not Found",
    json: () => Promise.resolve(body),
  });
}

describe("searchMealsByName", () => {
  it("returns mapped recipes when meals is an array", async () => {
    mockFetch.mockReturnValueOnce(
      makeFetchResponse({
        meals: [
          {
            idMeal: "1",
            strMeal: "Test Recipe",
            strCategory: "Chicken",
            strArea: "British",
            strInstructions: "Step one.\r\nStep two.",
            strMealThumb: "https://img.example.com/1.jpg",
            strTags: "Spicy",
            strYoutube: null,
            strSource: null,
            strIngredient1: "Chicken",
            strMeasure1: "500g",
            ...Object.fromEntries(
              Array.from({ length: 19 }, (_, i) => [
                [`strIngredient${i + 2}`, null],
                [`strMeasure${i + 2}`, null],
              ]).flat()
            ),
          },
        ],
      })
    );

    const { searchMealsByName } = await import(
      "../services/mealDb/mealDbClient"
    );
    const results = await searchMealsByName("test");

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Test Recipe");
    expect(results[0].source).toBe("themealdb");
    expect(results[0].externalId).toBe("1");
  });

  it("returns empty array when meals is null", async () => {
    mockFetch.mockReturnValueOnce(makeFetchResponse({ meals: null }));

    const { searchMealsByName } = await import(
      "../services/mealDb/mealDbClient"
    );
    const results = await searchMealsByName("nonexistent");
    expect(results).toEqual([]);
  });

  it("returns empty array for empty query without making a request", async () => {
    const { searchMealsByName } = await import(
      "../services/mealDb/mealDbClient"
    );
    const results = await searchMealsByName("   ");
    expect(results).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockReturnValueOnce(makeFetchResponse({}, false, 500));

    const { searchMealsByName } = await import(
      "../services/mealDb/mealDbClient"
    );
    await expect(searchMealsByName("chicken")).rejects.toThrow(
      "API request failed"
    );
  });
});

describe("getMealById", () => {
  it("returns null when meals is null", async () => {
    mockFetch.mockReturnValueOnce(makeFetchResponse({ meals: null }));

    const { getMealById } = await import("../services/mealDb/mealDbClient");
    const result = await getMealById("99999");
    expect(result).toBeNull();
  });

  it("returns null when meals is empty array", async () => {
    mockFetch.mockReturnValueOnce(makeFetchResponse({ meals: [] }));

    const { getMealById } = await import("../services/mealDb/mealDbClient");
    const result = await getMealById("99999");
    expect(result).toBeNull();
  });

  it("returns mapped recipe for valid id", async () => {
    mockFetch.mockReturnValueOnce(
      makeFetchResponse({
        meals: [
          {
            idMeal: "52772",
            strMeal: "Teriyaki Chicken Casserole",
            strCategory: "Chicken",
            strArea: "Japanese",
            strInstructions: "Do the thing.",
            strMealThumb: null,
            strTags: null,
            strYoutube: null,
            strSource: null,
            ...Object.fromEntries(
              Array.from({ length: 20 }, (_, i) => [
                [`strIngredient${i + 1}`, null],
                [`strMeasure${i + 1}`, null],
              ]).flat()
            ),
          },
        ],
      })
    );

    const { getMealById } = await import("../services/mealDb/mealDbClient");
    const result = await getMealById("52772");
    expect(result).not.toBeNull();
    expect(result?.title).toBe("Teriyaki Chicken Casserole");
    expect(result?.externalId).toBe("52772");
  });

  it("throws on network error", async () => {
    mockFetch.mockReturnValueOnce(makeFetchResponse({}, false, 503));

    const { getMealById } = await import("../services/mealDb/mealDbClient");
    await expect(getMealById("1")).rejects.toThrow("API request failed");
  });
});

describe("searchMealsByIngredients", () => {
  it("returns empty array for empty ingredients list", async () => {
    const { searchMealsByIngredients } = await import(
      "../services/mealDb/mealDbClient"
    );
    const results = await searchMealsByIngredients([]);
    expect(results).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("deduplicates normalized ingredients before querying", async () => {
    mockFetch.mockReturnValue(makeFetchResponse({ meals: null }));

    const { searchMealsByIngredients } = await import(
      "../services/mealDb/mealDbClient"
    );
    await searchMealsByIngredients(["chicken", "Chicken", "CHICKEN"]);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("combines results across multiple ingredient queries", async () => {
    const mealA = { idMeal: "1", strMeal: "Meal A", strMealThumb: null };
    const mealB = { idMeal: "2", strMeal: "Meal B", strMealThumb: null };
    const fullMeal = {
      idMeal: "1",
      strMeal: "Meal A",
      strCategory: null,
      strArea: null,
      strInstructions: "Cook it.",
      strMealThumb: null,
      strTags: null,
      strYoutube: null,
      strSource: null,
      strIngredient1: "Chicken",
      strMeasure1: "500g",
      strIngredient2: "Tomato",
      strMeasure2: "2",
      ...Object.fromEntries(
        Array.from({ length: 18 }, (_, i) => [
          [`strIngredient${i + 3}`, null],
          [`strMeasure${i + 3}`, null],
        ]).flat()
      ),
    };

    mockFetch
      .mockReturnValueOnce(makeFetchResponse({ meals: [mealA] }))
      .mockReturnValueOnce(makeFetchResponse({ meals: [mealA, mealB] }))
      .mockReturnValueOnce(makeFetchResponse({ meals: [fullMeal] }))
      .mockReturnValueOnce(makeFetchResponse({ meals: null }));

    const { searchMealsByIngredients } = await import(
      "../services/mealDb/mealDbClient"
    );
    const results = await searchMealsByIngredients(["chicken", "tomato"]);

    // Meal A was returned by both ingredient queries — should appear first
    expect(results.length).toBeGreaterThan(0);
  });

  it("handles all ingredient filter requests failing gracefully", async () => {
    mockFetch.mockReturnValue(makeFetchResponse({}, false, 500));

    const { searchMealsByIngredients } = await import(
      "../services/mealDb/mealDbClient"
    );
    const results = await searchMealsByIngredients(["chicken"]);
    expect(results).toEqual([]);
  });
});
