"use client";

/** Subtle fixed stars + soft shimmer — stays behind products */
const STARS = [
  { l: 8, t: 12, s: 2, d: 0 },
  { l: 22, t: 8, s: 1.5, d: 1.2 },
  { l: 78, t: 14, s: 2, d: 0.6 },
  { l: 92, t: 22, s: 1.5, d: 2 },
  { l: 15, t: 38, s: 1.5, d: 1.8 },
  { l: 88, t: 42, s: 2, d: 0.4 },
  { l: 6, t: 58, s: 1.5, d: 2.4 },
  { l: 35, t: 18, s: 1.5, d: 3 },
  { l: 62, t: 28, s: 2, d: 1.1 },
  { l: 48, t: 10, s: 1.5, d: 2.2 },
  { l: 72, t: 62, s: 1.5, d: 0.9 },
  { l: 28, t: 72, s: 2, d: 1.5 },
  { l: 55, t: 68, s: 1.5, d: 2.8 },
  { l: 94, t: 55, s: 2, d: 1.3 },
  { l: 42, t: 48, s: 1.5, d: 3.5 },
  { l: 18, t: 82, s: 1.5, d: 0.2 },
  { l: 82, t: 78, s: 2, d: 2.6 },
  { l: 58, t: 85, s: 1.5, d: 1.7 },
] as const;

export function ShowroomSparkles() {
  return (
    <div aria-hidden className="showroom-sparkle-field pointer-events-none absolute inset-0 z-[3]">
      <div className="showroom-sparkle-shimmer absolute inset-0" />
      {STARS.map((star, i) => (
        <span
          key={i}
          className="showroom-star"
          style={{
            left: `${star.l}%`,
            top: `${star.t}%`,
            width: star.s,
            height: star.s,
            animationDelay: `${star.d}s`,
          }}
        />
      ))}
    </div>
  );
}
