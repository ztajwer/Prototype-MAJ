import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/data";

export const runtime = "edge";
export const alt = `${BRAND.shortName} — Luxury Jewelry Showroom`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(ellipse at 50% 35%, rgba(212,175,55,0.30) 0%, rgba(5,5,5,0) 55%)",
          color: "#f6ead0",
          fontFamily: "serif",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 60,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(212,175,55,0.5)",
              borderRadius: 999,
              fontSize: 18,
              letterSpacing: 6,
              color: "#f6ead0",
            }}
          >
            MAJ
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 30,
                letterSpacing: 4,
                color: "#ecebe6",
              }}
            >
              {BRAND.legalName}
            </span>
            <span
              style={{
                fontSize: 14,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#bdbfc6",
              }}
            >
              Luxury Jewellery Showroom
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              color: "#ecebe6",
              letterSpacing: -1,
            }}
          >
            High jewelry,
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1,
              fontStyle: "italic",
              color: "#f6ead0",
              textShadow: "0 0 40px rgba(212,175,55,0.5)",
            }}
          >
            composed in light.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 80,
            paddingRight: 80,
            fontSize: 14,
            letterSpacing: 6,
            color: "#8c8f99",
            textTransform: "uppercase",
          }}
        >
          <span>14 Place Vendôme · Paris</span>
          <span>Established 1924</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
