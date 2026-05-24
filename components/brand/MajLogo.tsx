"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  logoSrcForBackground,
  type LogoBackground,
} from "@/lib/brand-logos";

type MajLogoProps = {
  /** Override default brand lockup (e.g. loader PNG) */
  src?: string;
  /** `light` = white-bg logo (public/logos/wh_logo.png); `dark` = bl_logo on dark surfaces */
  background?: LogoBackground;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Target display height (px) */
  height?: number;
};

export function MajLogo({
  src: srcOverride,
  background = "light",
  className,
  imageClassName,
  priority = false,
  height = 120,
}: MajLogoProps) {
  const src = srcOverride ?? logoSrcForBackground(background);
  const width = Math.round(height * 2.25);
  const isJfif = src.endsWith(".jfif");
  const framed = background === "light" && !srcOverride;

  return (
    <span
      className={cn(
        "relative inline-flex items-center overflow-hidden",
        framed && "rounded-xl",
        className
      )}
    >
      <Image
        src={src}
        alt="MAJ Boutique"
        width={width}
        height={height}
        priority={priority}
        unoptimized={isJfif}
        className={cn(
          "w-auto object-contain",
          framed && "rounded-xl",
          imageClassName
        )}
        style={{ height: `${height}px`, width: "auto" }}
        sizes={`(max-width: 768px) ${Math.min(width, 300)}px, ${width}px`}
      />
    </span>
  );
}
