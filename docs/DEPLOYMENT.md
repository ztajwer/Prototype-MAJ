# Deployment Guide

Deploy **MAJ Boutique** to Vercel (recommended, free tier).

---

## Before you deploy

1. Code is on GitHub: [Prototype-MAJ](https://github.com/ztajwer/Prototype-MAJ)
2. `npm run build` passes locally (optional but recommended)
3. All assets are in `public/` (especially `pla.avif`, `vid.mp4`, `background.png`)

---

## Deploy on Vercel

### 1. Connect GitHub

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Select **Prototype-MAJ**
4. Framework should auto-detect as **Next.js** — leave defaults

### 2. Environment variable

Under **Environment Variables**, add:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-PROJECT.vercel.app` |

Use your actual Vercel URL (you can update this after the first deploy).

Apply to: **Production**, **Preview**, **Development**

### 3. Deploy

Click **Deploy**. First build takes 2–4 minutes.

Your live URL will look like:

```
https://prototype-maj.vercel.app
```

---

## After deploy

1. Open the live URL and hard-refresh (`Ctrl+Shift+R`)
2. Test: preloader → video → showroom → click product → customize
3. Update `NEXT_PUBLIC_SITE_URL` to the final URL if you changed it
4. **Redeploy** once after updating the env variable (Vercel → Deployments → Redeploy)

---

## Custom domain (optional)

1. Buy a domain (Cloudflare, Namecheap, etc.)
2. Vercel → Project → **Settings → Domains**
3. Add your domain and follow DNS instructions
4. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com`
5. Redeploy

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page | Check Vercel build logs; run `npm run build` locally |
| Missing images | Confirm files exist in `public/` on GitHub |
| Wrong SEO links | Set `NEXT_PUBLIC_SITE_URL` and redeploy |
| Build fails | Run `npm run type-check` locally; fix TypeScript errors |
| Video not playing | Ensure `public/vid.mp4` is committed (< 100 MB) |

---

## Other hosts

This is a standard Next.js 14 app. Also supported:

- **Netlify** — connect GitHub, use Next.js preset
- **Cloudflare Pages** — connect GitHub, Next.js adapter
- **Render** — Web Service, build: `npm run build`, start: `npm start`

Vercel remains the simplest option for this project.
