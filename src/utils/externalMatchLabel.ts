export function getExternalMatchLabel(matchPercentage: number): string {
  if (matchPercentage === 100) return "You have everything";
  if (matchPercentage >= 80) return "Strong ingredient match";
  if (matchPercentage >= 50) return "Good ingredient match";
  return "Partial ingredient match";
}
