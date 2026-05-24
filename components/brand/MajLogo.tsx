"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  logoSrcForBackground,
  type LogoBackground,
} from "@/lib/brand-logos";

type MajLogoProps = {
  /** `light` = white-bg logo (public/logos/wh_logo.png); `dark` = bl_logo on dark surfaces */
  background?: LogoBackground;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Target display height (px) */
  height?: number;
};

export function MajLogo({
  background = "light",
  className,
  imageClassName,
  priority = false,
  height = 120,
}: MajLogoProps) {
  const src = logoSrcForBackground(background);
  const width = Math.round(height * 2.25);
  const isJfif = src.endsWith(".jfif");

  return (
    <span
      className={cn(
        "relative inline-flex items-center overflow-hidden",
        background === "light" && "rounded-xl",
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
          background === "light" && "rounded-xl",
          imageClassName
        )}
        style={{ height: `${height}px`, width: "auto" }}
        sizes={`(max-width: 768px) ${Math.min(width, 300)}px, ${width}px`}
      />
    </span>
  );
}
