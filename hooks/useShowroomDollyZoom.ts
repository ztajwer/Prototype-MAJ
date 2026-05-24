"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Smooth 0→1 step for cinematic fades */
export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Ease-in-out for camera push */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export type DollyZoomState = {
  progress: number;
  zoom: number;
  reveal: number;
  corridorOpacity: number;
  portalScale: number;
  entered: boolean;
};

/** Vanishing point of bbg.png — far arch center */
export const CORRIDOR_VANISH_X = 50;
export const CORRIDOR_VANISH_Y = 35.2;

export function getDollyZoomState(progress: number): DollyZoomState {
  const eased = easeInOutCubic(progress);
  const zoom = 1 + eased * 7.2;
  const reveal = smoothstep(0.5, 0.96, progress);
  const corridorOpacity = 1 - reveal;
  const portalScale = 1 + eased * 0.42;
  const entered = progress >= 0.985;

  return {
    progress,
    zoom,
    reveal,
    corridorOpacity,
    portalScale,
    entered,
  };
}

function blocksDolly(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      ".showroom-piece, .showroom-cta-panel, .showroom-controls, button, a, input"
    )
  );
}

/**
 * Scroll / wheel / swipe → 0–1 dolly progress.
 * Scroll down or wheel down = walk into the boutique.
 */
export function useShowroomDollyZoom(
  track: HTMLElement | null,
  zone: HTMLElement | null
) {
  const target = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      target.current = 1;
      setProgress(1);
      return;
    }

    let raf = 0;
    const tick = () => {
      setProgress((current) => {
        const next = current + (target.current - current) * 0.11;
        return Math.abs(next - target.current) < 0.0003
          ? target.current
          : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const measureScroll = useCallback(() => {
    if (!track) return;
    const scrollable = track.offsetHeight;
    if (scrollable <= 0) return;
    target.current = clamp(window.scrollY / scrollable, 0, 1);
  }, [track]);

  const onWheel = useCallback((e: WheelEvent) => {
    if (blocksDolly(e.target)) return;
    e.preventDefault();
    target.current = clamp(target.current + e.deltaY * 0.0012, 0, 1);
  }, []);

  const touch = useRef<{ y: number; progress: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1 || blocksDolly(e.target)) return;
    touch.current = { y: e.touches[0].clientY, progress: target.current };
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!touch.current || e.touches.length !== 1) return;
    if (blocksDolly(e.target)) return;
    e.preventDefault();
    const dy = touch.current.y - e.touches[0].clientY;
    touch.current.y = e.touches[0].clientY;
    target.current = clamp(touch.current.progress + dy * 0.0024, 0, 1);
    touch.current.progress = target.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    touch.current = null;
  }, []);

  useEffect(() => {
    measureScroll();
    window.addEventListener("scroll", measureScroll, { passive: true });
    window.addEventListener("resize", measureScroll);
    return () => {
      window.removeEventListener("scroll", measureScroll);
      window.removeEventListener("resize", measureScroll);
    };
  }, [measureScroll]);

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

  return { progress, dolly: getDollyZoomState(progress) };
};
