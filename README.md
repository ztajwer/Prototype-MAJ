# MAJ Boutique — Luxury Jewelry Showroom

A cinematic luxury jewelry prototype for **MAJ Boutique**. The experience opens like a short film: preloader → welcome video → interactive 3D showroom → product customize room.

**Repository:** [github.com/ztajwer/Prototype-MAJ](https://github.com/ztajwer/Prototype-MAJ)

---

## User flow

1. **Preloader** — Silk backdrop (`pla.avif`), logo, progress bar. Tap to skip.
2. **Welcome video** — Intro clip (`vid.mp4`). Tap or wait to continue.
3. **Showroom** — Boutique interior with 6 products on a rotating carousel.
   - Automatic slow zoom-in on entry (first-person walk-in effect)
   - Scroll / swipe to zoom in and out
   - Carousel speed controls (pause, fast, medium, slow)
   - Click a product → customize panel
4. **Customize room** — View, rotate, and resize the selected piece. Back to showroom anytime.

Product detail pages also exist at `/products/[id]`.

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js 14 (App Router) |
| UI | React 18, TypeScript |
| Styling | Tailwind CSS, global CSS |
| Motion | Framer Motion |
| 3D (optional paths) | Three.js |

---

## Getting started

### Requirements

- Node.js 18+
- npm 9+

### Install & run

```bash
git clone https://github.com/ztajwer/Prototype-MAJ.git
cd Prototype-MAJ
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build       # production build
npm run start       # serve production build
npm run lint        # ESLint
npm run type-check  # TypeScript check
```

---

## Environment variables

Copy `.env.example` to `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production (Vercel), set:

```env
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

Used for SEO: canonical URLs, Open Graph, sitemap, robots.txt, JSON-LD.

---

## Project structure

```
app/                    Next.js routes, layout, global CSS
  page.tsx              Home page (showroom experience)
  products/[id]/        Product detail / SEO pages
  sitemap.ts            Auto-generated sitemap
  robots.ts             Crawler rules

components/
  experience/           Preloader → video → showroom flow
  preloader/            Loading screen
  welcome/              Welcome video
  showroom/             Main showroom, customize room, backgrounds
  effects/              Luxury cursor (white sparkle trail)
  brand/                MAJ logo
  seo/                  JSON-LD, SEO catalog

hooks/
  useShowroomScrollZoom.ts   Scroll / touch zoom + walk-in animation

lib/
  data.ts               Brand info, products, showroom pieces
  media.ts              Public asset paths
  showroom-zoom.ts      Zoom & table placement math
  product-images.ts     Product image mapping

public/
  background.png        Desktop showroom backdrop
  mob.png               Mobile showroom backdrop
  pla.avif              Loader & customize page backdrop
  vid.mp4               Welcome video
  products/             Jewelry product images
  logos/                Brand logos
```

---

## Key features

- **Cinematic walk-in** — Slow auto zoom when the showroom opens
- **Scroll zoom** — Mouse wheel / touch to move closer or further
- **3D carousel** — Six products orbit with depth and hover states
- **White product discs** — Name tags under each piece
- **Customize room** — Drag to rotate, slider for size, auto-turn
- **Sparkle cursor** — White glitter trail on desktop
- **SEO ready** — Metadata, OG images, sitemap, structured data
- **Responsive** — Separate mobile background and tuned layout

---

## Assets

All media lives in `public/`. Do **not** commit duplicate files from the project root — use `public/` only.

| File | Purpose |
|------|---------|
| `pla.avif` | Preloader & customize background |
| `background.png` | Desktop showroom |
| `mob.png` | Mobile showroom |
| `vid.mp4` | Welcome video |
| `products/*` | Product photography |

---

## Deployment

See **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** for step-by-step Vercel hosting (free).

Quick summary:

1. Push code to GitHub (no `node_modules`, no `.next`)
2. Import repo on [vercel.com](https://vercel.com)
3. Set `NEXT_PUBLIC_SITE_URL`
4. Deploy

---

## What not to push

These are ignored via `.gitignore`:

- `node_modules/` — reinstall with `npm install`
- `.next/` — rebuild with `npm run build`
- `.env` / `.env.local` — secrets stay local
- `.cursor/` — editor files

---

## License

Private prototype — MAJ Boutique.
