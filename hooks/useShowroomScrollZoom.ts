"use client";

import {
  cinematicWalkEase,
  SHOWROOM_WALK_IN_MS,
} from "@/lib/showroom-walk-in";
import {
  getShowroomZoomState,
  SHOWROOM_MAX_ZOOM,
} from "@/lib/showroom-zoom";
import { useCallback, useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function blocksZoom(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      ".showroom-piece, .showroom-cta-panel, .showroom-controls, button, a, input"
    )
  );
}

export type ShowroomScrollZoom = ReturnType<typeof getShowroomZoomState> & {
  resetZoom: () => void;
  walkIn: () => void;
  isWalkInActive: boolean;
};

/** Wheel / swipe → 0–1 environment dolly. Scroll down = walk into the room. */
const MOBILE_MQ = "(max-width: 767px)";

export function useShowroomScrollZoom(
  zone: HTMLElement | null
): ShowroomScrollZoom {
  const target = useRef(0);
  const walkingIn = useRef(true);
  const userTookControl = useRef(false);
  const walkInStart = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isWalkInActive, setIsWalkInActive] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      target.current = SHOWROOM_MAX_ZOOM;
      setProgress(SHOWROOM_MAX_ZOOM);
      walkingIn.current = false;
      setIsWalkInActive(false);
      return;
    }

    target.current = 0;
    setProgress(0);
    walkingIn.current = true;
    userTookControl.current = false;
    walkInStart.current = performance.now();
    setIsWalkInActive(true);

    let walkRaf = 0;
    const walkTick = (now: number) => {
      if (userTookControl.current) {
        walkingIn.current = false;
        setIsWalkInActive(false);
        return;
      }

      const t = clamp((now - walkInStart.current) / SHOWROOM_WALK_IN_MS, 0, 1);
      const eased = cinematicWalkEase(t) * SHOWROOM_MAX_ZOOM;
      target.current = eased;
      setProgress(eased);

      if (t < 1) {
        walkRaf = requestAnimationFrame(walkTick);
      } else {
        walkingIn.current = false;
        setIsWalkInActive(false);
        target.current = SHOWROOM_MAX_ZOOM;
        setProgress(SHOWROOM_MAX_ZOOM);
      }
    };

    walkRaf = requestAnimationFrame(walkTick);
    return () => cancelAnimationFrame(walkRaf);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const tick = () => {
      if (!walkingIn.current) {
        setProgress((current) => {
          const next = current + (target.current - current) * 0.12;
          return Math.abs(next - target.current) < 0.00025
            ? target.current
            : next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const interruptWalkIn = useCallback(() => {
    if (!walkingIn.current) return;
    userTookControl.current = true;
    walkingIn.current = false;
    setIsWalkInActive(false);
  }, []);

  const resetZoom = useCallback(() => {
    interruptWalkIn();
    target.current = 0;
    setProgress(0);
  }, [interruptWalkIn]);

  const walkIn = useCallback(() => {
    userTookControl.current = false;
    walkingIn.current = true;
    walkInStart.current = performance.now();
    setIsWalkInActive(true);
    target.current = 0;
    setProgress(0);

    let walkRaf = 0;
    const walkTick = (now: number) => {
      if (userTookControl.current) {
        walkingIn.current = false;
        setIsWalkInActive(false);
        return;
      }

      const t = clamp((now - walkInStart.current) / SHOWROOM_WALK_IN_MS, 0, 1);
      const eased = cinematicWalkEase(t) * SHOWROOM_MAX_ZOOM;
      target.current = eased;
      setProgress(eased);

      if (t < 1) {
        walkRaf = requestAnimationFrame(walkTick);
      } else {
        walkingIn.current = false;
        setIsWalkInActive(false);
        target.current = SHOWROOM_MAX_ZOOM;
        setProgress(SHOWROOM_MAX_ZOOM);
      }
    };

    walkRaf = requestAnimationFrame(walkTick);
  }, []);

  const applyScrollDelta = useCallback((delta: number) => {
    interruptWalkIn();
    target.current = clamp(
      target.current + delta,
      0,
      SHOWROOM_MAX_ZOOM
    );
  }, [interruptWalkIn]);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (blocksZoom(e.target)) return;
      e.preventDefault();
      applyScrollDelta(e.deltaY * 0.00075);
    },
    [applyScrollDelta]
  );

  const touch = useRef<{ y: number; p: number } | null>(null);
  const pinch = useRef<{ dist: number; p: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (blocksZoom(e.target)) return;
    if (e.touches.length === 1) {
      touch.current = { y: e.touches[0].clientY, p: target.current };
      pinch.current = null;
      return;
    }
    if (e.touches.length === 2) {
      touch.current = null;
      pinch.current = {
        dist: Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        ),
        p: target.current,
      };
    }
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (blocksZoom(e.target)) return;

      if (e.touches.length === 1 && touch.current) {
        e.preventDefault();
        interruptWalkIn();
        const dy = touch.current.y - e.touches[0].clientY;
        touch.current.y = e.touches[0].clientY;
        target.current = clamp(
          touch.current.p + dy * 0.0032,
          0,
          SHOWROOM_MAX_ZOOM
        );
        touch.current.p = target.current;
        return;
      }

      if (e.touches.length === 2 && pinch.current) {
        e.preventDefault();
        interruptWalkIn();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (dist - pinch.current.dist) * 0.004;
        pinch.current.dist = dist;
        target.current = clamp(
          pinch.current.p + delta,
          0,
          SHOWROOM_MAX_ZOOM
        );
        pinch.current.p = target.current;
      }
    },
    [interruptWalkIn]
  );

  const onTouchEnd = useCallback(() => {
    touch.current = null;
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

  return {
    ...getShowroomZoomState(progress, mobile),
    resetZoom,
    walkIn,
    isWalkInActive,
  };
}
