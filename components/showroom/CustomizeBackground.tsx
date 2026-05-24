"use client";

import type { ReactNode } from "react";
import { PRELOADER_BG } from "@/lib/media";

type CustomizeBackgroundProps = {
  children?: ReactNode;
};

/** Full-viewport atelier backdrop — `public/pla.avif` */
export function CustomizeBackground({ children }: CustomizeBackgroundProps) {
  return (
    <div className="customize-bg pointer-events-none" aria-hidden>
      <div
        className="customize-bg__image"
        style={{ backgroundImage: `url('${PRELOADER_BG}')` }}
      />
      <div className="customize-bg__veil" />
      {children}
    </div>
  );
}
