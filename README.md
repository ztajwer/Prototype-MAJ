# BitVista Maison — Cinematic Luxury Jewelry

A high-end cinematic prototype for a Parisian _maison de haute joaillerie_.
The site is intentionally not a conventional e-commerce experience — it is a
private, futuristic showroom that opens like a film: a preloader, a pair of
massive doors, then a 3D vault of rings, necklaces, bracelets, and watches.

## Stack

- **Next.js 14** (App Router · static generation · edge OG images)
- **React 18 / TypeScript**
- **TailwindCSS** (luxury design tokens — ink, gold, chrome)
- **Framer Motion** (cinematic UI transitions, scroll-driven motion)
- **GSAP** (available for advanced timeline orchestration)
- **Lenis** (premium smooth scrolling)
- **React Three Fiber / drei / three.js** (real-time 3D jewelry with
  `MeshTransmissionMaterial` for refraction, chromatic aberration, and
  contact shadows)

## Cinematic Sequence

1. **Preloader (~2.6s)** — animated golden monogram, ambient particles,
   progress meter, brand caption. Heavy 3D children mount in the background.
2. **Door Sequence (~3.4s)** — two metallic / glass leaves with gold trim
   and handles open in slow-motion, a volumetric beam escapes the gap.
3. **Showroom Hero** — a floating rotating diamond ring with foiled
   typography, light beams, and ambient particles.
4. **Featured Collections** — `Celestial Atelier`, `Maison Noir`,
   `Constellation`, `Méridien` — each previews a signature silhouette in
   3D when hovered.
5. **The Vault (Interactive Showcase)** — filterable by Rings / Necklaces /
   Bracelets / Watches; each click swaps the 3D scene with crossfade.
6. **Heritage & Craftsmanship** — vertical timeline from 1924 to today
   with a gold progress line driven by scroll.
7. **Premium Gallery** — editorial grid of jewelry tiles with bespoke SVG
   glyphs per product type.
8. **Press & Accolades** — auto-scrolling marquee of awards.
9. **Collector Testimonials** — cinematic auto-rotating quotes.
10. **Booking Section** — multi-step booking with interests, appointment
    type, and concierge contact.
11. **Final Cinematic CTA** — closing reveal with global atelier list.
12. **Minimal Luxury Footer** — newsletter, columns, brand watermark.

## Product Detail (`/products/[id]`)

- Fully interactive 3D viewer (drag, pinch, zoom via `OrbitControls`)
- Live metal switcher — Yellow Gold / Rose / Platinum / Black Rhodium
- Live stone tone switcher — Diamond / Sapphire / Emerald / Ruby
- Auto-rotate toggle, specs grid, breadcrumb, related pieces
- Geometry per silhouette: halo · solitaire · eternity · trinity ·
  pendant · choker · bangle · watch

## SEO

Built mobile-first, semantic, fast, and discoverable:

- **`<head>` metadata** — title template, description, keywords,
  canonical, theme color, viewport
- **Open Graph + Twitter Card** with edge-generated **PNG OG images** at
  `/opengraph-image` and `/products/[id]/opengraph-image`
- **JSON-LD structured data**:
  - `Organization` + `JewelryStore` (home, with address, contact, social,
    price range)
  - `WebSite`
  - `ItemList` of products on the homepage
  - `Product` + `Offer` (price, currency, availability) on detail pages
  - `BreadcrumbList` on detail pages
- **Sitemap** at `/sitemap.xml` (auto-built from `lib/data.ts`)
- **Robots** at `/robots.txt` (allow everything, sitemap reference)
- **Edge-generated icons** at `/icon` and `/apple-icon`
- **Semantic landmarks** — `<header>`, `<main>`, `<nav>`, `<article>`,
  `<aside>`, `<footer>`, `aria-labelledby`, breadcrumbs
- **Skip-to-content** link for keyboard users
- **`prefers-reduced-motion`** honored globally

Keyword footprint targets:

> luxury jewelry · premium rings · futuristic jewelry · luxury
> accessories · designer jewelry · high-end jewelry showroom · haute
> joaillerie · diamond ring · luxury necklace · luxury bracelet ·
> luxury watch

## Performance

- Production homepage: **154 kB First Load JS**
- Production product page: **95.7 kB First Load JS** (heavy 3D viewer
  lazy-loaded after first paint)
- All 8 product pages statically generated at build time
- OG images and icons rendered on the edge runtime, cached at the CDN
- 3D scenes use a single torus / cylinder backbone with cinematic
  lighting and `MeshTransmissionMaterial` — small geometry, big drama
- DPR capped at 1.7×, contact shadows, and `Float` are tuned for
  smooth 60fps on mid-tier laptops

## Project Layout

```
app/
  layout.tsx                  fonts · metadata · JSON-LD · nav · cursor
  page.tsx                    home: orchestrated sequence
  not-found.tsx
  opengraph-image.tsx         edge-rendered PNG (home)
  icon.tsx · apple-icon.tsx   edge-rendered favicons
  robots.ts · sitemap.ts
  products/[id]/page.tsx
  products/[id]/opengraph-image.tsx
components/
  experience/                 orchestrator state machine
  preloader/                  Preloader · LogoMark · AmbientParticles
  door/                       DoorSequence (CSS-3D leaves + lighting)
  three/                      JewelryModel (8 silhouettes) · RingScene
  product/                    ProductViewer · ProductViewerLazy
  providers/                  SmoothScrollProvider (Lenis)
  sections/                   Hero · Collections · ProductShowcase ·
                              Heritage · Gallery · Accolades ·
                              Testimonials · Booking · FinalCTA ·
                              Footer · SectionHeader
  seo/                        JsonLd (Organization, WebSite, ItemList,
                              Product, Breadcrumb)
  ui/                         LuxeCursor · Navigation · NoiseLayer
lib/
  data.ts                     BRAND · PRODUCTS · COLLECTIONS · HERITAGE
                              ACCOLADES · TESTIMONIALS · NAV_ITEMS ·
                              GALLERY_TILES
  utils.ts                    cn() · lerp · clamp · mapRange
```

## Scripts

```bash
npm run dev          # start the cinematic experience (default :3000)
npm run build        # production build (static + edge)
npm run start        # serve the production build
npm run lint         # ESLint
npm run type-check   # strict tsc
```

## Future Extensions

- Drop real GLB / GLTF jewelry models into `public/models` and swap the
  geometry inside `components/three/JewelryModel.tsx`.
- Wire the booking form to an edge route + transactional email
  (Resend / Postmark).
- Add CMS-backed editorial stories (Sanity, MDX) for the gallery.
- Add ambient cinematic audio (architecture already supports it via
  `ExperienceOrchestrator` phase events).
- Localize for `en-FR / ja / ar` to extend the SEO footprint.

---

Composed with discipline. Engineered with light.
