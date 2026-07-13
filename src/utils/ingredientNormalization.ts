/**
 * Maps common alternative ingredient names to TheMealDB's canonical vocabulary.
 *
 * Rules for entries here:
 *  - Add when the user's natural term does NOT appear in TheMealDB's ingredient
 *    list and the wildcard lookup therefore returns nothing.
 *  - Do NOT add for plain plural/singular variants — the wildcard matcher in
 *    mealDbClient already handles those via the scoring rules.
 *  - Prefer the TheMealDB name (lowercase) as the value so the canonical form
 *    can be matched exactly by the wildcard scorer.
 */
export const INGREDIENT_ALIASES: Record<string, string> = {
  // ── American → British English (TheMealDB uses British/European vocabulary) ─

  // Aubergine / Eggplant
  eggplant: "aubergine",
  eggplants: "aubergine",
  aubergines: "aubergine",

  // Courgette / Zucchini  (TheMealDB has "Zucchini", not "Courgette")
  courgette: "zucchini",
  courgettes: "zucchini",

  // Rocket / Arugula
  arugula: "rocket",

  // Beetroot / Beet
  beet: "beetroot",
  beets: "beetroot",

  // Pak Choi / Bok Choy
  "bok choy": "pak choi",
  "pak choy": "pak choi",
  "bok choi": "pak choi",

  // Broad Beans / Fava Beans
  "fava beans": "broad beans",
  "fava bean": "broad beans",

  // Coriander / Cilantro  (both exist in TheMealDB; map to the more common form)
  cilantro: "coriander",

  // Chilli  (TheMealDB uses British "Chilli"; American spellings map here)
  chili: "chilli",
  chile: "chilli",
  "hot pepper": "chilli",
  "chilli pepper": "chilli",
  "chili pepper": "chilli",
  "red chili": "chilli",
  "green chili": "chilli",

  // ── Chickpeas / Garbanzo ─────────────────────────────────────────────────────
  chickpea: "chickpeas",
  "garbanzo bean": "chickpeas",
  "garbanzo beans": "chickpeas",
  garbanzo: "chickpeas",

  // ── Tomatoes ─────────────────────────────────────────────────────────────────
  // TheMealDB has "Sun-Dried Tomatoes" and "Canned Tomatoes" as distinct entries
  "sun-dried tomato": "sun-dried tomatoes",
  "sun dried tomato": "sun-dried tomatoes",
  "sun dried tomatoes": "sun-dried tomatoes",
  "crushed tomatoes": "canned tomatoes",   // closest TheMealDB match

  // ── Peppers ──────────────────────────────────────────────────────────────────
  // TheMealDB has Red/Green/Yellow Pepper individually; no generic "Bell Pepper"
  "bell pepper": "red pepper",
  "bell peppers": "red pepper",
  "red bell pepper": "red pepper",
  "red bell peppers": "red pepper",
  "green bell pepper": "green pepper",
  "green bell peppers": "green pepper",
  "yellow bell pepper": "yellow pepper",
  "yellow bell peppers": "yellow pepper",
  capsicum: "red pepper",                  // Australian/NZ English

  // ── Olives ───────────────────────────────────────────────────────────────────
  // TheMealDB has "Black Olives" but no generic "Olives"
  olive: "black olives",
  olives: "black olives",
  "kalamata olives": "black olives",
  "kalamata olive": "black olives",
  "green olives": "black olives",          // close enough for search purposes

  // ── Spring Onion ─────────────────────────────────────────────────────────────
  // TheMealDB uses "Spring Onions" (plural); no singular form
  "spring onion": "spring onions",
  scallion: "scallions",                   // TheMealDB has "Scallions" separately
  "green onion": "spring onions",
  "green onions": "spring onions",

  // ── Dairy / Cream ────────────────────────────────────────────────────────────
  // TheMealDB has "Greek Yogurt" but not "yogurt", "yoghurt", or "natural yogurt"
  yogurt: "greek yogurt",
  yoghurt: "greek yogurt",
  "natural yogurt": "greek yogurt",
  "plain yogurt": "greek yogurt",
  "greek yoghurt": "greek yogurt",

  // TheMealDB has both "Single Cream" and "Double Cream" as distinct ingredients
  "half and half": "single cream",
  "half-and-half": "single cream",

  // ── Ground / Minced Meat ─────────────────────────────────────────────────────
  // TheMealDB uses British "mince" naming; American "ground" maps here
  "ground turkey": "turkey mince",
  "minced turkey": "turkey mince",
  "ground lamb": "lamb mince",
  "minced lamb": "lamb mince",
  "ground pork": "pork mince",
  "ground meat": "minced beef",            // generic ground meat → beef mince

  // ── Beans / Legumes ──────────────────────────────────────────────────────────
  "cannellini beans": "cannellini beans",  // identity — ensures correct casing
  "white beans": "cannellini beans",
  "navy beans": "haricot beans",           // American → British

  // ── Lentils ──────────────────────────────────────────────────────────────────
  // TheMealDB has a generic "Lentils" entry; specific types map there
  "puy lentils": "lentils",
  "french lentils": "lentils",

  // ── Spinach ──────────────────────────────────────────────────────────────────
  "baby spinach": "spinach",
  "fresh spinach": "spinach",

  // ── Flour / Sugar ────────────────────────────────────────────────────────────
  "all-purpose flour": "all purpose flour",
  "plain flour": "all purpose flour",      // British → TheMealDB form (has both; pick one)
  "confectioners sugar": "powdered sugar",
  "confectioners' sugar": "powdered sugar",
  "icing sugar": "powdered sugar",         // British → American (TheMealDB uses American)

  // ── Yam ──────────────────────────────────────────────────────────────────────
  yam: "sweet potatoes",                   // often confused in American English
};

export function normalizeIngredient(name: string): string {
  const trimmed = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[,.]+$/, "");
  return INGREDIENT_ALIASES[trimmed] ?? trimmed;
}
