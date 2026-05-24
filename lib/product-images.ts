/** Real product photography in `public/products/` */
export const RING_IMAGE = "/products/ring.png";
export const WATCH_IMAGE = "/products/watch.png";
export const EARRING_IMAGE = "/products/earing.webp";
export const PENDANT_IMAGE = "/products/pen.webp";
export const CHOKER_IMAGE = "/products/nec.png";
export const BRACELET_IMAGE = "/products/bra.webp";

export const PRODUCT_IMAGE_BY_ID: Record<string, string> = {
  "celestial-diamond-ring": RING_IMAGE,
  "lumiere-pendant": PENDANT_IMAGE,
  "constellation-choker": CHOKER_IMAGE,
  "etoile-bangle": BRACELET_IMAGE,
  "meridien-chronograph": WATCH_IMAGE,
  "celestial-ear-climber": EARRING_IMAGE,
};

export type ProductImageRender = "knockout" | "light";

/** Per-product showroom fit — keeps every piece fully visible inside the disc */
export type ProductShowroomFit = {
  padding: string;
  imageScale: number;
};

export const PRODUCT_SHOWROOM_FIT: Record<string, ProductShowroomFit> = {
  "celestial-diamond-ring": { padding: "5%", imageScale: 1.1 },
  "lumiere-pendant": { padding: "3%", imageScale: 1.12 },
  "constellation-choker": { padding: "2%", imageScale: 1.16 },
  "etoile-bangle": { padding: "2%", imageScale: 1.18 },
  "meridien-chronograph": { padding: "4%", imageScale: 1.14 },
  "celestial-ear-climber": { padding: "3%", imageScale: 1.12 },
};

/** Black studio backdrops — screen blend on glass pedestals */
const KNOCKOUT_BG_IDS = new Set<string>([
  "celestial-diamond-ring",
  "constellation-choker",
  "meridien-chronograph",
]);

/** Light/white studio backdrops — multiply on warm cream glass */
const LIGHT_BG_IDS = new Set<string>([
  "lumiere-pendant",
  "etoile-bangle",
  "celestial-ear-climber",
]);

export function getProductImageSrc(productId: string): string | undefined {
  return PRODUCT_IMAGE_BY_ID[productId];
}

export function getProductShowroomFit(productId: string): ProductShowroomFit {
  return (
    PRODUCT_SHOWROOM_FIT[productId] ?? { padding: "5%", imageScale: 1.05 }
  );
}

export function productImageRenderMode(
  productId: string
): ProductImageRender | undefined {
  if (KNOCKOUT_BG_IDS.has(productId)) return "knockout";
  if (LIGHT_BG_IDS.has(productId)) return "light";
  return undefined;
}

export function productUsesKnockoutBg(productId: string): boolean {
  return KNOCKOUT_BG_IDS.has(productId);
}

export function productUsesWhiteDiscBlend(productId: string): boolean {
  return LIGHT_BG_IDS.has(productId);
}

/** Full-resolution catalog shots — no optimizer recompression */
export function productUsesUnoptimizedImage(productId: string): boolean {
  return Boolean(PRODUCT_IMAGE_BY_ID[productId]);
}
