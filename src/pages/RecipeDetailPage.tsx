import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Refrigerator,
  Users,
  ChefHat,
  AlertCircle,
} from "lucide-react";
import { curatedRecipes } from "../data/curatedRecipes";
import { formatMinutes, totalTime } from "../utils/time";

const CATEGORY_COLORS: Record<string, string> = {
  Wraps: "bg-lemon text-lemon-foreground",
  "One Pot": "bg-cucumber/20 text-cucumber-foreground",
  "Slow Cooker": "bg-accent text-accent-foreground",
  Vegetarian: "bg-cucumber/20 text-cucumber-foreground",
  "High Protein": "bg-secondary text-secondary-foreground",
  Quick: "bg-lemon text-lemon-foreground",
};

export default function RecipeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const recipe = curatedRecipes.find((r) => r.slug === slug);

  if (!recipe) return <Navigate to="/not-found" replace />;

  return (
    <div className="container-page py-8 md:py-12 max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        to="/recipes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group focus-visible:outline-2 focus-visible:outline-ring rounded"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        All Recipes
      </Link>

      {/* Hero image */}
      <div className="rounded-3xl overflow-hidden aspect-[16/7] bg-muted mb-8 shadow-card">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.categories.map((cat) => (
            <span
              key={cat}
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[cat] ?? "bg-muted text-muted-foreground"}`}
            >
              {cat}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          {recipe.title}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {recipe.description}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { label: "Prep", value: formatMinutes(recipe.prepMinutes), icon: Clock },
          { label: "Cook", value: formatMinutes(recipe.cookMinutes), icon: ChefHat },
          { label: "Total", value: totalTime(recipe.prepMinutes, recipe.cookMinutes), icon: Clock },
          { label: "Servings", value: `${recipe.servings} servings`, icon: Users },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-accent text-accent-foreground shrink-0">
              <s.icon size={16} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-sm font-bold text-foreground">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10">
        {/* Left: Ingredients + storage */}
        <div className="flex flex-col gap-6">
          {/* Ingredients */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Ingredients</h2>
            <ul className="flex flex-col gap-2">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className={`flex items-start justify-between gap-3 py-2 border-b border-border last:border-0 ${
                    ing.optional ? "opacity-60" : ""
                  }`}
                >
                  <span className="text-sm text-foreground">
                    {ing.name}
                    {ing.optional && (
                      <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
                    )}
                  </span>
                  <span className="text-sm text-muted-foreground text-right shrink-0">
                    {ing.amount}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Storage */}
          <section className="bg-accent/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-accent-foreground font-semibold text-sm">
              <Refrigerator size={16} />
              Storage · up to {recipe.storageDays} days
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {recipe.storageInstructions}
            </p>
            {recipe.reheatingInstructions && (
              <>
                <div className="text-xs font-semibold text-accent-foreground mt-2">Reheating</div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {recipe.reheatingInstructions}
                </p>
              </>
            )}
          </section>

          {/* Substitutions */}
          {recipe.substitutions && recipe.substitutions.length > 0 && (
            <section>
              <h2 className="text-base font-bold text-foreground mb-3">Substitutions</h2>
              <ul className="flex flex-col gap-2">
                {recipe.substitutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right: Instructions + meal prep */}
        <div className="flex flex-col gap-8">
          {/* Instructions */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Instructions</h2>
            <ol className="flex flex-col gap-5">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Meal prep notes */}
          {recipe.mealPrepNotes.length > 0 && (
            <section className="bg-lemon/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-lemon-foreground font-semibold text-sm mb-3">
                <AlertCircle size={16} />
                Meal Prep Notes
              </div>
              <ul className="flex flex-col gap-2">
                {recipe.mealPrepNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-lemon-foreground mt-0.5 shrink-0">✓</span>
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

    </div>
  );
}
