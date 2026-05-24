import { ImageResponse } from "next/og";
import { BRAND, PRODUCTS } from "@/lib/data";
import { getProductImageSrc } from "@/lib/product-images";
import { absoluteUrl } from "@/lib/product-seo";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MAJ Boutique — Luxury Jewelry";

export default async function ProductOG({
  params,
}: {
  params: { id: string };
}) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  const name = product?.name ?? "Jewellery";
  const collection = product?.collection ?? "High Jewelry";
  const price = product?.price ?? "Atelier";
  const photoPath = product ? getProductImageSrc(product.id) : undefined;
  const photoUrl = photoPath ? absoluteUrl(photoPath) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#faf7f2",
          backgroundImage:
            "linear-gradient(135deg, #fffefb 0%, #f2ead8 48%, #faf7f2 100%)",
          color: "#2a2016",
          fontFamily: "Georgia, serif",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            maxWidth: 520,
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 14,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9c8550",
            }}
          >
            {BRAND.shortName} · Customize
          </span>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#b8a06a",
            }}
          >
            {collection}
          </span>
          <span
            style={{
              fontSize: 56,
              lineHeight: 1.05,
              color: "#2a2016",
              fontStyle: "italic",
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontSize: 28,
              color: "#9c8550",
              marginTop: 8,
            }}
          >
            {price}
          </span>
        </div>

        {photoUrl ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 420,
              height: 420,
              borderRadius: 9999,
              background:
                "radial-gradient(circle at 50% 30%, #ffffff 0%, #faf6ee 70%)",
              boxShadow:
                "0 24px 64px rgba(42, 32, 22, 0.12), inset 0 0 0 2px rgba(212, 188, 130, 0.5)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt=""
              width={340}
              height={340}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        ) : null}
      </div>
    ),
    { ...size }
  );
}
