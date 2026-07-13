import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { useMealDbIngredientItems } from "../hooks/useMealDbIngredientItems";
import type { MealDbIngredientListItem } from "../services/mealDb/mealDbTypes";

// ─── Category mapping ─────────────────────────────────────────────────────────

function normalizeCategory(strType: string | null): string {
  if (!strType) return "Other";
  const map: Record<string, string> = {
    "Root Vegetable": "Vegetables",
    Vegetable: "Vegetables",
    Mushroom: "Vegetables",
    Sedge: "Vegetables",
    Fish: "Fish & Seafood",
    Seafood: "Fish & Seafood",
    Dairy: "Dairy & Cheese",
    Cheese: "Dairy & Cheese",
    Curd: "Dairy & Cheese",
    Legume: "Legumes & Beans",
    Bean: "Legumes & Beans",
    Grain: "Grains & Pasta",
    Rice: "Grains & Pasta",
    Pasta: "Grains & Pasta",
    Cereal: "Grains & Pasta",
    Seasoning: "Herbs & Spices",
    Spice: "Herbs & Spices",
    Sauce: "Sauces & Condiments",
    Dressing: "Sauces & Condiments",
    Condiment: "Sauces & Condiments",
    Preserve: "Sauces & Condiments",
    Vinegar: "Sauces & Condiments",
    Bread: "Bread & Pastry",
    Pastry: "Bread & Pastry",
    Nut: "Nuts & Seeds",
    Confectionery: "Confectionery",
    Sugar: "Confectionery",
    Drink: "Drinks",
    Wine: "Drinks",
    Spirit: "Drinks",
    Liqueur: "Drinks",
    Juice: "Drinks",
    Side: "Other",
    Stock: "Other",
    Fat: "Other",
    Liquid: "Other",
  };
  return map[strType] ?? strType;
}

const CATEGORY_ORDER = [
  "Meat",
  "Fish & Seafood",
  "Vegetables",
  "Fruit",
  "Legumes & Beans",
  "Grains & Pasta",
  "Dairy & Cheese",
  "Herbs & Spices",
  "Sauces & Condiments",
  "Bread & Pastry",
  "Nuts & Seeds",
  "Confectionery",
  "Drinks",
  "Other",
];

function getBadgeClass(category: string): string {
  const map: Record<string, string> = {
    Meat: "bg-tomato/20 text-foreground",
    "Fish & Seafood": "bg-primary/20 text-foreground",
    Vegetables: "bg-cucumber/20 text-foreground",
    Fruit: "bg-tomato/10 text-foreground",
    "Legumes & Beans": "bg-cucumber/10 text-foreground",
    "Grains & Pasta": "bg-lemon/25 text-foreground",
    "Dairy & Cheese": "bg-secondary text-secondary-foreground",
    "Herbs & Spices": "bg-sage/20 text-foreground",
    "Sauces & Condiments": "bg-lemon/20 text-foreground",
    "Bread & Pastry": "bg-cream text-foreground",
    "Nuts & Seeds": "bg-lemon/15 text-foreground",
    Confectionery: "bg-tomato/10 text-foreground",
    Drinks: "bg-secondary/60 text-secondary-foreground",
    Other: "bg-muted text-muted-foreground",
  };
  return map[category] ?? "bg-muted text-muted-foreground";
}

// ─── Ingredient chip ──────────────────────────────────────────────────────────

