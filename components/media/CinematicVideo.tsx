"use client";

import { WELCOME_VIDEO } from "@/lib/media";
import { cn } from "@/lib/utils";
import { forwardRef, type VideoHTMLAttributes } from "react";

export type CinematicVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "src" | "children"
> & {
  /** `cover` fills the frame; `contain` shows the full clip (portrait doors) */
  fit?: "cover" | "contain";
  src?: string;
};

export const CinematicVideo = forwardRef<HTMLVideoElement, CinematicVideoProps>(
  function CinematicVideo(
    {
      className,
      fit = "cover",
      src = WELCOME_VIDEO,
      autoPlay = true,
      muted = true,
      playsInline = true,
      preload = "metadata",
      disablePictureInPicture = true,
      style,
      ...props
    },
    ref
  ) {
    const objectStyle =
      fit === "contain"
        ? { objectFit: "contain" as const, objectPosition: "center center" }
        : { objectFit: "cover" as const, objectPosition: "center center" };

    return (
      <video
        ref={ref}
        src={src}
        className={cn(
          "cinematic-video",
          fit === "contain" && "cinematic-video--contain",
          className
        )}
        style={{ ...objectStyle, ...style }}
        autoPlay={autoPlay}
        muted={muted}
        playsInline={playsInline}
        preload={preload}
        disablePictureInPicture={disablePictureInPicture}
        {...props}
      />
    );
  }
);
