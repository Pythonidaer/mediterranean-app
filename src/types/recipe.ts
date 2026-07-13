export type RecipeIngredient = {
  name: string;
  normalizedName: string;
  amount: string;
  optional?: boolean;
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  storageDays: number;
  storageInstructions: string;
  reheatingInstructions?: string;
  mealPrepNotes: string[];
  substitutions?: string[];
  featured?: boolean;
};

export type RecipeCategory =
  | "Wraps"
  | "One Pot"
  | "Slow Cooker"
  | "Vegetarian"
  | "High Protein"
  | "Quick";

export type IngredientMatchResult = {
  recipe: Recipe;
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
};
