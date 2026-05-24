"use client";

import Image from "next/image";
import {
  getProductShowroomFit,
  productImageRenderMode,
  productUsesKnockoutBg,
  productUsesUnoptimizedImage,
  productUsesWhiteDiscBlend,
} from "@/lib/product-images";
import { cn } from "@/lib/utils";

export type ProductImageVariant = "showroom" | "customize";

type ProductJewelryImageProps = {
  productId: string;
  src: string;
  alt: string;
  priority?: boolean;
  variant?: ProductImageVariant;
  className?: string;
  sizes?: string;
};

const VARIANT_CONFIG: Record<
  ProductImageVariant,
  { dimension: number; sizes: string; padding: string }
> = {
  showroom: {
    dimension: 720,
    sizes: "(max-width: 480px) 28vw, (max-width: 768px) 24vw, 240px",
    padding: "5%",
  },
  customize: {
    dimension: 960,
    sizes: "(max-width: 768px) 90vw, 480px",
    padding: "5%",
  },
};

export function ProductJewelryImage({
  productId,
  src,
  alt,
  priority = false,
  variant = "showroom",
  className,
  sizes,
}: ProductJewelryImageProps) {
  const renderMode = productImageRenderMode(productId);
  const knockout = productUsesKnockoutBg(productId);
  const lightBg = productUsesWhiteDiscBlend(productId);
  const unoptimized = productUsesUnoptimizedImage(productId);
  const config = VARIANT_CONFIG[variant];
  const isShowroom = variant === "showroom";
  const showroomFit = getProductShowroomFit(productId);
  const padding = isShowroom ? showroomFit.padding : config.padding;

  return (
    <span
      className={cn(
        "product-jewelry-frame relative flex h-full w-full items-center justify-center",
        knockout && "product-jewelry-frame--knockout",
        lightBg && "product-jewelry-frame--light",
        isShowroom && "product-jewelry-frame--showroom",
        variant === "customize" && "product-jewelry-frame--customize",
        className
      )}
      style={{ padding }}
      data-render={renderMode}
    >
      <Image
        src={src}
        alt={alt}
        width={config.dimension}
        height={config.dimension}
        priority={priority}
        unoptimized={unoptimized}
        sizes={sizes ?? config.sizes}
        draggable={false}
        className={cn(
          "product-jewelry-photo relative z-[1] h-full w-full max-h-full max-w-full object-contain object-center",
          knockout && "product-jewelry-photo--knockout",
          lightBg && "product-jewelry-photo--light",
          isShowroom && "product-jewelry-photo--showroom",
          variant === "customize" && "product-jewelry-photo--customize"
        )}
        style={
          isShowroom
            ? { transform: `scale(${showroomFit.imageScale})` }
            : undefined
        }
      />
    </span>
  );
}
