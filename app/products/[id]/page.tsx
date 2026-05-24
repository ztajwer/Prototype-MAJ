import { notFound } from "next/navigation";
import nextDynamic from "next/dynamic";
import { PRODUCTS } from "@/lib/data";
import {
  ProductBreadcrumbJsonLd,
  ProductJsonLd,
  ProductWebPageJsonLd,
} from "@/components/seo/JsonLd";
import { ProductSeoContent } from "@/components/seo/ProductSeoContent";
import type { Metadata } from "next";
import { buildProductMetadata } from "@/lib/product-seo";
import { getCatalogProductsWithImages } from "@/lib/showroom-products";

const ProductRoomPage = nextDynamic(
  () =>
    import("@/components/showroom/ProductRoomPage").then(
      (m) => m.ProductRoomPage
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 z-[80]"
        aria-busy="true"
        aria-label="Loading atelier"
      />
    ),
  }
);

type Params = { params: { id: string } };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getCatalogProductsWithImages().map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: "Piece Not Found",
      description:
        "This piece is currently in private viewing. Please return to the main collection.",
      robots: { index: false, follow: true },
    };
  }

  return buildProductMetadata(product);
}

export default function ProductPage({ params }: Params) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) return notFound();

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductWebPageJsonLd product={product} />
      <ProductBreadcrumbJsonLd product={product} />
      <ProductSeoContent product={product} />
      <ProductRoomPage product={product} />
    </>
  );
}
