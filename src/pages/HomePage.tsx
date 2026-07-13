import { Link } from "react-router-dom";
import { ArrowRight, Search, ChefHat, CalendarDays, Wallet, Leaf, Sparkles } from "lucide-react";
import { curatedRecipes } from "../data/curatedRecipes";
import RecipeCard from "../components/recipes/RecipeCard";

const CATEGORY_ICONS: Record<string, string> = {
  Wraps: "🌯",
  "One Pot": "🍲",
  "High Protein": "💪",
  Vegetarian: "🥗",
  "Slow Cooker": "🥘",
  Quick: "⚡",
};

const CATEGORIES = ["Wraps", "One Pot", "High Protein", "Vegetarian", "Slow Cooker", "Quick"];

const BENEFITS = [
  {
    icon: ChefHat,
    title: "Cook Once",
    desc: "One relaxed session covers your whole week.",
  },
  {
    icon: CalendarDays,
    title: "Eat All Week",
    desc: "Meals that stay fresh for days, not hours.",
  },
  {
    icon: Wallet,
    title: "Budget Friendly",
    desc: "Fewer ingredients, less waste, real savings.",
  },
  {
    icon: Leaf,
    title: "Healthy Ingredients",
    desc: "Whole foods, olive oil and lots of greens.",
  },
  {
    icon: Sparkles,
    title: "Minimal Cleanup",
    desc: "One-pot and tray-bake recipes by design.",
  },
];

export default function HomePage() {
  const featured = curatedRecipes.filter((r) => r.featured).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold w-fit">
              <Leaf size={12} />
              Mediterranean · made ahead
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
              Simple Mediterranean Meal Prep
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              Looking for wraps, one-pot meals, or something Mediterranean that
              lasts a few days? Start here.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/recipes"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
              >
                Browse Recipes
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/what-can-i-make"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-card text-foreground font-semibold text-sm hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Search size={14} />
                Find Recipes by Ingredients
              </Link>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-muted shadow-lift">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80"
              alt="Mediterranean meal prep containers"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-card flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent">
                <Leaf size={14} className="text-accent-foreground" />
              </span>
              <div>
                <div className="text-sm font-bold text-foreground">5 days fresh</div>
                <div className="text-xs text-muted-foreground">Prep-friendly recipes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page pb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Browse by category</h2>
            <p className="text-sm text-muted-foreground mt-1">Pick a style and start planning.</p>
          </div>
          <Link
            to="/recipes"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            All curated recipes <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/recipes?category=${encodeURIComponent(cat)}`}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 hover:bg-secondary hover:shadow-soft transition-all group focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {CATEGORY_ICONS[cat]}
              </span>
              <span className="text-xs font-medium text-foreground text-center leading-tight">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured recipes */}
      <section className="container-page pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Featured recipes</h2>
            <p className="text-sm text-muted-foreground mt-1">Hand-picked meals worth prepping.</p>
          </div>
          <Link
            to="/recipes"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      </section>

      {/* Benefits banner */}
      <section className="container-page pb-16">
        <div className="bg-primary rounded-3xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-primary-foreground mb-8">
            Mediterranean meal prep benefits
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex flex-col gap-2">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
                  <b.icon size={16} className="text-primary-foreground" />
                </div>
                <div className="text-sm font-semibold text-primary-foreground">{b.title}</div>
                <div className="text-xs text-primary-foreground/75 leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Ingredient search */}
      <section className="container-page pb-20">
        <div className="bg-card border border-border rounded-3xl p-10 flex flex-col items-center text-center gap-5 shadow-soft">
          <span className="text-4xl">🍋</span>
          <h2 className="text-2xl font-bold text-foreground">Got a fridge full of odds and ends?</h2>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            Search with ingredients in your fridge to find suggested few recipes to try.
          </p>
          <Link
            to="/what-can-i-make"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
          >
            What Can I Make?
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
