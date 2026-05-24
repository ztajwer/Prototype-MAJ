"use client";

import { CinematicVideo } from "@/components/media/CinematicVideo";
import { WELCOME_VIDEO, WELCOME_VIDEO_MOBILE } from "@/lib/media";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const REVEAL_BEFORE_END_S = 0.35;
const EXIT_FADE_MS = 800;
const MIN_PLAY_S = 1.2;
const LUXE_EASE = [0.76, 0, 0.24, 1] as const;
const MOBILE_MQ = "(max-width: 767px)";

type WelcomeVideoProps = {
  onComplete?: () => void;
};

export function WelcomeVideo({ onComplete }: WelcomeVideoProps) {
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  /** Avoid reading `window` during first render — prevents hydration crash on mobile */
  const [layout, setLayout] = useState<"pending" | "desktop" | "mobile">(
    "pending"
  );
  const startedAtRef = useRef(0);

  const welcomeSrc =
    layout === "mobile" ? WELCOME_VIDEO_MOBILE : WELCOME_VIDEO;
  const videoFit = layout === "mobile" ? "cover" : "contain";
  const videoObjectPosition =
    layout === "mobile" ? "center center" : "center center";

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setLayout(mq.matches ? "mobile" : "desktop");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setExiting(true);
    window.setTimeout(() => {
      onCompleteRef.current?.();
    }, EXIT_FADE_MS);
  }, []);

  const tryFinish = useCallback(() => {
    const elapsed =
      startedAtRef.current > 0
        ? performance.now() - startedAtRef.current
        : MIN_PLAY_S * 1000;
    if (elapsed < MIN_PLAY_S * 1000) {
      window.setTimeout(tryFinish, MIN_PLAY_S * 1000 - elapsed + 50);
      return;
    }
    finish();
  }, [finish]);

  useEffect(() => {
    if (layout === "pending" || !videoEl) return;

    finishedRef.current = false;
    setExiting(false);
    setVideoReady(false);

    const video = videoEl;
    let fallback = window.setTimeout(finish, 20000);
    let cancelled = false;

    const applyMeta = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        window.clearTimeout(fallback);
        fallback = window.setTimeout(
          finish,
          video.duration * 1000 + 1500
        );
      }
    };

    const onMeta = () => applyMeta();
    const onCanPlay = () => {
      setVideoReady(true);
      startedAtRef.current = performance.now();
    };

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("canplay", onCanPlay, { once: true });

    video.load();
    video.currentTime = 0;

    const play = async (attempt = 0) => {
      try {
        await video.play();
        if (cancelled) return;
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) applyMeta();
        if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
          setVideoReady(true);
        }
      } catch {
        if (attempt < 2 && !cancelled) {
          window.setTimeout(() => void play(attempt + 1), 400);
        } else if (!cancelled) {
          finish();
        }
      }
    };

    void play();

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("canplay", onCanPlay);
      video.pause();
    };
  }, [layout, videoEl, finish]);

  const handleTimeUpdate = () => {
    const video = videoEl;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0)
      return;
    const playedMs = performance.now() - startedAtRef.current;
    if (playedMs < MIN_PLAY_S * 1000) return;
    if (video.currentTime >= video.duration - REVEAL_BEFORE_END_S) {
      tryFinish();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="welcome-video"
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: EXIT_FADE_MS / 1000, ease: LUXE_EASE }}
        className="fixed inset-0 z-[155] h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-maj-vault"
        aria-label="Welcome"
        onClick={tryFinish}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") tryFinish();
        }}
        role="button"
        tabIndex={0}
      >
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: videoReady ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 z-[1] bg-maj-vault${
            layout === "mobile" ? " welcome-video__backdrop--mobile" : ""
          }`}
        />

        <div
          className={`cinematic-video-stage z-[2]${
            layout === "mobile" ? " cinematic-video-stage--mobile-doors" : ""
          }`}
        >
          {layout === "pending" ? null : (
            <CinematicVideo
              key={welcomeSrc}
              ref={setVideoEl}
              src={welcomeSrc}
              fit={videoFit}
              objectPosition={videoObjectPosition}
              className={
                layout === "mobile" ? "cinematic-video--mobile-doors" : undefined
              }
              playsInline
              muted
              autoPlay
              preload="auto"
              controls={false}
              onEnded={tryFinish}
              onTimeUpdate={handleTimeUpdate}
              onError={tryFinish}
            />
          )}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: videoReady ? 0.7 : 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[3] text-center font-sans text-[0.62rem] uppercase tracking-[0.5em] text-maj-gold/90"
        >
          Welcome to MAJ Boutique
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
