import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/product-seo";
import { getSiteOrigin } from "@/lib/site-url";
import { getCatalogProductsWithImages } from "@/lib/showroom-products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const products = getCatalogProductsWithImages();
  const home = getSiteOrigin();

  return [
    {
      url: home,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