function IngredientChip({
  item,
  showBadge = true,
}: {
  item: MealDbIngredientListItem;
  showBadge?: boolean;
}) {
  const navigate = useNavigate();
  const cat = normalizeCategory(item.strType);

  return (
    <button
      onClick={() =>
        navigate("/what-can-i-make", { state: { add: item.strIngredient } })
      }
      title={`Search for recipes with ${item.strIngredient}`}
      className="flex items-center justify-between gap-2 px-3 py-2 bg-card border border-border rounded-xl text-left hover:border-primary/50 hover:bg-primary/5 transition-all w-full group"
    >
      <span className="text-sm font-medium text-foreground truncate leading-tight group-hover:text-primary transition-colors">
        {item.strIngredient}
      </span>
      {showBadge && cat !== "Other" && (
        <span
          className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getBadgeClass(cat)}`}
        >
          {cat}
        </span>
      )}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IngredientsGlossaryPage() {
  const items = useMealDbIngredientItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllOther, setShowAllOther] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const grouped = useMemo(() => {
    const groups: Record<string, MealDbIngredientListItem[]> = {};
    for (const item of items) {
      const cat = normalizeCategory(item.strType);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    }
    for (const cat of Object.keys(groups)) {
      groups[cat].sort((a, b) =>
        a.strIngredient.localeCompare(b.strIngredient),
      );
    }
    return groups;
  }, [items]);

  const categoriesWithCounts = useMemo(() => {
    return CATEGORY_ORDER.filter((cat) => grouped[cat]?.length > 0).map(
      (cat) => ({ cat, count: grouped[cat].length }),
    );
  }, [grouped]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let result = items;
    if (q) {
      result = result.filter((i) =>
        i.strIngredient.toLowerCase().includes(q),
      );
    }
    if (selectedCategory) {
      result = result.filter(
        (i) => normalizeCategory(i.strType) === selectedCategory,
      );
    }
    return result.sort((a, b) =>
      a.strIngredient.localeCompare(b.strIngredient),
    );
  }, [items, searchQuery, selectedCategory]);

  const isFiltered = searchQuery.trim().length > 0 || selectedCategory !== null;

  const isLoading = items.length === 0;

  function clearSearch() {
    setSearchQuery("");
    searchRef.current?.focus();
  }

  const OTHER_PREVIEW_COUNT = 60;

  return (
    <PageContainer>
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Ingredient Search Guide
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Browse all{" "}
          {items.length > 0 ? (
            <strong className="text-foreground">{items.length}</strong>
          ) : (
            "available"
          )}{" "}
          ingredients from TheMealDB. Click any ingredient to search for
          matching recipes.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1 max-w-prose">
          Note: this list includes every ingredient TheMealDB has on record.
          A small number of them (e.g. Gochujang) have not yet been used in
          any published recipe and will return no results.
        </p>
      </div>

      {/* ── Search + filters ── */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCategory(null);
            }}
            placeholder="Filter ingredients…"
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filter pills */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              All ({items.length})
            </button>
            {categoriesWithCounts.map(({ cat, count }) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory((prev) =>
                    prev === cat ? null : cat,
                  )
                }
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : `${getBadgeClass(cat)} hover:opacity-80`
                }`}
              >
                {cat} ({count})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Loading state ── */}
      {isLoading && (
        <div className="text-center py-20 text-muted-foreground">
          <div className="text-4xl mb-4">🌿</div>
          <p>Loading ingredient list…</p>
        </div>
      )}

      {/* ── Filtered / search results ── */}
      {!isLoading && isFiltered && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Showing{" "}
            <strong className="text-foreground">{filteredItems.length}</strong>{" "}
            {filteredItems.length === 1 ? "ingredient" : "ingredients"}
            {searchQuery && (
              <>
                {" "}
                for &ldquo;
                <span className="text-foreground">{searchQuery}</span>
                &rdquo;
              </>
            )}
            {selectedCategory && (
              <>
                {" "}
                in <span className="text-foreground">{selectedCategory}</span>
              </>
            )}
          </p>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {filteredItems.map((item) => (
                <IngredientChip key={item.strIngredient} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg mb-2">No ingredients found</p>
              <p className="text-sm">Try a different spelling or browse by category above.</p>
            </div>
          )}
        </div>
      )}

      {/* ── Grouped browse view ── */}
      {!isLoading && !isFiltered && (
        <div className="space-y-10">
          {CATEGORY_ORDER.filter(
            (cat) => cat !== "Other" && grouped[cat]?.length > 0,
          ).map((cat) => (
            <section key={cat}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-semibold text-foreground whitespace-nowrap">
                  {cat}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {grouped[cat].length}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {grouped[cat].map((item) => (
                  <IngredientChip
                    key={item.strIngredient}
                    item={item}
                    showBadge={false}
                  />
                ))}
              </div>
            </section>
          ))}

          {/* Other / uncategorized — collapsed by default */}
          {grouped["Other"]?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-semibold text-foreground whitespace-nowrap">
                  Other
                </h2>
                <span className="text-xs text-muted-foreground">
                  {grouped["Other"].length}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {(showAllOther
                  ? grouped["Other"]
                  : grouped["Other"].slice(0, OTHER_PREVIEW_COUNT)
                ).map((item) => (
                  <IngredientChip
                    key={item.strIngredient}
                    item={item}
                    showBadge={false}
                  />
                ))}
              </div>
              {!showAllOther &&
                grouped["Other"].length > OTHER_PREVIEW_COUNT && (
                  <button
                    onClick={() => setShowAllOther(true)}
                    className="mt-4 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                  >
                    Show all {grouped["Other"].length} uncategorized
                    ingredients
                  </button>
                )}
            </section>
          )}
        </div>
      )}
    </PageContainer>
  );
}
