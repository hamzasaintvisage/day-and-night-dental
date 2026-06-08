# Day & Night Dental — website

**👉 Read [`HANDOFF.md`](./HANDOFF.md) first.** It's the full project context: what's built,
how to run it, the architecture, the placeholders to fill, and what's left to do. This
file is the short version that loads automatically every session.

## What this is
Marketing website for **Day & Night Dental** — a not-yet-open **24/7 emergency + cosmetic
dental practice** in **Merchant City, Glasgow** (UK, GDC-regulated). SEO is the top priority;
the owner will run paid Google + Meta ads once live.

## Stack
Vite 7 + React 19 + React Router 6 + **`vite-react-ssg`** (static pre-render of every route
to HTML for SEO, then hydrates to a SPA). Plain CSS. Hosts on **Netlify** + Netlify Forms.
Deliberately **NOT Next.js** (owner's call). ~21 pre-rendered pages, build is green.

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # → dist/ (+ auto sitemap)
npm run preview   # http://localhost:4173  ← view here in a real browser for the true look
```

## Rules — do not break these
- **All contact details (NAP) live in `src/data/practice.js`** — single source of truth. Never hardcode them elsewhere.
- **Analytics/IDs go in `src/data/config.js`** (empty = off).
- **SSR-safe only:** no `window`/`document`/`localStorage`/`new Date()` at render or module scope — only inside `useEffect`. Breaking this breaks `npm run build`.
- **Treatment pages are data-driven:** edit the `data` object in `src/pages/treatments/<Name>.jsx`, not layout.
- **⚠️ No fake social proof.** The practice isn't open. Don't add reviews, star ratings, or `aggregateRating` schema until REAL Google reviews exist (ASA/GDC/Google-policy risk). Reviews were deliberately neutralised once already.
- **Netlify forms:** the hidden static `<form name="register">` in `index.html` exists for multi-step field detection — keep it in sync with the register form's fields.

## Before you say "done"
`npm run build` must pass, then click around at `http://localhost:4173`. See `HANDOFF.md` §9.
