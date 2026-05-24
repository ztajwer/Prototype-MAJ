# Development Guide

Quick reference for working on the MAJ Boutique codebase.

---

## Local setup

```bash
npm install
npm run dev
```

Dev server: [http://localhost:3000](http://localhost:3000)

---

## Experience phases

Controlled by `components/experience/ExperienceOrchestrator.tsx`:

| Phase | Component | Notes |
|-------|-----------|-------|
| `preloader` | `Preloader.tsx` | ~2.4s, tap to skip |
| `welcome` | `WelcomeVideo.tsx` | Plays `vid.mp4` |
| `showroom` | `ShowroomExperience.tsx` | Main interactive view |

The showroom only mounts when phase is `showroom`, so the walk-in animation plays when the user first sees it.

---

## Showroom zoom

| File | Role |
|------|------|
| `hooks/useShowroomScrollZoom.ts` | Scroll/touch input, walk-in timer |
| `lib/showroom-zoom.ts` | Scale, position, table placement |
| `lib/showroom-walk-in.ts` | Walk-in duration & easing |
| `components/showroom/MainShowroom.tsx` | UI, carousel, products |

- **Scroll down** = zoom in  
- **Scroll up** = zoom out  
- Walk-in runs automatically on first entry (~6.4s)

---

## Products

Defined in `lib/data.ts` → `SHOWROOM_PIECES` and `PRODUCTS`.

Images mapped in `lib/product-images.ts` → files under `public/products/`.

To add a product:

1. Add image to `public/products/`
2. Add entry in `PRODUCTS` in `lib/data.ts`
3. Add piece to `SHOWROOM_PIECES` for carousel display
4. Update `product-images.ts` if needed

---

## Backgrounds

Paths in `lib/media.ts`:

| Constant | File |
|----------|------|
| `PRELOADER_BG` | `/pla.avif` |
| `PAGE_BACKGROUND` | `/background.png` (desktop) |
| `PAGE_BACKGROUND_MOBILE` | `/mob.png` (mobile) |
| `WELCOME_VIDEO` | `/vid.mp4` |

Customize page uses `PageBackground variant="atelier"` (same as `pla.avif`).

---

## Styling

- **Tailwind** — utility classes in components
- **`app/globals.css`** — showroom, preloader, customize, cursor effects
- Design tokens: `maj-vault`, `maj-gold`, `maj-logo-gold` in Tailwind config

Main showroom CSS variables:

```css
--showroom-piece    /* product size */
--showroom-orbit    /* carousel radius */
--showroom-land     /* 0–1 table landing progress */
```

---

## Cursor effect

`components/effects/LuxuryCursor.tsx` — mounted in `app/layout.tsx`.

White sparkle trail on desktop only (`pointer: fine`). Disabled when `prefers-reduced-motion: reduce`.

---

## SEO

- Metadata: `lib/seo.ts`, `app/page.tsx`
- JSON-LD: `components/seo/JsonLd.tsx`
- Hidden catalog for crawlers: `ShowroomSeoCatalog.tsx`
- Sitemap / robots: `app/sitemap.ts`, `app/robots.ts`

Requires `NEXT_PUBLIC_SITE_URL` in production.

---

## Common tasks

### Change walk-in speed

Edit `SHOWROOM_WALK_IN_MS` in `lib/showroom-walk-in.ts`.

### Move products on screen

Edit `GLASS_TABLE` / `GLASS_TABLE_MOBILE` in `lib/showroom-zoom.ts` and CSS in `globals.css` under `.showroom-stage--table`.

### Change loader duration

Edit `PRELOADER_MS` in `ExperienceOrchestrator.tsx` or `duration` prop on `Preloader`.

---

## Quality checks before push

```bash
npm run type-check
npm run lint
npm run build
```

Do **not** commit `node_modules`, `.next`, or `.env.local`.
