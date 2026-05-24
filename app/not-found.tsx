import Link from "next/link";
import type { Metadata } from "next";
import { MajLogo } from "@/components/brand/MajLogo";
import { BRAND } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found",
  description:
    "The page you requested is not in the Jewellery archive. Return to the luxury showroom.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="not-found-page relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-white px-5 py-10 text-center">
      <div className="not-found-page__card relative z-10 flex max-w-md flex-col items-center gap-5">
        <MajLogo
          background="light"
          height={88}
          imageClassName="not-found-page__logo"
        />
        <span className="label-maj tracking-[0.36em] text-maj-logo-gold">
          404 · Archive
        </span>
        <h1 className="font-display text-3xl leading-tight text-maj-vault sm:text-4xl">
          Lost in the gallery
        </h1>
        <p className="font-body text-sm italic leading-relaxed text-maj-vault/80 sm:text-base">
          {BRAND.taglineSub}
        </p>
        <Link
          href="/"
          className="customize-chip mt-1 px-5 py-3"
          data-cursor-hover
        >
          Return to showroom
        </Link>
      </div>
    </div>
  );
}
