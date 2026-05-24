import Link from "next/link";
import { BRAND } from "@/lib/data";
import { productTypeLabel } from "@/lib/product-seo";
import { getCatalogProductsWithImages } from "@/lib/showroom-products";

/** Server-rendered collection links — visible to crawlers when the showroom is client-only. */
export function ShowroomSeoCatalog() {
  const products = getCatalogProductsWithImages();

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="seo-catalog"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clipPath: "inset(50%)",
      }}
    >
      <h1 id="collection-heading" className="seo-catalog__title">
        {BRAND.legalName} — Luxury jewellery collection
      </h1>
      <p className="seo-catalog__lead">
        Explore {products.length} curated pieces — rings, necklaces, earrings,
        bracelets, and watches. Each opens in our private customize atelier.
      </p>
      <nav aria-label="Jewellery collection">
        <ul className="seo-catalog__list">
          {products.map((product) => (
            <li key={product.id} className="seo-catalog__item">
              <Link href={`/products/${product.id}`} prefetch tabIndex={-1}>
                <span className="seo-catalog__name">{product.name}</span>
                <span className="seo-catalog__meta">
                  {productTypeLabel(product.type)} · {product.collection} ·{" "}
                  {product.price}
                </span>
              </Link>
              <p className="seo-catalog__desc">{product.tagline}</p>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
