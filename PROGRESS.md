# FlameZanzi portfolio — project progress

**Repository:** [github.com/VivekKalolia/flamezanzi-portfolio-website](https://github.com/VivekKalolia/flamezanzi-portfolio-website)  
**Last updated:** 2026-03-25

## Summary

Next.js (App Router) rebuild of the FlameZanzi corporate site: core routes, shared chrome (header/footer), venture data in `lib/site-data.ts`, gallery wired to local files under `public/images` (that folder is **gitignored** because of size — keep assets locally or host via CDN and adjust paths).

## Done

| Area | Status |
|------|--------|
| Home | `app/page.tsx` — hero, highlights, CTAs |
| About | `app/about/page.tsx` |
| Ventures list + filters | `app/ventures/page.tsx`, `components/ventures-directory.tsx` |
| Venture detail | `app/ventures/[slug]/page.tsx` |
| Gallery | `app/gallery/page.tsx`, `components/gallery-grid.tsx`, `lib/local-gallery.ts` |
| Contact | `app/contact/page.tsx`, `components/contact-form.tsx` |
| Menu (per venture) | `app/menu/[slug]/page.tsx`, `components/menu-experience.tsx` |
| Legal | `app/privacy/page.tsx`, `app/terms/page.tsx` |
| SEO basics | `app/sitemap.ts`, `app/robots.ts` |
| Theming / layout | `app/layout.tsx`, `app/globals.css`, UI primitives under `components/ui/` |
| Brand logos (SVG) | `public/logos/` (tracked in Git) |

## Stack

- Next.js, React, TypeScript  
- Tailwind CSS v4, shadcn-style components (`components.json`)  
- Content: `lib/site-data.ts` + filesystem images where present  

## Local setup notes

1. Clone the repo and run `npm install` in the project root.  
2. Add **`public/images`** on your machine (same structure the app expects: e.g. `images/flames/`, `images/silk route/`, `images/optimized/`, etc.). This directory is not committed.  
3. `npm run dev` — [http://localhost:3000](http://localhost:3000)

## Still to tighten (from product brief / polish)

- Wire contact form to production endpoint (e.g. Formspree) and env-based configuration  
- GA4 or analytics snippet when ready  
- Full menu/cart + WhatsApp order flow parity with legacy Astro site, if required  
- Image optimization pipeline for large `public/images` assets (CDN or build-time)  
- Content and copy QA against live `flamezanzi.com`  

## How we track progress in Git

After meaningful changes: update **this file** (`PROGRESS.md`), commit with a clear message, and push to `origin` (`main`). See `.cursorrules` for agent-oriented steps.
