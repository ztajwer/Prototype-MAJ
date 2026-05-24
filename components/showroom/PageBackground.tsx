"use client";

import { useEffect, useState } from "react";
import {
  PAGE_BACKGROUND,
  PAGE_BACKGROUND_MOBILE,
  PRELOADER_BG,
} from "@/lib/media";

type PageBackgroundProps = {
  scale?: number;
  originY?: number;
  translateY?: number;
  tilt?: number;
  variant?: "showroom" | "atelier";
};

const MOBILE_MQ = "(max-width: 767px)";

export function PageBackground({
  scale = 1,
  originY = 42,
  translateY = 0,
  tilt = 0,
  variant = "showroom",
}: PageBackgroundProps) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const atelier = variant === "atelier";
  const src = atelier
    ? PRELOADER_BG
    : mobile
      ? PAGE_BACKGROUND_MOBILE
      : PAGE_BACKGROUND;
  const objectPosition = atelier
    ? "center center"
    : mobile
      ? "center 50%"
      : "center 42%";

  return (
    <div
      className={`page-background pointer-events-none${atelier ? " page-background--atelier" : ""}`}
      aria-hidden
    >
      <div
        className={`page-background__layer${atelier ? " page-background__layer--atelier" : " page-background__layer--boutique"}`}
        style={
          atelier
            ? undefined
            : {
                transform: `perspective(2400px) scale3d(${scale}, ${scale}, 1) translate3d(0, ${translateY}px, 0) rotateX(${tilt}deg) translateZ(0)`,
                transformOrigin: `50% ${originY}%`,
              }
        }
      >
        <img
          src={src}
          alt=""
          draggable={false}
          className="page-background__image"
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}
