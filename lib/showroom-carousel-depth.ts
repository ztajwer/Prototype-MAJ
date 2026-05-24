function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export type PieceDepthState = {
  depth: number;
  frontness: number;
  scale: number;
  opacity: number;
  translateZ: number;
  zIndex: number;
  isHero: boolean;
};

export function getPieceDepthState(
  slotAngleDeg: number,
  carouselRotationDeg: number
): PieceDepthState {
  const theta =
    (((slotAngleDeg + carouselRotationDeg) % 360) + 360) % 360;
  const rad = (theta * Math.PI) / 180;
  const depth = Math.cos(rad);
  const frontness = clamp((depth + 1) / 2, 0, 1);

  return {
    depth,
    frontness,
    scale: 0.88 + frontness * 0.14,
    opacity: 0.88 + frontness * 0.12,
    translateZ: depth * 16,
    zIndex: Math.round(10 + frontness * 90),
    isHero: frontness > 0.86,
  };
}
