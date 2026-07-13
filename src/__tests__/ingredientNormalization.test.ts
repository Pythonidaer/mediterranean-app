import { describe, it, expect } from "vitest";
import {
  normalizeIngredient,
  INGREDIENT_ALIASES,
} from "../utils/ingredientNormalization";

describe("normalizeIngredient", () => {
  it("lowercases input", () => {
    expect(normalizeIngredient("Chicken")).toBe("chicken");
    expect(normalizeIngredient("TOMATO")).toBe("tomato");
  });

  it("trims whitespace", () => {
    expect(normalizeIngredient("  garlic  ")).toBe("garlic");
  });

  it("collapses repeated whitespace", () => {
    expect(normalizeIngredient("olive  oil")).toBe("olive oil");
  });

  it("removes trailing punctuation", () => {
    expect(normalizeIngredient("onion,")).toBe("onion");
    expect(normalizeIngredient("garlic.")).toBe("garlic");
  });

  it("applies alias: garbanzo beans → chickpeas", () => {
    expect(normalizeIngredient("garbanzo beans")).toBe("chickpeas");
  });

  it("applies alias: garbanzo bean (singular) → chickpeas", () => {
    expect(normalizeIngredient("garbanzo bean")).toBe("chickpeas");
  });

  it("applies alias: chickpea → chickpeas", () => {
    expect(normalizeIngredient("chickpea")).toBe("chickpeas");
  });

  it("applies alias: aubergine → eggplant", () => {
    expect(normalizeIngredient("aubergine")).toBe("eggplant");
  });

  it("applies alias: courgette → zucchini", () => {
    expect(normalizeIngredient("courgette")).toBe("zucchini");
  });

  it("applies alias: cilantro → coriander", () => {
    expect(normalizeIngredient("cilantro")).toBe("coriander");
  });

  it("applies alias: greek yoghurt → greek yogurt", () => {
    expect(normalizeIngredient("greek yoghurt")).toBe("greek yogurt");
  });

  it("applies alias: chicken thighs → chicken", () => {
    expect(normalizeIngredient("chicken thighs")).toBe("chicken");
  });

  it("applies alias: chicken breast → chicken", () => {
    expect(normalizeIngredient("chicken breast")).toBe("chicken");
  });

  it("applies alias: tomatoes → tomato", () => {
    expect(normalizeIngredient("tomatoes")).toBe("tomato");
  });

  it("applies alias: white beans → cannellini beans", () => {
    expect(normalizeIngredient("white beans")).toBe("cannellini beans");
  });

  it("applies alias: baby spinach → spinach", () => {
    expect(normalizeIngredient("baby spinach")).toBe("spinach");
  });

  it("returns unknown ingredient unchanged", () => {
    expect(normalizeIngredient("saffron")).toBe("saffron");
    expect(normalizeIngredient("truffle oil")).toBe("truffle oil");
  });

  it("all INGREDIENT_ALIASES keys are lowercased and trimmed", () => {
    for (const key of Object.keys(INGREDIENT_ALIASES)) {
      expect(key).toBe(key.toLowerCase().trim());
    }
  });
});
