"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { MainShowroom } from "./MainShowroom";

export function ShowroomExperience() {
  const router = useRouter();

  const goToProduct = useCallback(
    (productId: string) => {
      router.push(`/products/${productId}`);
    },
    [router]
  );

  const prefetchProduct = useCallback(
    (productId: string) => {
      router.prefetch(`/products/${productId}`);
    },
    [router]
  );

  return (
    <MainShowroom onSelect={goToProduct} onPrefetch={prefetchProduct} />
  );
}
