import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export default function FavoriteButton({
  isFavorite,
  onToggle,
  className = "",
}: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-soft transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-ring ${className}`}
    >
      <Heart
        size={16}
        className={
          isFavorite
            ? "fill-tomato stroke-tomato"
            : "stroke-muted-foreground"
        }
      />
    </button>
  );
}
