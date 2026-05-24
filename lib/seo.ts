import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import {
  absoluteUrl,
  canonicalPath,
  getSiteOrigin,
  isProductionSiteUrl,
} from "@/lib/site-url";

export const SITE_LOCALE = "en_US";

export const SITE_TITLE = `${BRAND.legalName} — Luxury Jewellery Showroom`;

export const SITE_DESCRIPTION =
  "MAJ Boutique — haute joaillerie in Paris. Explore luxury rings, necklaces, earrings, bracelets, and watches in an immersive digital showroom. Customize each piece in our private atelier.";

export const SITE_KEYWORDS = [
  "MAJ Boutique",
  "luxury jewelry",
  "luxury jewellery",
  "haute joaillerie",
  "jewellery showroom",
  "jewelry showroom",
  "premium rings",
  "designer jewelry",
  "luxury necklace",
  "luxury earrings",
  "luxury bracelet",
  "luxury watch",
  "diamond ring",
  "engagement ring",
  "customize jewelry",
  "Place Vendôme jeweler",
  "Paris jewelry",
  "luxury atelier",
] as const;

export const defaultRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const defaultOpenGraph = {
  type: "website" as const,
  siteName: BRAND.legalName,
  locale: SITE_LOCALE,
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: `${BRAND.shortName} — Luxury Jewellery Showroom`,
    },
  ],
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [...SITE_KEYWORDS],
  noIndex = false,
  ogImagePath = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImagePath?: string;
}): Metadata {
  const canonical = canonicalPath(path);
  const ogImage = {
    url: ogImagePath,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical,
      languages: {
        en: canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      ...defaultOpenGraph,
      url: canonical,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: true } : defaultRobots,
    ...(isProductionSiteUrl()
      ? {}
      : {
          other: {
            "seo:environment": "staging",
          },
        }),
  };
}

export function rootLayoutMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteOrigin()),
    title: {
      default: SITE_TITLE,
      template: `%s · ${BRAND.shortName}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [...SITE_KEYWORDS],
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        "x-default": "/",
      },
    },
    applicationName: BRAND.legalName,
    authors: [{ name: BRAND.legalName, url: absoluteUrl("/") }],
    creator: BRAND.legalName,
    publisher: BRAND.legalName,
    category: "Luxury Jewelry",
    openGraph: {
      ...defaultOpenGraph,
      url: "/",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [defaultOpenGraph.images[0]],
    },
    robots: defaultRobots,
    icons: {
      icon: [{ url: "/icon", type: "image/png" }],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}
