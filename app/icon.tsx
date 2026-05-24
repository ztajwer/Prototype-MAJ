import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(212,175,55,0.55) 0%, rgba(10,10,11,0) 70%)",
          color: "#f6ead0",
          fontFamily: "serif",
          fontSize: 30,
          letterSpacing: 4,
          fontWeight: 300,
          borderRadius: 999,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
