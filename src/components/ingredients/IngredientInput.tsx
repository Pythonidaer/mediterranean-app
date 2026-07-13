import { useState, type KeyboardEvent } from "react";
import { Plus, Search } from "lucide-react";
import IngredientTag from "./IngredientTag";
import { POPULAR_INGREDIENTS } from "../../data/recipes";

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (ingredient: string) => void;
  onClear: () => void;
}

export default function IngredientInput({
  ingredients,
  onAdd,
  onRemove,
  onClear,
}: IngredientInputProps) {
  const [value, setValue] = useState("");

  function handleAdd() {
    const trimmed = value.trim();
    if (trimmed && !ingredients.map((i) => i.toLowerCase()).includes(trimmed.toLowerCase())) {
      onAdd(trimmed);
      setValue("");
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === "Backspace" && !value && ingredients.length > 0) {
      onRemove(ingredients[ingredients.length - 1]);
    }
  }

  const suggestions = POPULAR_INGREDIENTS.filter(
    (p) => !ingredients.map((i) => i.toLowerCase()).includes(p.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Input row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an ingredient…"
            aria-label="Add an ingredient"
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
        <button
          onClick={handleAdd}
          aria-label="Add ingredient"
          disabled={!value.trim()}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Selected ingredients */}
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

      {/* Popular suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Popular ingredients
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 6).map((s) => (
              <button
                key={s}
                onClick={() => onAdd(s)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Plus size={12} />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
