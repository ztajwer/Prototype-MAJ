import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
