import { type ReactNode, useState, type KeyboardEvent } from "react";
import { Plus, Search } from "lucide-react";
import IngredientTag from "./IngredientTag";
import { POPULAR_INGREDIENTS } from "../../data/curatedRecipes";
import { useMealDbIngredientList } from "../../hooks/useMealDbIngredientList";

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (ingredient: string) => void;
  onClear: () => void;
  onSubmit?: () => void;
  /** Rendered between the text-input row and the ingredient chips. */
  actionSlot?: ReactNode;
}

/**
 * Ranks TheMealDB ingredient names against a user query.
 *
 * Score 0 – exact match (case-insensitive)
 * Score 1 – name starts with the query
 * Score 2 – name contains the query anywhere else
 *
 * Within the same score band, shorter names rank first (more generic).
 */
function getAutocompleteSuggestions(
  query: string,
  list: string[],
  existing: string[],
): string[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const addedLower = new Set(existing.map((e) => e.toLowerCase()));

  type Scored = { name: string; score: number };
  const scored: Scored[] = [];

  for (const name of list) {
    if (addedLower.has(name.toLowerCase())) continue;
    const nl = name.toLowerCase();
    if (nl === q) scored.push({ name, score: 0 });
    else if (nl.startsWith(q)) scored.push({ name, score: 1 + nl.length });
    else if (nl.includes(q)) scored.push({ name, score: 100 + nl.length });
  }

  return scored
    .sort((a, b) => a.score - b.score)
    .slice(0, 6)
    .map((s) => s.name);
}

export default function IngredientInput({
  ingredients,
  onAdd,
  onRemove,
  onClear,
  onSubmit,
  actionSlot,
}: IngredientInputProps) {
  const [value, setValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const mealDbIngredients = useMealDbIngredientList();

  const autoSuggestions = getAutocompleteSuggestions(
    value,
    mealDbIngredients,
    ingredients,
  );
  const showDropdown = inputFocused && autoSuggestions.length > 0;

  function handleAdd(name = value) {
    const trimmed = name.trim();
    if (
      trimmed &&
      !ingredients.map((i) => i.toLowerCase()).includes(trimmed.toLowerCase())
    ) {
      onAdd(trimmed);
      setValue("");
    }
  }

  function handleSuggestionPick(name: string) {
    // onMouseDown fires before the input's onBlur, so this runs first.
    handleAdd(name);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setValue("");
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim()) {
        handleAdd();
      } else if (ingredients.length > 0) {
        onSubmit?.();
      }
    }
    if (e.key === "Backspace" && !value && ingredients.length > 0) {
      onRemove(ingredients[ingredients.length - 1]);
    }
  }

  const popularSuggestions = POPULAR_INGREDIENTS.filter(
    (p) => !ingredients.map((i) => i.toLowerCase()).includes(p.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Text input + autocomplete dropdown + plus button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Add an ingredient…"
            aria-label="Add an ingredient"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            autoComplete="off"
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-lemon/70 transition-shadow"
          />

          {/* Autocomplete dropdown */}
          {showDropdown && (
            <ul
              role="listbox"
              aria-label="Ingredient suggestions"
              className="absolute left-0 right-0 top-full mt-1.5 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
            >
              {autoSuggestions.map((name) => (
                <li key={name} role="option" aria-selected={false}>
                  {/* onMouseDown fires before the input's onBlur */}
                  <button
                    type="button"
                    onMouseDown={() => handleSuggestionPick(name)}
                    className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => handleAdd()}
          aria-label="Add ingredient"
          disabled={!value.trim()}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-lemon text-lemon-foreground hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed transition-opacity focus-visible:outline-2 focus-visible:outline-lemon-foreground"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Primary action — Find Recipes button + toggle — injected by the parent */}
      {actionSlot}

      {/* Selected ingredient chips */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {ingredients.map((ing) => (
            <IngredientTag key={ing} label={ing} onRemove={() => onRemove(ing)} />
          ))}
          <button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1 focus-visible:outline-2 focus-visible:outline-ring"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Popular ingredients — shown when not typing */}
      {!value && popularSuggestions.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Popular ingredients
          </span>
          <div className="flex flex-wrap gap-2">
            {popularSuggestions.slice(0, 6).map((s) => (
              <button
                key={s}
                onClick={() => onAdd(s)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-card text-sm text-muted-foreground hover:bg-lemon/15 hover:border-lemon/50 hover:text-lemon-foreground transition-colors focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Plus size={12} aria-hidden="true" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
