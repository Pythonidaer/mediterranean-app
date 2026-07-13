export type ExternalRecipeIngredient = {
  name: string;
  normalizedName: string;
  amount: string;
};

export type ExternalRecipe = {
  source: "themealdb";
  externalId: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  providerCategory?: string;
  cuisine?: string;
  tags: string[];
  ingredients: ExternalRecipeIngredient[];
  instructions: string[];
  sourceUrl?: string;
  youtubeUrl?: string;
};

export type ExternalRecipeMatch = {
  recipe: ExternalRecipe;
  matchedIngredients: string[];
  missingIngredients: string[];
  enteredIngredientMatchCount: number;
  enteredIngredientCount: number;
  recipeIngredientCount: number;
  matchPercentage: number;
};
