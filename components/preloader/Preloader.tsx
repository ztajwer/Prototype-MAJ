"use client";

import { MajLogo } from "@/components/brand/MajLogo";
import { BRAND } from "@/lib/data";
import { LOGO_PRELOADER } from "@/lib/brand-logos";
import { PRELOADER_BG } from "@/lib/media";
import { useEffect, useRef, useState } from "react";

type PreloaderProps = {
  duration?: number;
  onComplete?: () => void;
};

export function Preloader({ duration = 2400, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onCompleteRef.current?.();
    };

    const tick = (t: number) => {
      const ratio = Math.min(1, (t - start) / duration);
      setProgress(ratio);
      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    const backup = window.setTimeout(finish, duration + 200);

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(backup);
    };
  }, [duration]);

  const skip = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCompleteRef.current?.();
  };

  return (
    <div
      className="preloader cursor-pointer"
      aria-busy="true"
      aria-label="Loading the atelier"
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") skip();
      }}
      role="button"
      tabIndex={0}
    >
      <div className="preloader__backdrop" aria-hidden>
        <img
          src={PRELOADER_BG}
          alt=""
          className="preloader__backdrop-image"
          draggable={false}
        />
      </div>
      <div className="preloader__sheen" aria-hidden />
      <div className="preloader__vignette" aria-hidden />
      <div className="preloader__content">
        <div className="preloader__card">
          <span className="preloader__eyebrow">Maison</span>
          <MajLogo
            src={LOGO_PRELOADER}
            background="light"
            height={128}
            priority
            imageClassName="preloader__logo"
          />
          <div className="preloader__divider" aria-hidden />
          <p className="preloader__tagline">{BRAND.tagline}</p>
          <div className="preloader__progress" aria-hidden>
            <div className="preloader__progress-track">
              <div
                className="preloader__progress-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="preloader__percent">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <p className="preloader__skip-hint">Tap to enter the atelier</p>
        </div>
      </div>
    </div>
  );
}
