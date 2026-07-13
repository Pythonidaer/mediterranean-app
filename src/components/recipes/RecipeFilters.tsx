import { Search } from "lucide-react";

const FILTER_OPTIONS = [
  "All",
  "Wraps",
  "One Pot",
  "Slow Cooker",
  "Vegetarian",
  "High Protein",
  "Quick",
];

interface RecipeFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function RecipeFilters({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: RecipeFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <input
          type="search"
          placeholder="Search recipes or ingredients…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search recipes"
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
      </div>

      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => onCategoryChange(option)}
            aria-pressed={activeCategory === option}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
              activeCategory === option
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-secondary"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
