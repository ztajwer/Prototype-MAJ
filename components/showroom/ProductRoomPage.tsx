"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/lib/data";
import { DetailRoom } from "./DetailRoom";

export function ProductRoomPage({ product }: { product: Product }) {
  const router = useRouter();

  return <DetailRoom product={product} onClose={() => router.push("/")} />;
}
