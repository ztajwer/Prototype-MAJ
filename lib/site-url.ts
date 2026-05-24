import { BRAND } from "@/lib/data";

/** Production domain from `NEXT_PUBLIC_SITE_URL` (required for live SEO). */
export function getSiteOrigin(): string {
  return BRAND.url.replace(/\/$/, "");
}

export function isProductionSiteUrl(): boolean {
  const origin = getSiteOrigin();
  return (
    !origin.includes("example") &&
    !origin.includes("localhost") &&
    !origin.includes("127.0.0.1")
  );
}

/** Absolute URL for metadata, JSON-LD, and sitemaps. */
export function absoluteUrl(path: string): string {
  const base = getSiteOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Path-only canonical (resolved via `metadataBase` in layout). */
export function canonicalPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return p === "" ? "/" : p;
}
