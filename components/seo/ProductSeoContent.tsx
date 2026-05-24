import Link from "next/link";
import type { Product } from "@/lib/data";
import { BRAND } from "@/lib/data";
import {
  productMetaDescription,
  productPageUrl,
  productTypeLabel,
} from "@/lib/product-seo";

/** Crawlable product copy — supplements the interactive customize room. */
export function ProductSeoContent({ product }: { product: Product }) {
  const pageUrl = productPageUrl(product);

  return (
    <article className="seo-product" aria-labelledby="seo-product-title">
      <header className="seo-product__header">
        <p className="seo-product__eyebrow">
          <Link href="/" tabIndex={-1}>
            {BRAND.shortName} showroom
          </Link>
          <span aria-hidden={true}>{" · "}</span>
          {productTypeLabel(product.type)}
        </p>
        <h1 id="seo-product-title" className="seo-product__title">
          {product.name}
        </h1>
        <p className="seo-product__collection">{product.collection}</p>
        <p className="seo-product__price">{product.price}</p>
      </header>

      <p className="seo-product__tagline">{product.tagline}</p>
      <p className="seo-product__description">
        {productMetaDescription(product)}
      </p>

      <dl className="seo-product__details">
        {product.details.map((row) => (
          <div key={row.label} className="seo-product__detail">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="seo-product__url">
        <a href={pageUrl}>{pageUrl}</a>
      </p>

      <p className="seo-product__back">
        <Link href="/#collection" tabIndex={-1}>
          ← Back to {BRAND.legalName} showroom
        </Link>
      </p>
    </article>
  );
}
