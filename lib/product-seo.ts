import type { Metadata } from "next";
import type { Product } from "@/lib/data";
import { BRAND } from "@/lib/data";
import { getProductImageSrc } from "@/lib/product-images";
import { absoluteUrl, canonicalPath } from "@/lib/site-url";
import { SITE_LOCALE, buildPageMetadata } from "@/lib/seo";

export { absoluteUrl } from "@/lib/site-url";

export function parseProductPriceEur(price: string): number | undefined {
  const n = Number(price.replace(/[^0-9]/g, ""));
  return n > 0 ? n : undefined;
}

export function productMetaDescription(product: Product): string {
  const lead = product.tagline.trim();
  const body = product.description.trim();
  const combined = `${lead} ${body}`;
  if (combined.length <= 160) return combined;
  return `${combined.slice(0, 157).trimEnd()}...`;
}

export function productSeoTitle(product: Product): string {
  return `${product.name} · ${product.collection}`;
}

export function productTypeLabel(type: Product["type"]): string {
  const labels: Record<Product["type"], string> = {
    ring: "Luxury ring",
    necklace: "Luxury necklace",
    bracelet: "Luxury bracelet",
    watch: "Luxury watch",
    earring: "Luxury earrings",
  };
  return labels[type];
}

export function productSeoKeywords(product: Product): string[] {
  return [
    ...product.keywords,
    product.name,
    product.collection,
    productTypeLabel(product.type),
    "haute joaillerie",
    BRAND.shortName,
    BRAND.legalName,
    "MAJ Boutique",
    "customize jewelry",
    "private viewing",
    "Paris jewelry",
  ];
}

/** Social share image — dynamic OG route with product name & photo. */
export function productOgImagePath(product: Product): string {
  return `/products/${product.id}/opengraph-image`;
}

export function productOgImage(product: Product): {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
} {
  const alt = `${product.name} — ${product.collection} · ${BRAND.shortName}`;
  return {
    url: productOgImagePath(product),
    width: 1200,
    height: 630,
    alt,
    type: "image/png",
  };
}

/** Full metadata for `/products/[id]` — static, crawler-ready. */
export function buildProductMetadata(product: Product): Metadata {
  const title = productSeoTitle(product);
  const description = productMetaDescription(product);
  const path = `/products/${product.id}`;
  const canonical = canonicalPath(path);
  const og = productOgImage(product);
  const fullTitle = `${title} · ${BRAND.shortName}`;
  const price = parseProductPriceEur(product.price);

  return {
    ...buildPageMetadata({
      title,
      description,
      path,
      keywords: productSeoKeywords(product),
      ogImagePath: og.url,
    }),
    openGraph: {
      type: "website",
      url: canonical,
      siteName: BRAND.legalName,
      title: fullTitle,
      description,
      locale: SITE_LOCALE,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [og],
    },
    category: "Luxury Jewelry",
    other: {
      "product:brand": BRAND.legalName,
      "product:availability": "in stock",
      "product:condition": "new",
      "product:price:amount": price ? String(price) : "",
      "product:price:currency": "EUR",
      "product:retailer_item_id": product.id,
    },
  };
}

export function productImageAbsolute(product: Product): string {
  const src = getProductImageSrc(product.id);
  if (src) return absoluteUrl(src);
  return absoluteUrl(productOgImagePath(product));
}

export function productPageUrl(product: Product): string {
  return absoluteUrl(`/products/${product.id}`);
}
