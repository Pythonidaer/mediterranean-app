import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-base text-foreground">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground">
                <Leaf size={14} />
              </span>
              Fresco
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Calm, healthy Mediterranean meal prep. Plan once, eat well all week.
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { to: "/recipes", label: "All Recipes" },
                { to: "/what-can-i-make", label: "What Can I Make?" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Wraps", "One Pot", "High Protein", "Vegetarian"].map((c) => (
                <li key={c}>
                  <Link
                    to={`/recipes?category=${encodeURIComponent(c)}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-muted-foreground">
          <span>© 2026 Fresco. Made for slow Sundays.</span>
          <span>Fresh · Healthy · Made ahead</span>
        </div>

      </div>
    </footer>
  );
}
