import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import type { IngredientMatchResult } from "../../types/recipe";

interface IngredientMatchCardProps {
  result: IngredientMatchResult;
}

function MatchRing({ pct }: { pct: number }) {
  const radius = 20;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;
  const color =
    pct === 100
      ? "oklch(0.52 0.078 128)"
      : pct >= 60
      ? "oklch(0.87 0.13 95)"
      : "oklch(0.62 0.17 28)";

  return (
    <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
      <svg width="56" height="56" className="-rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="oklch(0.9 0.012 120)"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-xs font-bold text-foreground">{pct}%</span>
    </div>
  );
}

export default function IngredientMatchCard({ result }: IngredientMatchCardProps) {
  const { recipe, matchPercentage, matchedIngredients, missingIngredients } = result;

  return (
    <article className="bg-card rounded-2xl p-4 shadow-soft flex gap-4 items-start">
      {/* Image */}
      <Link
        to={`/recipes/${recipe.slug}`}
        className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-muted block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Link to={`/recipes/${recipe.slug}`}>
          <h3 className="font-bold text-base leading-snug text-foreground hover:text-primary transition-colors mb-1">
            {recipe.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {recipe.description}
        </p>

        {/* Have / Need */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-3">
          {matchedIngredients.slice(0, 3).map((ing) => (
            <span key={ing} className="flex items-center gap-1 text-cucumber-foreground">
              <Check size={11} className="shrink-0" />
              {ing}
            </span>
          ))}
          {matchedIngredients.length > 3 && (
            <span className="text-muted-foreground">+{matchedIngredients.length - 3} more</span>
          )}
          {missingIngredients.slice(0, 3).map((ing) => (
            <span key={ing} className="flex items-center gap-1 text-tomato">
              <X size={11} className="shrink-0" />
              {ing}
            </span>
          ))}
          {missingIngredients.length > 3 && (
            <span className="text-muted-foreground">+{missingIngredients.length - 3} missing</span>
          )}
        </div>

        <Link
          to={`/recipes/${recipe.slug}`}
          className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-medium text-foreground hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
        >
          View Recipe
        </Link>
      </div>

      {/* Match ring */}
      <MatchRing pct={matchPercentage} />
    </article>
  );
}
