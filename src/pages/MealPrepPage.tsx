import { Link } from "react-router-dom";
import { Clock, Refrigerator, Users, ArrowRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { recipes } from "../data/recipes";
import { useFavorites } from "../hooks/useFavorites";
import FavoriteButton from "../components/recipes/FavoriteButton";
import { formatMinutes } from "../utils/time";

const WEEK_PLAN = [
  { day: "MON", recipeId: "1" },
  { day: "TUE", recipeId: "9" },
  { day: "WED", recipeId: "8" },
  { day: "THU", recipeId: "5" },
  { day: "FRI", recipeId: "10" },
];

export default function MealPrepPage() {
  const { isFavorite, toggle } = useFavorites();
  const planRecipes = WEEK_PLAN.map((p) => ({
    day: p.day,
    recipe: recipes.find((r) => r.id === p.recipeId)!,
  }));

  const totalPrepMinutes = planRecipes.reduce(
    (sum, p) => sum + p.recipe.prepMinutes + p.recipe.cookMinutes,
    0
  );
  const totalServings = planRecipes.reduce((sum, p) => sum + p.recipe.servings, 0);
  const maxDays = Math.max(...planRecipes.map((p) => p.recipe.storageDays));

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          This week's plan
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          Your meal prep, mapped out
        </h1>
        <p className="text-muted-foreground text-sm max-w-md">
          Everything you'll cook this Sunday, ready to eat all week. Swap any recipe to make it yours.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {[
          { icon: Clock, label: "Total prep time", value: formatMinutes(totalPrepMinutes) },
          { icon: Users, label: "Meals prepared", value: `${totalServings} servings` },
          { icon: Refrigerator, label: "Stays fresh", value: `Up to ${maxDays} days` },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground shrink-0">
              <s.icon size={18} />
            </div>
            <div>
              <div className="text-lg font-extrabold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly plan cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-12">
        {planRecipes.map(({ day, recipe }) => (
          <Link
            key={day}
            to={`/recipes/${recipe.slug}`}
            className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card transition-all focus-visible:outline-2 focus-visible:outline-ring"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted relative">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 flex items-center justify-between w-[calc(100%-1rem)]">
                <span className="text-xs font-bold bg-white/90 text-foreground px-2 py-1 rounded-full">
                  {day}
                </span>
                <span className="text-xs text-white/90 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                  {recipe.servings} servings
                </span>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-foreground leading-snug line-clamp-2 mb-1">
                {recipe.title}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={10} />
                {formatMinutes(recipe.prepMinutes + recipe.cookMinutes)}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Full plan list */}
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-lg font-bold text-foreground">This week's recipes</h2>
        {planRecipes.map(({ day, recipe }) => (
          <div
            key={day}
            className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
          >
            <span className="text-xs font-bold text-muted-foreground w-8 shrink-0">{day}</span>
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground">{recipe.title}</div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                <span className="flex items-center gap-1"><Clock size={11} />{formatMinutes(recipe.prepMinutes + recipe.cookMinutes)}</span>
                <span className="flex items-center gap-1"><Refrigerator size={11} />{recipe.storageDays} days</span>
              </div>
            </div>
            <FavoriteButton
              isFavorite={isFavorite(recipe.id)}
              onToggle={() => toggle(recipe.id)}
            />
            <Link
              to={`/recipes/${recipe.slug}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
              aria-label={`View ${recipe.title}`}
            >
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-primary rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-primary-foreground mb-1">Not sure what to add?</h2>
          <p className="text-sm text-primary-foreground/75">
            Build your plan from ingredients you already have.
          </p>
        </div>
        <Link
          to="/what-can-i-make"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-foreground font-semibold text-sm hover:bg-cream transition-colors focus-visible:outline-2 focus-visible:outline-ring whitespace-nowrap shrink-0"
        >
          What Can I Make? <ArrowRight size={16} />
        </Link>
      </div>
    </PageContainer>
  );
}
