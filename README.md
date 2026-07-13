# GreenBean — Mediterranean Meal Prep

GreenBean is a simple recipe website built for a friend who wanted easy, Mediterranean-inspired meals that can be prepped once and eaten throughout the week. The focus is on flavourful wraps you can grab from the fridge and hearty one-pot slow-cooker meals that stay fresh for several days — nothing complicated, just honest food that makes the week easier.

**Live site:** [pythonidaer.github.io/mediterranean-app](https://pythonidaer.github.io/mediterranean-app)

---

## Tech stack

- **Vite** + **React 19** + **TypeScript**
- **React Router** (HashRouter for GitHub Pages compatibility)
- **Tailwind CSS v4** with a custom olive/sage/cream design system
- **lucide-react** for icons
- **Vitest** for unit tests

---

## Phase 2: TheMealDB integration

Phase 2 adds [TheMealDB](https://www.themealdb.com) as a secondary recipe source alongside the ten curated local recipes.

### What was added

- **Name search on the Recipes page** — type a query and click "Search TheMealDB" to see results from the external API displayed below local recipes.
- **Ingredient-based external search on the "What Can I Make?" page** — after adding ingredients, click "Search TheMealDB" to find ranked external recipe matches in a second section below the curated results.
- **External recipe detail page** at `/external-recipes/themealdb/:id` — shows image, ingredients with measurements, instructions, YouTube link, source attribution, and a YouTube search fallback.
- Curated local recipes are **unaffected** — they remain fully functional even if the API is unavailable.

### Environment variable

| Variable | Description | Default |
|---|---|---|
| `VITE_MEALDB_API_KEY` | TheMealDB API key | `1` (free developer key) |

Copy `.env.example` to `.env` to configure:

```bash
cp .env.example .env
```

The free key `1` is public and works during development. Do not commit a production key.

### Architecture

```
src/
├── services/
│   ├── recipeApi.ts              # public re-export + architecture docs
│   └── mealDb/
│       ├── mealDbClient.ts       # fetch helpers, session cache, abort support
│       ├── mealDbMappers.ts      # raw API response → ExternalRecipe
│       └── mealDbTypes.ts        # TheMealDB TypeScript response shapes
├── hooks/
│   ├── useMealSearch.ts              # name search hook (abort + retry)
│   └── useIngredientRecipeSearch.ts  # ingredient search hook (abort + retry)
├── types/
│   ├── recipe.ts                 # curated Recipe type (unchanged)
│   └── externalRecipe.ts         # ExternalRecipe, ExternalRecipeMatch
└── utils/
    ├── ingredientNormalization.ts # normalizeIngredient, INGREDIENT_ALIASES
    ├── ingredientMatching.ts      # local recipe matching (imports from normalization)
    └── youtube.ts                 # createYouTubeSearchUrl
```

All UI components consume the internal `ExternalRecipe` type only. No component imports directly from `mealDbClient`.

### Curated vs external recipes

| Feature | Curated recipes | TheMealDB recipes |
|---|---|---|
| Prep / cook time | ✓ | — |
| Storage info | ✓ | — |
| Reheating notes | ✓ | — |
| Meal-prep notes | ✓ | — |
| Substitutions | ✓ | — |
| Image | local URLs | `strMealThumb` |
| YouTube | — | direct URL + search fallback |
| Source link | — | `strSource` when available |
| Attribution | prototype disclaimer | "Recipe data provided by TheMealDB" |

### Multi-ingredient search strategy

The free TheMealDB V1 API supports only **one ingredient per filter request**. GreenBean works around this by:

1. Normalizing and deduplicating submitted ingredients (max 5 sent to the API).
2. Sending one `filter.php?i=` request per ingredient in parallel.
3. Combining the returned meal summaries — tracking which ingredients each meal matched.
4. Ranking by match count and selecting the top 12 candidates.
5. Fetching full details for those candidates via `lookup.php?i=`.
6. Recalculating a precise match percentage from the complete ingredient list.

This is an **approximation**. Because results are combined from separate single-ingredient queries, a meal that matches multiple ingredients is ranked higher, but the percentage shown is calculated against the full recipe.

### Request limits and caching

- Maximum **5** submitted ingredients sent to the external API per search.
- Maximum **12** full recipe detail lookups per search.
- All responses are cached in an **in-memory `Map`** for the current browser session (not persisted to localStorage).
- Cache keys: `mealdb:name:{query}`, `mealdb:ingredient:{ingredient}`, `mealdb:meal:{id}`.
- Previous requests are aborted when a new search begins.
- No requests are made on every keystroke — external search requires an explicit button click.

### YouTube behaviour

- When `strYoutube` is present, a "Watch recipe video" link is shown.
- A "Search YouTube" fallback is always shown, generated via `createYouTubeSearchUrl(title)`.
- YouTube links open in a new tab with `rel="noopener noreferrer"`.
- The YouTube Data API is not used; no video is auto-embedded.

### Image behaviour

- External recipe images use `strMealThumb` from TheMealDB.
- Images include an `onError` handler; broken images are hidden rather than showing a broken icon.
- Image aspect ratios are preserved with Tailwind's `aspect-*` utilities to avoid layout shift.

### Attribution

All external results are labelled "TheMealDB" in the UI. The detail page states:

> Recipe data provided by TheMealDB. This recipe was not authored or tested by GreenBean.

When a source URL is available, a "View original source" link is shown.

### Replacing TheMealDB

To swap in another recipe provider:

1. Create `src/services/<provider>/` with `<provider>Client.ts`, `<provider>Mappers.ts`, `<provider>Types.ts`.
2. Return `ExternalRecipe[]` and `ExternalRecipeMatch[]` from the new client.
3. Update the imports in `useMealSearch` and `useIngredientRecipeSearch`.
4. No page or component changes are required.

### Known limitations

- The free endpoint supports only **one ingredient per request**; combining results is an approximation.
- API categories differ from GreenBean's curated categories (Wraps, One Pot, etc.).
- External recipes do not include meal-prep metadata, storage info, or nutrition data.
- Some recipes may have no source URL or YouTube link.
- Recipe image quality varies by contributor.
- Ingredient names may require normalization to match correctly.
- The free API is not intended for high-volume production use.

---

## Local development

```bash
# Install dependencies
npm install

# Copy env example and set your API key
cp .env.example .env

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## Deployment

The site is deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main` triggers a build and deploy.
