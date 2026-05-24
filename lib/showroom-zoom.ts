function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Smooth 0→1 easing for cinematic zoom */
export function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

/** Max scroll — camera dolly through the room (environment only) */
export const SHOWROOM_MAX_ZOOM = 1;

/** Glass table anchor in `public/background.png` (desktop) */
export const GLASS_TABLE = {
  bgOriginYStart: 30,
  bgOriginYEnd: 46,
} as const;

/** Glass table anchor in `public/mob.png` (mobile portrait) */
export const GLASS_TABLE_MOBILE = {
  bgOriginYStart: 36,
  bgOriginYEnd: 54,
} as const;

/** Fixed product placement — does not change with scroll */
const PRODUCT_LOCK = {
  desktop: {
    anchorY: 54,
    orbitScale: 0.78,
    cameraTilt: 5.5,
    tableTilt: 4,
    perspectiveY: 46,
    parallaxY: 16,
  },
  mobile: {
    anchorY: 52,
    orbitScale: 0.74,
    cameraTilt: 5,
    tableTilt: 3.5,
    perspectiveY: 50,
    parallaxY: 12,
  },
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
  /** Scroll / walk-in moves the camera through the room — background only */
  const travel = smoothstep(Math.pow(progress, 0.9));

  const table = mobile ? GLASS_TABLE_MOBILE : GLASS_TABLE;
  const lock = mobile ? PRODUCT_LOCK.mobile : PRODUCT_LOCK.desktop;
  const { bgOriginYStart, bgOriginYEnd } = table;

  return {
    progress,
    tableLand: 1,
    orbitDepthDamp: 0.1,
    /** Environment depth — stronger on mobile */
    bgScale: 1 + travel * (mobile ? 0.68 : 0.56),
    bgTranslateY: travel * (mobile ? 42 : 36),
    bgTilt: (1 - travel) * (mobile ? 5 : 5.5),
    vanishY: bgOriginYStart + (bgOriginYEnd - bgOriginYStart) * travel,
    /** Products locked on the table — size & orbit stay fixed */
    productScale: 1,
    orbitScale: lock.orbitScale,
    depthPush: 0,
    perspectiveY: lock.perspectiveY,
    anchorY: lock.anchorY,
    /** Subtle parallax so pieces track the table in the photo, not scale */
    offsetY: travel * lock.parallaxY,
    cameraTilt: lock.cameraTilt,
    tableTilt: lock.tableTilt,
  };
}
