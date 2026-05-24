"use client";

import { useEffect, useState } from "react";

export type MouseParallaxState = {
  nx: number;
  ny: number;
};

export function useShowroomMouseParallax(_zone: HTMLElement | null): MouseParallaxState {
  const [state] = useState<MouseParallaxState>({ nx: 0, ny: 0 });
  useEffect(() => {}, []);
  return state;
}
