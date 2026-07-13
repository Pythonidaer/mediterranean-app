import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, RefreshCw, ExternalLink, PlayCircle } from "lucide-react";
import type { ExternalRecipe } from "../types/externalRecipe";
import { getMealById } from "../services/mealDb/mealDbClient";
import { createYouTubeSearchUrl } from "../utils/youtube";

type PageState =
  | { status: "loading" }
  | { status: "success"; recipe: ExternalRecipe }
  | { status: "not-found" }
  | { status: "error"; error: string };

export default function ExternalRecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [pageState, setPageState] = useState<PageState>({ status: "loading" });

  const load = useCallback(async () => {
    if (!id) {
      setPageState({ status: "not-found" });
      return;
    }

    setPageState({ status: "loading" });

    try {
      const recipe = await getMealById(id);
      if (recipe) {
        setPageState({ status: "success", recipe });
      } else {
        setPageState({ status: "not-found" });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load recipe.";
      setPageState({ status: "error", error: message });
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  if (pageState.status === "loading") {
    return (
      <div className="container-page py-20 max-w-4xl mx-auto">
        <div
          className="flex flex-col items-center gap-4 text-muted-foreground"
          aria-live="polite"
          aria-label="Loading recipe"
        >
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (pageState.status === "not-found") {
    return (
      <div className="container-page py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Recipe not found
        </h1>
        <p className="text-muted-foreground mb-6">
          This recipe could not be found on TheMealDB.
        </p>
        <Link
          to="/what-can-i-make"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ArrowLeft size={16} />
          Back to search
        </Link>
      </div>
    );
  }

  if (pageState.status === "error") {
    return (
      <div className="container-page py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-6">{pageState.error}</p>
        <button
          onClick={() => void load()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  const { recipe } = pageState;
  const youtubeSearchUrl = createYouTubeSearchUrl(recipe.title);

  return (
    <div className="container-page py-8 md:py-12 max-w-4xl mx-auto">
      <Link
        to="/what-can-i-make"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group focus-visible:outline-2 focus-visible:outline-ring rounded"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        Back to search
      </Link>

      {recipe.imageUrl && (
        <div className="rounded-3xl overflow-hidden aspect-[16/7] bg-muted mb-8 shadow-card">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const parent = e.currentTarget.parentElement;
              if (parent) parent.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          {recipe.providerCategory && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
              {recipe.providerCategory}
            </span>
          )}
          {recipe.cuisine && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
              {recipe.cuisine}
            </span>
          )}
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border border-border text-muted-foreground">
            TheMealDB
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          {recipe.title}
        </h1>

        <div className="flex flex-wrap gap-3">
          {recipe.youtubeUrl && (
            <a
              href={recipe.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
            >
              <PlayCircle size={16} />
              Watch recipe video
              <span className="sr-only">(opens in new tab)</span>
            </a>
          )}
          <a
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
          >
            <PlayCircle size={16} />
            Search YouTube
            <span className="sr-only">(opens in new tab)</span>
          </a>
          {recipe.sourceUrl && (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
            >
              <ExternalLink size={16} />
              View original source
              <span className="sr-only">(opens in new tab)</span>
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10">
        <div className="flex flex-col gap-6">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Ingredients
            </h2>
            {recipe.ingredients.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-3 py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-foreground">{ing.name}</span>
                    <span className="text-sm text-muted-foreground text-right shrink-0">
                      {ing.amount}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No ingredient list available.
              </p>
            )}
          </section>

          <section className="bg-muted/60 rounded-2xl p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Storage and reheating guidance are not provided by this recipe
              source.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Instructions
            </h2>
            {recipe.instructions.length > 0 ? (
              <ol className="flex flex-col gap-5">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">
                No instructions available.
              </p>
            )}
          </section>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Recipe data provided by{" "}
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            TheMealDB
            <span className="sr-only">(opens in new tab)</span>
          </a>
          . This recipe was not authored or tested by GreenBean.
        </p>
      </div>
    </div>
  );
}
