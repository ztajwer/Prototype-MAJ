/** MAJ logo — white-background lockup for boutique backdrop & light UI */
export const LOGO_WH = "/logos/wh_logo.jfif";

/** Loader screen lockup (transparent / remove-bg PNG) */
export const LOGO_PRELOADER = "/logos/wh_logo-removebg-preview.png";

/** Dark-background lockup (legacy) */
export const LOGO_ON_DARK = "/logos/bl_logo.jfif";

export type LogoBackground = "light" | "dark";

export function logoSrcForBackground(bg: LogoBackground): string {
  return bg === "light" ? LOGO_WH : LOGO_ON_DARK;
}
