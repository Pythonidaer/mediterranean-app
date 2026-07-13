export const INGREDIENT_ALIASES: Record<string, string> = {
  "chicken breast": "chicken",
  "chicken breasts": "chicken",
  "chicken thigh": "chicken",
  "chicken thighs": "chicken",
  "garbanzo bean": "chickpeas",
  "garbanzo beans": "chickpeas",
  garbanzo: "chickpeas",
  chickpea: "chickpeas",
  tomatoes: "tomato",
  "cherry tomatoes": "tomato",
  "crushed tomatoes": "tomato",
  "sun-dried tomatoes": "tomato",
  "red peppers": "bell pepper",
  "red pepper": "bell pepper",
  "bell peppers": "bell pepper",
  "green pepper": "bell pepper",
  aubergine: "eggplant",
  courgette: "zucchini",
  coriander: "coriander",
  cilantro: "coriander",
  "greek yoghurt": "greek yogurt",
  "natural yogurt": "greek yogurt",
  yogurt: "greek yogurt",
  "kalamata olives": "olives",
  "black olives": "olives",
  "green olives": "olives",
  olive: "olives",
  "lemon juice": "lemon",
  lemons: "lemon",
  "ground turkey": "turkey",
  "minced turkey": "turkey",
  "puy lentils": "lentils",
  "red lentils": "lentils",
  "green lentils": "lentils",
  "cannellini beans": "cannellini beans",
  "white beans": "cannellini beans",
  "baby spinach": "spinach",
  "fresh spinach": "spinach",
  scallions: "spring onion",
  "green onion": "spring onion",
  "green onions": "spring onion",
  "spring onions": "spring onion",
};

export function normalizeIngredient(name: string): string {
  const trimmed = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[,.]+$/, "");
  return INGREDIENT_ALIASES[trimmed] ?? trimmed;
}
