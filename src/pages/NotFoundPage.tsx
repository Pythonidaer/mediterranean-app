import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container-page py-20 flex flex-col items-center text-center gap-6">
      <span className="text-6xl">🍋</span>
      <h1 className="text-3xl font-extrabold text-foreground">Page not found</h1>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
        This page doesn't exist or the recipe link may have changed. Head back home to keep browsing.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
        >
          Go home
        </Link>
        <Link
          to="/recipes"
          className="px-6 py-3 rounded-full border border-border bg-card text-foreground text-sm font-semibold hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
        >
          Browse recipes
        </Link>
      </div>
    </div>
  );
}
