import { X } from "lucide-react";

interface IngredientTagProps {
  label: string;
  onRemove: () => void;
}

export default function IngredientTag({ label, onRemove }: IngredientTagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lemon text-lemon-foreground text-sm font-medium">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 transition-colors focus-visible:outline-2 focus-visible:outline-lemon-foreground"
      >
        <X size={12} />
      </button>
    </span>
  );
}
