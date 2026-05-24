"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export type RoomDepthState = {
  /** 0 = default view, 1 = max push-in */
  progress: number;
  /** GPU scale for the room stage */
  zoom: number;
  /** Subtle pitch for 3D feel */
  tilt: number;
};

export const ROOM_VANISH_X = 50;
export const ROOM_VANISH_Y = 42;

export function getRoomDepthState(progress: number): RoomDepthState {
  const p = clamp(progress, 0, 1);
  const eased = p * p * (3 - 2 * p);
  return {
    progress: p,
    zoom: 1 + eased * 0.32,
    tilt: 10 - eased * 4,
  };
}

function blocksZoom(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      ".showroom-piece, .showroom-cta-panel, .showroom-controls, button, a, input"
    )
  );
}

/** Wheel / swipe → subtle cinematic push-in (room always visible from frame 1). */
export function useShowroomDepthZoom(zone: HTMLElement | null) {
  const target = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setProgress((current) => {
        const next = current + (target.current - current) * 0.12;
        return Math.abs(next - target.current) < 0.0003 ? target.current : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onWheel = useCallback((e: WheelEvent) => {
    if (blocksZoom(e.target)) return;
    e.preventDefault();
    target.current = clamp(target.current + e.deltaY * 0.00055, 0, 1);
  }, []);

  const touch = useRef<{ y: number; p: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1 || blocksZoom(e.target)) return;
    touch.current = { y: e.touches[0].clientY, p: target.current };
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!touch.current || e.touches.length !== 1) return;
    if (blocksZoom(e.target)) return;
    e.preventDefault();
    const dy = touch.current.y - e.touches[0].clientY;
    touch.current.y = e.touches[0].clientY;
    target.current = clamp(touch.current.p + dy * 0.0018, 0, 1);
    touch.current.p = target.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    touch.current = null;
  }, []);

  useEffect(() => {
    if (!zone) return;
    zone.addEventListener("wheel", onWheel, { passive: false });
    zone.addEventListener("touchstart", onTouchStart, { passive: true });
    zone.addEventListener("touchmove", onTouchMove, { passive: false });
    zone.addEventListener("touchend", onTouchEnd);
    zone.addEventListener("touchcancel", onTouchEnd);
    return () => {
      zone.removeEventListener("wheel", onWheel);
      zone.removeEventListener("touchstart", onTouchStart);
      zone.removeEventListener("touchmove", onTouchMove);
      zone.removeEventListener("touchend", onTouchEnd);
      zone.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [zone, onWheel, onTouchStart, onTouchMove, onTouchEnd]);

  return getRoomDepthState(progress);
}
