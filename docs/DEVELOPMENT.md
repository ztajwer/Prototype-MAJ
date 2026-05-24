# Development Guide

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key paths

- `components/experience/` — preloader → video → showroom flow
- `components/showroom/` — showroom and customize UI
- `hooks/useShowroomScrollZoom.ts` — zoom and walk-in
- `lib/data.ts` — products and brand data
- `public/` — images, video, logos

## Checks before release

```bash
npm run type-check
npm run lint
npm run build
```
