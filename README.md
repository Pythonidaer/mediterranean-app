# Fresco — Mediterranean Meal Prep

Calm, healthy Mediterranean meal prep. Plan once, eat well all week.

## About

Fresco is a responsive meal-prep recipe website focused on simple Mediterranean meals that are easy to prepare in batches and eat over several days. The design is based on a Lovable mockup and uses a warm cream, olive-green, and sage colour palette.

---

## Phase 1 Scope (current)

- Homepage with hero, category shortcuts, featured recipes, and benefits section
- Recipe directory with category filters and text search
- Individual recipe detail pages with ingredients, instructions, meal-prep notes, and storage info
- "What Can I Make?" ingredient-matching page — ranked by how many required ingredients you already have
- Favorites stored in browser local storage
- Responsive layouts for mobile, tablet, and desktop
- No backend, no API keys, no authentication — runs entirely offline after assets load

---

## Planned Phase 2 Scope

- Connect to an external recipe API (e.g. Spoonacular, Edamam, or custom backend)
- Search and fetch recipes by multiple ingredients via API
- Map API responses into the internal `Recipe` type
- Add loading, empty, and error states for async data
- Separate curated local recipes from external API results
- Optional user accounts with cloud-synced saved meal plans
- Optional AI-assisted substitutions or meal-prep instructions

The Phase 1 architecture cleanly separates data, components, and logic so Phase 2 can be added without rewriting the UI. See `src/services/recipeApi.ts` for the stub.

---

## Technology Stack

| Tool | Purpose |
|---|---|
| Vite | Build tool and dev server |
| React 19 | UI framework |
| TypeScript | Type safety |
| React Router v6 | Client-side routing |
| Tailwind CSS v4 | Styling with design tokens |
| lucide-react | Icons |
| Local Storage | Favorites persistence |

---

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, PageContainer
│   ├── recipes/      # RecipeCard, RecipeGrid, RecipeFilters, FavoriteButton
│   └── ingredients/  # IngredientInput, IngredientTag, IngredientMatchCard
├── data/
│   └── recipes.ts    # 10 sample Mediterranean meal-prep recipes
├── hooks/
│   └── useFavorites.ts  # Local storage hook for favorited recipes
├── pages/            # One file per route
├── services/
│   └── recipeApi.ts  # Phase 2 stub — no network requests in Phase 1
├── types/
│   └── recipe.ts     # Recipe and RecipeIngredient types
└── utils/
    ├── ingredientMatching.ts  # Match percentage + alias normalisation
    ├── recipeFilters.ts       # Category + text search filters
    └── time.ts               # Time formatting helpers
```

---

## Local Recipe Data

All recipes live in `src/data/recipes.ts`. Each recipe follows the `Recipe` type defined in `src/types/recipe.ts`. The file exports:

- `recipes` — array of 10 sample Mediterranean meal-prep recipes
- `CATEGORIES` — canonical category list
- `POPULAR_INGREDIENTS` — quick-add suggestions for the ingredient search page

Recipe content is realistic sample data for prototype purposes and has not been professionally tested.

---

## Favorites

Favorites are stored in `localStorage` under the key `fresco_favorites` as a JSON array of recipe IDs. They persist across page refreshes and browser sessions. The `useFavorites` hook handles all reads and writes.

---

## Design Reference

The UI was designed to match a Lovable mockup provided as screenshots. The design uses:

- **Palette**: warm cream background (`oklch(0.985 0.008 95)`), olive-green primary, sage accents, tomato and lemon food accents
- **Font**: Manrope (loaded from Google Fonts)
- **Radius**: 1rem base, scaling up to 2.5rem for large cards
- **Shadows**: soft layered shadows defined as CSS custom properties

---

## Future API Integration Notes

To add Phase 2 API support:

1. Implement `src/services/recipeApi.ts` — add functions that fetch from the external API and return `Recipe[]`
2. Create a data layer hook (e.g. `useRecipes`) that merges local and remote recipes
3. Pass remote results to the existing `RecipeGrid` and filter utilities — no UI rewrite needed
4. Add loading and error states at the page level

The `Recipe` type is intentionally decoupled from any specific API provider's response format.

---

*© 2026 Fresco. Sample recipes for prototype purposes.*
