import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/data";
import { SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.legalName,
    short_name: BRAND.shortName,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#FAF7F2",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["shopping", "lifestyle"],
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
