"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 0.97;
const MAX_SCALE = 1.08;
const WHEEL_SENS = 0.00085;
const SMOOTH = 0.12;

function isInteractive(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      ".showroom-piece, .showroom-cta-panel, .showroom-controls, button, a, input"
    )
  );
}

export function useShowroomBgZoom(zone: HTMLElement | null) {
  const target = useRef(1);
  const [scale, setScale] = useState(1); // 1 = default framing

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const tick = () => {
      setScale((s) => {
        const next = s + (target.current - s) * SMOOTH;
        return Math.abs(next - target.current) < 0.0003 ? target.current : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onWheel = useCallback((e: WheelEvent) => {
    if (isInteractive(e.target)) return;
    e.preventDefault();
    target.current = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, target.current + e.deltaY * WHEEL_SENS)
    );
  }, []);

  const pinch = useRef<{ distance: number; scale: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 2 || isInteractive(e.target)) return;
    const [a, b] = [e.touches[0], e.touches[1]];
    pinch.current = {
      distance: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
      scale: target.current,
    };
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 2 || !pinch.current) return;
    if (isInteractive(e.target)) return;
    e.preventDefault();
    const [a, b] = [e.touches[0], e.touches[1]];
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const delta = pinch.current.distance - distance;
    target.current = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, pinch.current.scale + delta * 0.0025)
    );
  }, []);

  const onTouchEnd = useCallback(() => {
    pinch.current = null;
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

  return scale;
}
