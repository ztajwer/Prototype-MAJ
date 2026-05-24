/** Prefetch static assets during intro phases so the showroom loads faster. */
export function prefetchAsset(href: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  link.as = href.endsWith(".mp4") ? "video" : "fetch";
  document.head.appendChild(link);
}

export function preloadShowroomBundle() {
  if (typeof window === "undefined") return;
  prefetchAsset("/background.png");
  prefetchAsset("/mob.png");
  void import("@/components/showroom/ShowroomExperience");
}
