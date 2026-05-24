function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Smooth 0→1 easing for cinematic zoom */
export function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

/** Max scroll — products stop on the glass table, never rush the camera */
export const SHOWROOM_MAX_ZOOM = 1;

/** Glass vitrine in `public/background.png` (desktop) */
export const GLASS_TABLE = {
  anchorYStart: 20,
  anchorYEnd: 54,
  bgOriginYStart: 30,
  bgOriginYEnd: 46,
  perspectiveYStart: 28,
  perspectiveYEnd: 44,
} as const;

/** Glass vitrine in `public/mob.png` (mobile portrait) */
export const GLASS_TABLE_MOBILE = {
  anchorYStart: 24,
  anchorYEnd: 52,
  bgOriginYStart: 36,
  bgOriginYEnd: 54,
  perspectiveYStart: 30,
  perspectiveYEnd: 52,
} as const;

export type ShowroomZoomState = {
  progress: number;
  tableLand: number;
  orbitDepthDamp: number;
  bgScale: number;
  bgTranslateY: number;
  bgTilt: number;
  productScale: number;
  orbitScale: number;
  depthPush: number;
  vanishY: number;
  perspectiveY: number;
  anchorY: number;
  offsetY: number;
  cameraTilt: number;
  tableTilt: number;
};

export function getShowroomZoomState(
  rawProgress: number,
  mobile = false
): ShowroomZoomState {
  const progress = clamp(rawProgress, 0, SHOWROOM_MAX_ZOOM);
  /** Camera dolly — slow at first, like stepping into the room */
  const travel = smoothstep(Math.pow(progress, 0.94));
  /** Products settle on the vitrine slightly after the camera moves */
  const productProgress = clamp((progress - 0.06) / 0.94, 0, 1);
  const land = smoothstep(productProgress);
  const anchorLand = smoothstep(Math.pow(productProgress, 0.48));

  const table = mobile ? GLASS_TABLE_MOBILE : GLASS_TABLE;
  const {
    anchorYStart,
    anchorYEnd,
    bgOriginYStart,
    bgOriginYEnd,
    perspectiveYStart,
    perspectiveYEnd,
  } = table;

  const cameraStart = mobile ? 12 : 14;
  const cameraEnd = mobile ? 5.5 : 6.5;

  return {
    progress,
    tableLand: land,
    orbitDepthDamp: 1 - land * 0.88,
    bgScale: 1 + travel * (mobile ? 0.48 : 0.58),
    bgTranslateY: travel * (mobile ? 24 : 34),
    /** Subtle ceiling tilt — eases flat as you walk in */
    bgTilt: (1 - travel) * (mobile ? 4.5 : 5.5),
    productScale: mobile ? 0.24 + land * 0.96 : 0.28 + land * 1.12,
    orbitScale: mobile ? 0.38 + land * 0.46 : 0.4 + land * 0.48,
    depthPush: travel * (mobile ? 12 : 16),
    vanishY: bgOriginYStart + (bgOriginYEnd - bgOriginYStart) * travel,
    perspectiveY:
      perspectiveYStart + (perspectiveYEnd - perspectiveYStart) * travel,
    anchorY: anchorYStart + (anchorYEnd - anchorYStart) * anchorLand,
    offsetY: mobile ? -6 + anchorLand * 6 : -8 + anchorLand * 8,
    /** Top-down doorway angle → natural eye-level at the vitrine */
    cameraTilt: cameraStart + (cameraEnd - cameraStart) * travel,
    tableTilt: land * (mobile ? 5.5 : 6.5),
  };
}
