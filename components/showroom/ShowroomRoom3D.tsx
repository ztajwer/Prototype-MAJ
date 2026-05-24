"use client";

import type { CSSProperties } from "react";
import {
  ROOM_VANISH_X,
  ROOM_VANISH_Y,
  type RoomDepthState,
} from "@/hooks/useShowroomDepthZoom";
import type { MouseParallaxState } from "@/hooks/useShowroomMouseParallax";
import { SHOWROOM_BG, SHOWROOM_CORRIDOR_BG } from "@/lib/media";

type ShowroomRoom3DProps = {
  depth: RoomDepthState;
  wallScale: number;
  parallax: MouseParallaxState;
};

const CORNER_PILLARS = ["tl", "tr", "bl", "br"] as const;

/** Full-screen corridor (bbg) + 4 corner pillars + boutique back wall (b.png) */
export function ShowroomRoom3D({
  depth,
  wallScale,
  parallax,
}: ShowroomRoom3DProps) {
  const roomDepth = 150 + depth.progress * 130;
  const bgShiftX = parallax.nx * 14;
  const bgShiftY = parallax.ny * 10;

  const roomStyle = {
    "--room-vanish-x": `${ROOM_VANISH_X}%`,
    "--room-vanish-y": `${ROOM_VANISH_Y}%`,
    "--room-zoom": depth.zoom,
    "--room-wall-scale": wallScale,
    "--room-depth": `${roomDepth}px`,
    "--room-parallax-x": `${bgShiftX}px`,
    "--room-parallax-y": `${bgShiftY}px`,
  } as CSSProperties;

  return (
    <div className="luxury-room" style={roomStyle}>
      <div className="luxury-room__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SHOWROOM_CORRIDOR_BG}
          alt=""
          className="luxury-room__corridor"
          draggable={false}
          decoding="async"
        />

        <div className="luxury-room__portal">
          {CORNER_PILLARS.map((corner) => (
            <div
              key={corner}
              className={`luxury-room__corner-pillar luxury-room__corner-pillar--${corner}`}
              aria-hidden
            >
              <span className="luxury-room__corner-pillar-face luxury-room__corner-pillar-face--front" />
              <span className="luxury-room__corner-pillar-face luxury-room__corner-pillar-face--side" />
              <span className="luxury-room__corner-pillar-cap luxury-room__corner-pillar-cap--top" />
              <span className="luxury-room__corner-pillar-cap luxury-room__corner-pillar-cap--base" />
            </div>
          ))}

          <div className="luxury-room__wall-back">
            <div className="luxury-room__boutique-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SHOWROOM_BG}
                alt=""
                className="luxury-room__boutique-img"
                draggable={false}
                decoding="async"
              />
              <span className="luxury-room__boutique-rim" aria-hidden />
            </div>
            <span className="luxury-room__boutique-glow" aria-hidden />
          </div>

          <span className="luxury-room__frame-front" aria-hidden />
        </div>

        <div className="luxury-room__fog" aria-hidden />
        <div className="luxury-room__floor-shine" aria-hidden />
      </div>
    </div>
  );
}
