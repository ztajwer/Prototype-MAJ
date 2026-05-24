"use client";

import { useEffect, useRef, useState } from "react";

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  variant: "dot" | "star" | "glint";
  driftX: number;
  driftY: number;
};

const MAX_SPARKS = 64;
const SPAWN_MS = 10;
const SPARK_LIFE_MS = 1100;

function pickVariant(): Spark["variant"] {
  const r = Math.random();
  if (r < 0.55) return "dot";
  if (r < 0.82) return "glint";
  return "star";
}

/** Normal system cursor with a soft white glitter trail (no custom ring/dot). */
export function LuxuryCursor() {
  const [finePointer, setFinePointer] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const lastSpawn = useRef(0);
  const sparkId = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFinePointer(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_MS) return;
      lastSpawn.current = now;

      const count = Math.random() < 0.5 ? 3 : 2;
      const batch: Spark[] = [];

      for (let i = 0; i < count; i += 1) {
        const id = ++sparkId.current;
        const spread = 10 + Math.random() * 14;
        const angle = Math.random() * Math.PI * 2;
        batch.push({
          id,
          x: e.clientX + Math.cos(angle) * spread * 0.35,
          y: e.clientY + Math.sin(angle) * spread * 0.35,
          size: 3 + Math.random() * 7,
          variant: pickVariant(),
          driftX: (Math.random() - 0.5) * 18,
          driftY: 6 + Math.random() * 16,
        });
      }

      setSparks((prev) => {
        const next = [...prev, ...batch];
        return next.length > MAX_SPARKS ? next.slice(-MAX_SPARKS) : next;
      });

      batch.forEach((spark) => {
        window.setTimeout(() => {
          setSparks((prev) => prev.filter((s) => s.id !== spark.id));
        }, SPARK_LIFE_MS);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <div
      aria-hidden
      className="cursor-glitter-layer pointer-events-none fixed inset-0 z-[10000]"
    >
      {sparks.map((s) => (
        <span
          key={s.id}
          className={`cursor-glitter-spark cursor-glitter-spark--${s.variant}`}
          style={
            {
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              ["--spark-drift-x" as string]: `${s.driftX}px`,
              ["--spark-drift-y" as string]: `${s.driftY}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
