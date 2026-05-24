"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PITCH_MIN = 4;
const PITCH_MAX = 22;
const YAW_MIN = -28;
const YAW_MAX = 28;
const SMOOTH = 0.11;

function blocksOrbit(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      ".showroom-piece, .showroom-cta-panel, .showroom-controls, button, a, input"
    )
  );
}

export function useShowroomRoomOrbit(zone: HTMLElement | null) {
  const target = useRef({ yaw: 0, pitch: 16 });
  const display = useRef({ yaw: 0, pitch: 16 });
  const [view, setView] = useState({ yaw: 0, pitch: 16, orbiting: false });

  const drag = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    pointerId: -1,
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const tick = () => {
      const t = target.current;
      const d = display.current;
      d.yaw += (t.yaw - d.yaw) * SMOOTH;
      d.pitch += (t.pitch - d.pitch) * SMOOTH;
      setView((v) => ({
        yaw: d.yaw,
        pitch: d.pitch,
        orbiting: v.orbiting,
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = useCallback((e: PointerEvent) => {
    if (e.button !== 0 || blocksOrbit(e.target)) return;
    drag.current = {
      active: true,
      lastX: e.clientX,
      lastY: e.clientY,
      pointerId: e.pointerId,
    };
    setView((v) => ({ ...v, orbiting: true }));
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.lastX;
    const dy = e.clientY - d.lastY;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    target.current.yaw = Math.min(
      YAW_MAX,
      Math.max(YAW_MIN, target.current.yaw + dx * 0.14)
    );
    target.current.pitch = Math.min(
      PITCH_MAX,
      Math.max(PITCH_MIN, target.current.pitch + dy * 0.1)
    );
  }, []);

  const endPointer = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    d.active = false;
    setView((v) => ({ ...v, orbiting: false }));
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* released */
    }
  }, []);

  useEffect(() => {
    if (!zone) return;
    zone.addEventListener("pointerdown", onPointerDown);
    zone.addEventListener("pointermove", onPointerMove);
    zone.addEventListener("pointerup", endPointer);
    zone.addEventListener("pointercancel", endPointer);
    return () => {
      zone.removeEventListener("pointerdown", onPointerDown);
      zone.removeEventListener("pointermove", onPointerMove);
      zone.removeEventListener("pointerup", endPointer);
      zone.removeEventListener("pointercancel", endPointer);
    };
  }, [zone, onPointerDown, onPointerMove, endPointer]);

  const worldTransform = `rotateX(${view.pitch}deg) rotateY(${view.yaw}deg)`;

  return { worldTransform, orbiting: view.orbiting };
}
