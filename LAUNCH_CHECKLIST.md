# Day & Night Dental — Launch Checklist

_Last updated: 2026-06-12. See RUNBOOK.md for deploy commands and go-live steps._

Hosted on **Hostinger (LiteSpeed)**. Forms sent via **Resend** from hardened PHP endpoint.
No Netlify. No Cloudflare Workers. No serverless functions.

---

## Owner content — hard go-live blockers

`LAUNCH=1 npm run check` will hard-fail until every item below is in place.

- [ ] Real dentist names + GDC registration numbers (`src/sections/Team.jsx`)
- [ ] Per-treatment `reviewer` field (name + credentials) in each treatment data file
- [ ] Confirmed opening hours (`PRACTICE` in `src/data/practice.js`)
- [ ] Real street address + postcode (`src/data/practice.js`)
- [ ] Complaints Manager name (`src/pages/legal/Complaints.jsx`)
- [ ] Consented practice photography (exterior, reception, surgeries)
- [ ] Google Business Profile URL + pin coordinates (`src/data/practice.js`)

---

## Done (built, verified, deployed behind preview gate)

- [x] Vite + React 19 SSG — 23 pages pre-rendered to crawlable HTML
- [x] 6 treatment pages + blog + areas-served + legal pages
- [x] Unique title/description/canonical per page; `noindex` on utility pages only
- [x] Full structured data graph: Dentist + LocalBusiness + WebSite + BreadcrumbList + FAQPage + BlogPosting
- [x] Branded OG image, Twitter cards, SVG favicon, web manifest
- [x] Non-blocking CSS (beasties critical-inline + async preload swap)
- [x] Consent-gated analytics (GA4 + Meta Pixel via `CookieConsent`)
- [x] GDPR cookie withdrawal (footer "Cookie settings" reopens banner, clears choice)
- [x] PHP form endpoint: rate-limit, honeypot, time-trap, CORS allowlist, Resend timeout, NDJSON backup
- [x] Hardened `.htaccess`: HSTS, CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy
- [x] www → apex 301 redirect; sitemap.xml + robots.txt
- [x] No prices anywhere (GDC/ASA compliance); no unverifiable claims
- [x] WAI-ARIA tabs (FAQ), listbox (dropdowns), 44px tap targets
- [x] Error boundary wraps every route; false thank-you pages gated on form state
- [x] Emergency treatment page: call-first red CTA
- [x] Preview gate active (remove at go-live — see RUNBOOK.md)
- [x] ESLint (react-hooks + jsx-a11y), stylelint, vitest all passing in CI

## Still needed before launch (no owner data required)

- [ ] Display font decision (trial regeneration takes ~5 min — see RUNBOOK.md)
- [ ] Send a real test enquiry from both forms on the live server
- [ ] Verify apex 301, true 404, and that gate is gone

## Off-page (your job after launch)

- [ ] Google Business Profile: fully filled, photos added, first review replied to
- [ ] UK dental citations: NHS.uk, GDC register, Bupa, Denplan, WhatClinic, Yell
- [ ] Google Search Console: property added, sitemap submitted, key pages indexed
