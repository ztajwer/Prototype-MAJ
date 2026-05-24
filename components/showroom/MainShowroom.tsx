"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MajLogo } from "@/components/brand/MajLogo";
import { ShowroomControls } from "@/components/showroom/ShowroomControls";
import { PageBackground } from "@/components/showroom/PageBackground";
import { useShowroomScrollZoom } from "@/hooks/useShowroomScrollZoom";
import { getPieceDepthState } from "@/lib/showroom-carousel-depth";
import { useCallback, useEffect, useState } from "react";
import {
  getProductById,
  SHOWROOM_PIECES,
  type Product,
} from "@/lib/data";
import {
  getProductImageSrc,
  getProductShowroomFit,
  PRODUCT_IMAGE_BY_ID,
} from "@/lib/product-images";

type MainShowroomProps = {
  onSelect: (productId: string) => void;
  onPrefetch?: (productId: string) => void;
};

const PIECE_COUNT = SHOWROOM_PIECES.length;
const MIN_SPEED = 12;
const MAX_SPEED = 100;
const DEFAULT_SPEED = 48;

function speedPresetLabel(speed: number): "fast" | "medium" | "slow" {
  if (speed <= 30) return "fast";
  if (speed >= 62) return "slow";
  return "medium";
}

export function MainShowroom({ onSelect, onPrefetch }: MainShowroomProps) {
  const [zoneEl, setZoneEl] = useState<HTMLElement | null>(null);
  const {
    progress,
    orbitDepthDamp,
    bgScale,
    bgTranslateY,
    bgTilt,
    vanishY,
    perspectiveY,
    offsetY,
    cameraTilt,
    tableTilt,
    anchorY,
    tableLiftY,
    orbitScale,
    isWalkInActive,
  } = useShowroomScrollZoom(zoneEl);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [carouselRotation, setCarouselRotation] = useState(0);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [paused, setPaused] = useState(false);

  const hovered = hoveredId ? getProductById(hoveredId) : null;
  const period = speed;

  const pieces = SHOWROOM_PIECES.map((piece) => ({
    piece,
    product: getProductById(piece.productId),
  })).filter(
    (p): p is { piece: (typeof SHOWROOM_PIECES)[0]; product: Product } =>
      Boolean(p.product)
  );

  useEffect(() => {
    Object.values(PRODUCT_IMAGE_BY_ID).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (paused || hoveredId) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setCarouselRotation((r) => r + (360 / period) * dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, hoveredId, period]);

  const handleSelect = useCallback(
    (productId: string) => {
      setHoveredId(productId);
      onSelect(productId);
    },
    [onSelect]
  );

  const clearHover = useCallback(() => setHoveredId(null), []);

  const zoomNorm = progress;
  const zoomHint =
    isWalkInActive
      ? null
      : zoomNorm > 0.94
        ? "Swipe down to step back"
        : zoomNorm < 0.92
          ? "Swipe up to enter the room"
          : null;

  return (
    <section
      ref={setZoneEl}
      id="showroom"
      className="showroom-viewport showroom-viewport--zoom fixed inset-0 z-10 h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#faf7f2]"
      aria-label="Jewelry collection"
    >
      <PageBackground
        scale={bgScale}
        originY={vanishY}
        translateY={-bgTranslateY}
        tilt={bgTilt}
      />

      {isWalkInActive ? (
        <div
          className="showroom-walkin-vignette pointer-events-none absolute inset-0 z-[15]"
          style={{ opacity: Math.max(0, 1 - progress * 1.15) }}
          aria-hidden
        />
      ) : null}

      <div className="pointer-events-none absolute left-2 top-[max(0.5rem,env(safe-area-inset-top))] z-40 sm:left-6 md:left-10 md:top-8">
        <MajLogo
          background="light"
          height={72}
          priority
          imageClassName="showroom-logo h-12 w-auto max-w-[min(42vw,168px)] sm:h-14 sm:max-w-[220px] md:h-[5.25rem] md:max-w-[280px]"
        />
      </div>

      {zoomHint ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.75 }}
          className="showroom-zoom-hint pointer-events-none absolute right-2 top-[max(0.5rem,env(safe-area-inset-top))] z-30 sm:right-6 md:top-8"
        >
          {zoomHint}
        </motion.div>
      ) : null}

      <motion.div
        className="showroom-stage showroom-stage--interactive showroom-stage--table showroom-stage--on-table absolute inset-x-0 z-20 flex items-center justify-center px-1 sm:px-2"
        style={{
          top: "var(--showroom-inset-top)",
          bottom: "var(--showroom-inset-bottom)",
          perspective: "3200px",
          perspectiveOrigin: `50% ${perspectiveY}%`,
          ["--showroom-land" as string]: 1,
        }}
      >
        <motion.div
          className="showroom-carousel-stage showroom-carousel-stage--table relative flex h-full w-full max-w-[min(100%,52rem)] items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateY(${tableLiftY + offsetY}px) rotateX(${cameraTilt + tableTilt}deg)`,
          }}
        >
          <div
            className="showroom-carousel showroom-carousel--table absolute left-1/2"
            style={{
              top: `${anchorY}%`,
              width: 0,
              height: 0,
              transformStyle: "preserve-3d",
              transform: `translate(-50%, -50%) rotateY(${carouselRotation}deg)`,
            }}
          >
            {pieces.map(({ piece, product }, index) => {
              const angle = (360 / PIECE_COUNT) * index;
              const depth = getPieceDepthState(angle, carouselRotation);
              const active = hoveredId === product.id;
              const faceRotation = -angle - carouselRotation;
              const orbitZ = `calc(var(--showroom-orbit) * ${orbitScale})`;

              return (
                <div
                  key={product.id}
                  className="showroom-orbit-slot absolute"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${orbitZ})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="showroom-orbit-face"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${faceRotation}deg) translateZ(${depth.translateZ * orbitDepthDamp}px)`,
                    }}
                  >
                    <ProductPiece
                      product={product}
                      label={product.name}
                      active={active}
                      depth={depth}
                      onActivate={() => setHoveredId(product.id)}
                      onClearHover={clearHover}
                      onPrefetch={() => onPrefetch?.(product.id)}
                      onSelect={() => handleSelect(product.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-center gap-2 px-3 pb-1">
        <AnimatePresence initial={false}>
          {!hoveredId && (
            <motion.div
              key="showroom-controls-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              <ShowroomControls
                speed={speed}
                paused={paused}
                minSpeed={MIN_SPEED}
                maxSpeed={MAX_SPEED}
                speedLabel={speedPresetLabel(speed)}
                onSpeedChange={setSpeed}
                onTogglePause={() => setPaused((p) => !p)}
                onPreset={setSpeed}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {hovered ? (
            <motion.div
              key="showroom-cta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3 }}
              className="showroom-cta-panel pointer-events-auto max-w-md rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3"
            >
              <motion.div className="flex flex-col items-center gap-2">
                <span className="font-display text-lg leading-snug text-maj-vault sm:text-xl">
                  {hovered.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleSelect(hovered.id)}
                  className="btn-maj-gold min-h-[44px] min-w-[140px] !rounded-maj px-8 py-3 !text-[0.58rem] !tracking-[0.26em]"
                >
                  Customize
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

type ProductPieceProps = {
  product: Product;
  label: string;
  active: boolean;
  depth: ReturnType<typeof getPieceDepthState>;
  onActivate: () => void;
  onClearHover: () => void;
  onPrefetch?: () => void;
  onSelect: () => void;
};

function ProductPiece({
  product,
  label,
  active,
  depth,
  onActivate,
  onClearHover,
  onPrefetch,
  onSelect,
}: ProductPieceProps) {
  const imageSrc = getProductImageSrc(product.id);
  const fit = getProductShowroomFit(product.id);
  const scale = depth.scale * (active ? 1.04 : 1);

  return (
    <a
      href={`/products/${product.id}`}
      className={`showroom-piece group relative flex flex-col items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-maj-gold/80 ${
        depth.isHero ? "showroom-piece--hero" : ""
      } ${active ? "showroom-piece--active" : ""}`}
      style={{
        touchAction: "manipulation",
        zIndex: depth.zIndex,
        opacity: active ? 1 : depth.opacity,
        transform: `scale(${scale})`,
        transition:
          "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      aria-label={`View ${product.name}`}
      onMouseEnter={() => {
        onActivate();
        onPrefetch?.();
      }}
      onMouseLeave={onClearHover}
      onFocus={() => {
        onActivate();
        onPrefetch?.();
      }}
      onBlur={onClearHover}
      onClick={(e) => {
        e.preventDefault();
        onActivate();
        onSelect();
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <span
        className={`showroom-piece__photo-wrap relative flex items-center justify-center ${
          active ? "showroom-piece__photo-wrap--active" : ""
        }`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="showroom-product-img"
            style={{
              transform: `scale(${fit.imageScale})`,
              padding: fit.padding,
            }}
            draggable={false}
            loading="eager"
            decoding="async"
          />
        ) : null}
      </span>
      <span
        className={`showroom-piece__label showroom-piece-label${
          depth.isHero ? " showroom-piece__label--hero" : ""
        }${active ? " showroom-piece__label--active showroom-piece-label--active" : ""}`}
      >
        {label}
      </span>
    </a>
  );
}
