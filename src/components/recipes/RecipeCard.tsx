import { Link } from "react-router-dom";
import { Clock, Refrigerator, Users } from "lucide-react";
import type { Recipe } from "../../types/recipe";
import { totalTime } from "../../utils/time";

interface RecipeCardProps {
  recipe: Recipe;
}

const CATEGORY_COLORS: Record<string, string> = {
  Wraps: "bg-lemon text-lemon-foreground",
  "One Pot": "bg-cucumber/20 text-cucumber-foreground",
  "Slow Cooker": "bg-accent text-accent-foreground",
  Vegetarian: "bg-cucumber/20 text-cucumber-foreground",
  "High Protein": "bg-secondary text-secondary-foreground",
  Quick: "bg-lemon text-lemon-foreground",
};

function CategoryTag({ label }: { label: string }) {
  const color = CATEGORY_COLORS[label] ?? "bg-muted text-muted-foreground";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-300 flex flex-col">
      <Link
        to={`/recipes/${recipe.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {recipe.categories.map((cat) => (
            <CategoryTag key={cat} label={cat} />
          ))}
        </div>

        {/* Title */}
        <Link to={`/recipes/${recipe.slug}`} className="group/title">
          <h3 className="font-bold text-base leading-snug text-foreground group-hover/title:text-primary transition-colors">
            {recipe.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {recipe.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 border-t border-border">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {totalTime(recipe.prepMinutes, recipe.cookMinutes)}
          </span>
          <span className="flex items-center gap-1">
            <Refrigerator size={12} />
            {recipe.storageDays} days
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {recipe.servings}
          </span>
        </div>
      </div>
    </article>
  );
}
