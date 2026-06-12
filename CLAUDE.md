# Day Night Dental — website

Marketing website for **Day Night Dental** — a 24/7 emergency + cosmetic/implant dental
practice in **Merchant City, Glasgow** (UK, GDC-regulated). Pre-launch, currently behind a
"coming soon" gate. SEO + local search are the top priority.

## Stack
Vite 7 + React 19 + React Router 6 + **`vite-react-ssg`** (static pre-renders every route to
HTML for SEO, then hydrates to a SPA). Plain CSS. Deliberately **not** Next.js.

## Hosting / deploy — HOSTINGER (not Netlify/Cloudflare)
Hosted on **Hostinger (LiteSpeed)**. The contact form posts to a hardened **PHP** endpoint at
`hostinger/api/send-enquiry.php`. Security headers, caching, the coming-soon gate and redirects
live in `hostinger/.htaccess`.

> ⚠️ Old Cloudflare Pages / Netlify files are archived in `legacy/` — DO NOT use them.

Deploy (build first):
```bash
npm run build
bash hostinger/deploy-local.sh dist    # static.  Also: api | htaccess | cron  (see RUNBOOK.md)
```
FTP creds come from the macOS Keychain / `hostinger/.deploy.env` (gitignored) — never hard-code
secrets. Full deploy sequence + go-live steps live in `RUNBOOK.md`.

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # → dist/ (+ auto sitemap, head fixups)
npm run preview   # http://localhost:4173  ← view here for the true look
npm run check     # build + integrity checks
npm run lint      # ESLint
```
Node **>=20.19** required (see `.nvmrc`). Keep `@vitejs/plugin-react` at **^5** + Vite **7**
(plugin v6 needs Vite 8, which `vite-react-ssg` does not support — do not bump).

## Rules — do not break these
- **All contact details (NAP) live in `src/data/practice.js`** — single source of truth. Never hardcode them elsewhere.
- **Analytics/IDs go in `src/data/config.js`** (empty = off).
- **SSR-safe only:** no `window`/`document`/`localStorage`/`new Date()` at render or module scope — only inside `useEffect`. Breaking this breaks `npm run build`.
- **Treatment pages are data-driven:** edit the `data` object in `src/pages/treatments/<Name>.jsx`, not the layout.
- **⚠️ No fake social proof.** Don't add reviews, star ratings, or `aggregateRating` schema until REAL Google reviews exist (ASA/GDC/Google-policy risk).
- **Form** posts to `/api/send-enquiry.php` via `src/lib/submitEnquiry.js`. Keep the PHP endpoint's expected fields in sync with the form fields.

## Before you say "done"
`npm run build` + `npm run check` + `npm run lint` must pass, then click around at
`http://localhost:4173` (desktop + mobile): no console errors, no horizontal overflow.
