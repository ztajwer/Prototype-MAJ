import type { Metadata } from "next";
import HomeExperience from "@/components/experience/HomeExperience";
import { ItemListJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { ShowroomSeoCatalog } from "@/components/seo/ShowroomSeoCatalog";
import { BRAND } from "@/lib/data";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
    keywords: [...SITE_KEYWORDS],
  }),
  applicationName: BRAND.legalName,
  authors: [{ name: BRAND.legalName, url: BRAND.url }],
  creator: BRAND.legalName,
  publisher: BRAND.legalName,
  category: "Luxury Jewelry",
};

export default function HomePage() {
  return (
    <>
      <WebPageJsonLd />
      <ItemListJsonLd />
      <ShowroomSeoCatalog />
      <HomeExperience />
    </>
  );
}
