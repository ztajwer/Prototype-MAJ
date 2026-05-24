import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 92,
          letterSpacing: 8,
          fontWeight: 300,
        }}
      >
        J
      </div>
    ),
    { ...size }
  );
}
