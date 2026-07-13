import { Link } from "react-router-dom";
import { Check, X, ExternalLink } from "lucide-react";
import type { ExternalRecipeMatch } from "../../types/externalRecipe";

interface ExternalRecipeMatchCardProps {
  result: ExternalRecipeMatch;
}

function MatchRing({ pct }: { pct: number }) {
  const radius = 20;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;
  const color =
    pct >= 80
      ? "oklch(0.52 0.078 128)"
      : pct >= 50
        ? "oklch(0.87 0.13 95)"
        : "oklch(0.62 0.17 28)";

  return (
    <div
      className="relative flex items-center justify-center w-14 h-14 shrink-0"
      aria-hidden="true"
    >
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

export default function ExternalRecipeMatchCard({
  result,
}: ExternalRecipeMatchCardProps) {
  const {
    recipe,
    matchPercentage,
    matchedIngredients,
    missingIngredients,
    enteredIngredientMatchCount,
    enteredIngredientCount,
  } = result;
  const detailUrl = `/external-recipes/themealdb/${recipe.externalId}`;

  return (
    <article className="bg-card rounded-2xl p-4 shadow-soft flex gap-4 items-start border border-border">
      <Link
        to={detailUrl}
        className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-muted block"
        tabIndex={-1}
        aria-hidden="true"
      >
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-2xl">
            🍽
          </div>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1 flex-wrap">
          <Link to={detailUrl}>
            <h3 className="font-bold text-base leading-snug text-foreground hover:text-primary transition-colors">
              {recipe.title}
            </h3>
          </Link>
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border shrink-0">
            TheMealDB
          </span>
        </div>

        {(recipe.providerCategory ?? recipe.cuisine) && (
          <p className="text-xs text-muted-foreground mb-1">
            {[recipe.providerCategory, recipe.cuisine].filter(Boolean).join(" · ")}
          </p>
        )}

        <p className="text-xs text-muted-foreground mb-2">
          {enteredIngredientMatchCount} of your{" "}
          {enteredIngredientCount} ingredient
          {enteredIngredientCount !== 1 ? "s" : ""} appear in this recipe
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-3">
          {matchedIngredients.slice(0, 3).map((ing) => (
            <span
              key={ing}
              className="flex items-center gap-1 text-cucumber-foreground"
            >
              <Check size={11} className="shrink-0" />
              {ing}
            </span>
          ))}
          {matchedIngredients.length > 3 && (
            <span className="text-muted-foreground">
              +{matchedIngredients.length - 3} more
            </span>
          )}
          {missingIngredients.slice(0, 2).map((ing) => (
            <span
              key={ing}
              className="flex items-center gap-1 text-tomato"
            >
              <X size={11} className="shrink-0" />
              {ing}
            </span>
          ))}
          {missingIngredients.length > 2 && (
            <span className="text-muted-foreground">
              +{missingIngredients.length - 2} missing
            </span>
          )}
        </div>

        <Link
          to={detailUrl}
          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full border border-border text-xs font-medium text-foreground hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
        >
          View Recipe
          <ExternalLink size={10} />
          <span className="sr-only"> for {recipe.title}</span>
        </Link>
      </div>

      <MatchRing pct={matchPercentage} />
    </article>
  );
}
