import { Link } from "react-router-dom";
import type { ExternalRecipe } from "../../types/externalRecipe";

interface ExternalRecipeCardProps {
  recipe: ExternalRecipe;
}

export default function ExternalRecipeCard({ recipe }: ExternalRecipeCardProps) {
  const detailUrl = `/external-recipes/themealdb/${recipe.externalId}`;

  const ingredientPreview = recipe.ingredients
    .slice(0, 4)
    .map((i) => i.name)
    .join(", ");
  const remaining = recipe.ingredients.length - 4;

  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-300 flex flex-col">
      <Link
        to={detailUrl}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden="true"
      >
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-muted">
            🍽
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {recipe.providerCategory && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              {recipe.providerCategory}
            </span>
          )}
          {recipe.cuisine && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              {recipe.cuisine}
            </span>
          )}
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-muted-foreground">
            TheMealDB
          </span>
        </div>

        <Link to={detailUrl} className="group/title">
          <h3 className="font-bold text-base leading-snug text-foreground group-hover/title:text-primary transition-colors">
            {recipe.title}
          </h3>
        </Link>

        {recipe.ingredients.length > 0 && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {ingredientPreview}
            {remaining > 0 ? ` +${remaining} more` : ""}
          </p>
        )}
      </div>
    </article>
  );
}
