"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Product, ProductType } from "@/lib/data";
import { MajLogo } from "@/components/brand/MajLogo";
import { ProductJewelryImage } from "@/components/showroom/ProductJewelryImage";
import { PageBackground } from "@/components/showroom/PageBackground";
import { getProductImageSrc } from "@/lib/product-images";
import { useCallback, useEffect, useRef, useState } from "react";

type DetailRoomProps = {
  product: Product;
  onClose: () => void;
};

const TYPE_LABEL: Record<ProductType, string> = {
  ring: "Ring",
  necklace: "Necklace",
  bracelet: "Bracelet",
  watch: "Watch",
  earring: "Earring",
};

export function DetailRoom({ product, onClose }: DetailRoomProps) {
  const imageSrc = getProductImageSrc(product.id);
  const [scale, setScale] = useState(1);
  const [rotationY, setRotationY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const dragRef = useRef<{ active: boolean; lastX: number }>({
    active: false,
    lastX: 0,
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("product-page-active");
    document.body.classList.add("product-page-active");
    return () => {
      root.classList.remove("product-page-active");
      document.body.classList.remove("product-page-active");
    };
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      setRotationY((r) => r + dt * 0.035);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate]);

  const onPointerDown = useCallback((clientX: number) => {
    setAutoRotate(false);
    dragRef.current = { active: true, lastX: clientX };
  }, []);

  const onPointerMove = useCallback((clientX: number) => {
    if (!dragRef.current.active) return;
    const delta = clientX - dragRef.current.lastX;
    dragRef.current.lastX = clientX;
    setRotationY((r) => r + delta * 0.48);
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={product.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="customize-page fixed inset-0 z-[80] flex flex-col overflow-y-auto overflow-x-hidden"
        role="dialog"
        aria-modal
        aria-label={`${product.name} — customize`}
      >
        <PageBackground variant="atelier" />
        <header className="customize-page__header relative z-10 flex items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4 md:px-10 md:py-5">
          <button
            type="button"
            onClick={onClose}
            className="customize-chip customize-chip--back flex min-h-[44px] shrink-0 items-center gap-2 px-3 py-2.5 sm:px-4"
          >
            <span className="text-base leading-none text-maj-vault" aria-hidden>
              ←
            </span>
            <span className="customize-chip__label">Showroom</span>
          </button>
          <MajLogo
            background="light"
            height={64}
            priority
            imageClassName="customize-page__logo"
          />
        </header>

        <div className="customize-page__body relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-3 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-5 sm:px-4 sm:pb-8 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="customize-page__intro text-center px-1"
          >
            <span className="label-maj tracking-[0.32em] sm:tracking-[0.4em]">
              Atelier · Customize
            </span>
            <p className="customize-page__type mt-2">
              {TYPE_LABEL[product.type]}
            </p>
            <h2 className="customize-page__title mt-1 font-display">
              {product.name}
            </h2>
            <p className="customize-page__collection mt-1.5 font-body italic">
              {product.collection}
            </p>
            <div className="customize-divider mx-auto mt-3 w-20 sm:mt-4 sm:w-32" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="customize-panel customize-panel--viewer relative w-full max-w-xl overflow-visible p-3 sm:p-6 md:p-8"
          >
            <div className="customize-viewer-stage relative mx-auto flex w-full items-center justify-center">
              {imageSrc ? (
                <div className="customize-viewer-piece">
                  <div
                    className="customize-viewer-spin"
                    style={{
                      transform: `translate(-50%, -50%) rotateY(${rotationY}deg) scale(${scale})`,
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      onPointerDown(e.clientX);
                    }}
                    onPointerMove={(e) => onPointerMove(e.clientX)}
                    onPointerUp={endDrag}
                    onPointerLeave={endDrag}
                    onPointerCancel={endDrag}
                  >
                    <ProductJewelryImage
                      productId={product.id}
                      src={imageSrc}
                      alt={product.name}
                      priority
                      variant="customize"
                      className="h-full w-full select-none"
                    />
                  </div>
                </div>
              ) : (
                <p className="py-16 text-center font-body text-sm italic text-maj-vault/70">
                  Photography preview coming soon for this piece.
                </p>
              )}
            </div>

            <p className="customize-viewer-hint label-maj pointer-events-none mt-4 text-center sm:mt-5">
              <span className="customize-viewer-hint__mobile">
                Swipe left · right to turn
              </span>
              <span className="customize-viewer-hint__desktop">
                Drag left · right to view every side
              </span>
              <span className="customize-viewer-hint__sep"> · </span>
              <span className="customize-viewer-hint__sub">size below</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.75 }}
            className="customize-panel customize-panel--controls w-full max-w-xl p-4 sm:p-6 md:p-7"
          >
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="label-maj tracking-[0.32em] sm:tracking-[0.36em]">
                Your configuration
              </span>
              <p className="customize-page__tagline font-body italic leading-relaxed">
                {product.tagline}
              </p>
              <p className="customize-page__price mt-2 font-display">
                {product.price}
              </p>
            </div>

            <div className="customize-divider my-4 sm:my-6" />

            <div className="flex flex-col gap-4 sm:gap-6">
              <div>
                <div className="label-maj mb-2 flex items-center justify-between tracking-[0.28em] sm:mb-3 sm:tracking-[0.32em]">
                  <span>Display size</span>
                  <span className="customize-page__scale-badge rounded-full px-2.5 py-0.5">
                    {Math.round(scale * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.75}
                  max={1.35}
                  step={0.01}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="customize-range w-full cursor-pointer"
                  aria-label="Adjust display size"
                />
              </div>

              <div className="customize-controls-actions">
                <button
                  type="button"
                  onClick={() => setAutoRotate((v) => !v)}
                  data-cursor-hover
                  className={`customize-chip customize-chip--wide px-3 py-2.5 sm:px-4 ${
                    autoRotate ? "customize-chip--active" : ""
                  }`}
                >
                  {autoRotate ? "Pause turn" : "Auto turn"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRotationY(0);
                    setAutoRotate(false);
                  }}
                  data-cursor-hover
                  className="customize-chip customize-chip--wide px-3 py-2.5 sm:px-4"
                >
                  Reset view
                </button>
                <button
                  type="button"
                  onClick={() => setRotationY((r) => r - 45)}
                  data-cursor-hover
                  className="customize-chip px-3 py-2.5"
                  aria-label="Turn left"
                >
                  ← Turn
                </button>
                <button
                  type="button"
                  onClick={() => setRotationY((r) => r + 45)}
                  data-cursor-hover
                  className="customize-chip px-3 py-2.5"
                  aria-label="Turn right"
                >
                  Turn →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
