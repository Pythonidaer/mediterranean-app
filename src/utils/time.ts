export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function totalMinutes(prep: number, cook: number): number {
  return prep + cook;
}

export function totalTime(prep: number, cook: number): string {
  return formatMinutes(totalMinutes(prep, cook));
}
