export function createYouTubeSearchUrl(recipeTitle: string): string {
  const query = encodeURIComponent(`${recipeTitle} recipe`);
  return `https://www.youtube.com/results?search_query=${query}`;
}
