export type CuratedRecipeIngredient = {
  name: string;
  normalizedName: string;
  amount: string;
  optional?: boolean;
};

export type CuratedRecipe = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  ingredients: CuratedRecipeIngredient[];
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

export type CuratedRecipeCategory =
  | "Wraps"
  | "One Pot"
  | "Slow Cooker"
  | "Vegetarian"
  | "High Protein"
  | "Quick";

export type CuratedIngredientMatchResult = {
  recipe: CuratedRecipe;
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
};
