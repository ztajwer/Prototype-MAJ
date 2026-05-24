import {
  SHOWROOM_PIECES,
  getProductById,
  type Product,
} from "@/lib/data";
import { getProductImageSrc } from "@/lib/product-images";

/** Pieces in the live carousel — each has photography in `public/products/`. */
export function getShowroomProducts(): Product[] {
  return SHOWROOM_PIECES.map((piece) => getProductById(piece.productId)).filter(
    (p): p is Product => Boolean(p)
  );
}

export function getCatalogProductsWithImages(): Product[] {
  return getShowroomProducts().filter((p) =>
    Boolean(getProductImageSrc(p.id))
  );
}
