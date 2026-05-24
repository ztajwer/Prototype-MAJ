function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Slow first-person walk through the doorway (~6.4s) */
export const SHOWROOM_WALK_IN_MS = 6400;

/** Unhurried cubic in-out — gentle start, steady drift, soft landing */
export function cinematicWalkEase(t: number): number {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/** Fade overlays during the walk-in */
export function walkInFade(t: number): number {
  return clamp(cinematicWalkEase(t), 0, 1);
}
