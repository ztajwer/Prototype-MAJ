import { BRAND, type Product } from "@/lib/data";
import {
  absoluteUrl,
  parseProductPriceEur,
  productImageAbsolute,
  productMetaDescription,
  productPageUrl,
  productSeoTitle,
} from "@/lib/product-seo";
import { getCatalogProductsWithImages } from "@/lib/showroom-products";

type SchemaObject = Record<string, unknown>;

function Tag({ data }: { data: SchemaObject }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data: SchemaObject = {
    "@context": "https://schema.org",
    "@type": ["Organization", "JewelryStore"],
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.legalName,
    alternateName: BRAND.shortName,
    url: BRAND.url,
    logo: absoluteUrl("/logos/wh_logo.png"),
    image: absoluteUrl("/opengraph-image"),
    foundingDate: BRAND.founded,
    foundingLocation: {
      "@type": "Place",
      name: BRAND.city,
    },
    slogan: BRAND.tagline,
    description:
      "MAJ Boutique is a luxury Paris atelier for rings, necklaces, earrings, bracelets, and timepieces — each piece presented in an immersive digital showroom with private customization.",
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address.street,
      addressLocality: BRAND.address.locality,
      postalCode: BRAND.address.postalCode,
      addressRegion: BRAND.address.region,
      addressCountry: BRAND.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: BRAND.email,
      telephone: BRAND.phone,
      areaServed: ["FR", "US", "JP", "AE", "GB"],
      availableLanguage: ["en", "fr"],
    },
    sameAs: [
      BRAND.social.instagram,
      BRAND.social.pinterest,
      BRAND.social.youtube,
    ],
    priceRange: "€€€€",
  };
  return <Tag data={data} />;
}

export function WebsiteJsonLd() {
  const data: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BRAND.url}/#website`,
    url: BRAND.url,
    name: BRAND.legalName,
    alternateName: BRAND.shortName,
    description:
      "Luxury jewellery showroom with rings, necklaces, earrings, bracelets, and watches.",
    publisher: { "@id": `${BRAND.url}/#organization` },
    inLanguage: "en",
  };
  return <Tag data={data} />;
}

export function WebPageJsonLd() {
  const data: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BRAND.url}/#webpage`,
    url: BRAND.url,
    name: `${BRAND.legalName} — Luxury Jewellery Showroom`,
    description:
      "Immersive luxury jewellery showroom featuring curated rings, necklaces, earrings, bracelets, and watches.",
    isPartOf: { "@id": `${BRAND.url}/#website` },
    about: { "@id": `${BRAND.url}/#organization` },
    inLanguage: "en",
    primaryImageOfPage: absoluteUrl("/opengraph-image"),
    mainEntity: { "@id": `${BRAND.url}/#itemlist` },
  };
  return <Tag data={data} />;
}

export function ItemListJsonLd() {
  const featured = getCatalogProductsWithImages();
  const data: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BRAND.url}/#itemlist`,
    name: `${BRAND.shortName} — Featured Luxury Collection`,
    numberOfItems: featured.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: featured.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: productPageUrl(p),
      name: p.name,
      image: productImageAbsolute(p),
    })),
  };
  return <Tag data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.url,
    })),
  };
  return <Tag data={data} />;
}

export function ProductJsonLd({ product }: { product: Product }) {
  const pageUrl = productPageUrl(product);
  const price = parseProductPriceEur(product.price);
  const image = productImageAbsolute(product);
  const metal = product.details.find((d) => d.label === "Metal")?.value;

  const data: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    name: product.name,
    description: productMetaDescription(product),
    sku: product.id.toUpperCase().replace(/-/g, ""),
    mpn: product.id,
    image: [image],
    url: pageUrl,
    brand: {
      "@type": "Brand",
      name: BRAND.legalName,
    },
    manufacturer: { "@id": `${BRAND.url}/#organization` },
    category: productSeoTitle(product),
    ...(metal ? { material: metal } : {}),
    keywords: product.keywords.join(", "),
    isRelatedTo: {
      "@type": "Collection",
      name: product.collection,
    },
    additionalProperty: product.details.map((d) => ({
      "@type": "PropertyValue",
      name: d.label,
      value: d.value,
    })),
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            "@id": `${pageUrl}#offer`,
            url: pageUrl,
            priceCurrency: "EUR",
            price: String(price),
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": `${BRAND.url}/#organization` },
          },
        }
      : {}),
  };
  return <Tag data={data} />;
}

export function ProductWebPageJsonLd({ product }: { product: Product }) {
  const pageUrl = productPageUrl(product);
  const data: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${product.name} — Customize · ${BRAND.shortName}`,
    description: productMetaDescription(product),
    isPartOf: { "@id": `${BRAND.url}/#website` },
    about: { "@id": `${pageUrl}#product` },
    inLanguage: "en",
    primaryImageOfPage: productImageAbsolute(product),
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
  };
  return <Tag data={data} />;
}

export function ProductBreadcrumbJsonLd({ product }: { product: Product }) {
  const pageUrl = productPageUrl(product);
  return (
    <BreadcrumbJsonLd
      items={[
        { name: BRAND.shortName, url: BRAND.url },
        { name: "Showroom", url: `${BRAND.url}/#collection` },
        { name: product.name, url: pageUrl },
      ]}
    />
  );
}
