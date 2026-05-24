"use client";

import { useCallback, useEffect, useState } from "react";
import { Preloader } from "@/components/preloader/Preloader";
import { WelcomeVideo } from "@/components/welcome/WelcomeVideo";
import {
  PAGE_BACKGROUND,
  PAGE_BACKGROUND_MOBILE,
  PRELOADER_BG,
  WELCOME_VIDEO,
  WELCOME_VIDEO_MOBILE,
} from "@/lib/media";
import { prefetchAsset } from "@/lib/prefetch";

type Phase = "preloader" | "welcome" | "showroom";

const PRELOADER_MS = 2400;
const MAX_WELCOME_MS = 12000;

export function ExperienceOrchestrator({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("preloader");

  const goWelcome = useCallback(() => setPhase("welcome"), []);
  const goShowroom = useCallback(() => setPhase("showroom"), []);

  useEffect(() => {
    const locked = phase !== "showroom";
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    prefetchAsset(PRELOADER_BG);
    prefetchAsset(WELCOME_VIDEO);
    prefetchAsset(WELCOME_VIDEO_MOBILE);
    prefetchAsset(PAGE_BACKGROUND);
    prefetchAsset(PAGE_BACKGROUND_MOBILE);
  }, []);

  useEffect(() => {
    if (phase !== "preloader") return;
    const t = window.setTimeout(goWelcome, PRELOADER_MS + 400);
    return () => window.clearTimeout(t);
  }, [phase, goWelcome]);

  useEffect(() => {
    if (phase !== "welcome") return;
    const t = window.setTimeout(goShowroom, MAX_WELCOME_MS);
    return () => window.clearTimeout(t);
  }, [phase, goShowroom]);

  return (
    <>
      {phase === "preloader" && (
        <Preloader duration={PRELOADER_MS} onComplete={goWelcome} />
      )}

      {phase === "welcome" && <WelcomeVideo onComplete={goShowroom} />}

      {phase === "showroom" && (
        <div className="fixed inset-0 z-0">{children}</div>
      )}
    </>
  );
}
