import type { Viewport } from "next";
import {
  Playfair_Display,
  Didact_Gothic,
  EB_Garamond,
} from "next/font/google";
import "./globals.css";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "@/components/seo/JsonLd";
import { LuxuryCursor } from "@/components/effects/LuxuryCursor";
import { rootLayoutMetadata } from "@/lib/seo";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Didact_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sans",
  display: "swap",
});

const bodyFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = rootLayoutMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#FAF7F2" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body
        className="relative min-h-screen overflow-x-hidden bg-white font-sans text-maj-vault selection:bg-maj-gold/40 selection:text-maj-vault"
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-maj focus:bg-maj-gold focus:px-4 focus:py-2 focus:text-[0.65rem] focus:uppercase focus:tracking-label focus:text-maj-vault"
        >
          Skip to content
        </a>
        <main id="main" className="relative h-[100svh] min-h-[100svh] overflow-hidden">
          {children}
        </main>
        <LuxuryCursor />
      </body>
    </html>
  );
}
