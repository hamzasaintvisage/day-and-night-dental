# Day & Night Dental — Project Handoff / Context

> **Read this first.** This file is the single source of truth for continuing the
> build. It's written so a fresh Claude (or developer) with no prior context can
> pick up exactly where we are. Last updated: 2026-06-08.

---

## 1. What this is

A website for **Day & Night Dental** — a brand-new, not-yet-open **24/7 emergency + cosmetic dental practice** in **Merchant City, Glasgow** (UK, GDC-regulated). The brand's whole differentiator is being **open day *and* night for emergencies**. The owner will run **paid ads** (Google + Meta) once live.

**Project root:** `/Users/sagharu/day-and-night-dental`
The original design package came from `~/Downloads/day-and-night-dental.zip` (it shipped a Babel-in-browser React preview that was not production-grade; this project is the proper rebuild).

---

## 2. How to run it

Requires **Node.js** (built with Node 24 LTS). On a fresh machine: install Node, then:

```bash
cd /Users/sagharu/day-and-night-dental
npm install
npm run dev       # live dev server, http://localhost:5173
npm run build     # static pre-render → dist/  (then auto-generates dist/sitemap.xml)
npm run preview   # serve the built dist/, http://localhost:4173
npm run lint      # eslint (some harmless unused-var warnings exist)
```

The site builds to **~21 static HTML pages** in `dist/`. Hosting is **Netlify** (config in `netlify.toml`).

---

## 3. Tech stack & the decisions behind it

- **Vite 7 + React 19 + React Router 6 + `vite-react-ssg` 0.9** — a React app that **statically pre-renders every route to HTML** (SSG). This was a deliberate choice: the owner wanted a "full React app, NOT Next.js, with top SEO." SSG gives React's power *and* crawlable HTML.
- **Critical version pins (do not bump blindly):**
  - `@vitejs/plugin-react` must be **`^5`** — v6 requires Vite 8, but `vite-react-ssg` only supports Vite ≤7. This pairing is fragile; keep plugin-react 5 + vite 7.
  - `beasties` (critical-CSS) is a devDep, pinned `^0.1.0`.
- **Plain CSS** (no Tailwind/UI lib). Global tokens + utilities in `src/styles/global.css`; many sections also carry component-scoped `<style>` blocks (CSS is global once rendered).
- **Deploy:** Netlify. `netlify.toml` has build cmd, immutable-asset caching, security headers, apex→www 301, pretty-URLs. The owner must connect their Netlify account + domain and (in the Netlify UI) set www as primary + Force HTTPS.

---

## 4. Project structure (what lives where)

```
src/
├── main.jsx                 # ViteReactSSG entry (routes + global.css)
├── routes.jsx               # ALL routes (static, each pre-rendered). Blog posts auto-mapped.
├── data/
│   ├── practice.js          # ⭐ SINGLE SOURCE OF TRUTH for NAP + brand + geo + rating. EDIT HERE.
│   ├── config.js            # ⭐ GA4_ID + META_PIXEL_ID (empty = analytics off).
│   └── blog.js              # Blog posts (add an entry → new /blog/<slug> page auto-created).
├── components/
│   ├── Layout.jsx           # Shared chrome: skip-link, header, <main id="main">, footer, mobile call bar, cookie banner, analytics, geo <Head>.
│   ├── Header.jsx           # Sticky header + mobile menu (own <style>).
│   ├── Footer.jsx           # Footer (uses PRACTICE constants; links fixed to root-relative / real pages).
│   ├── Logo.jsx             # Brand SVG mark.
│   ├── TreatmentPage.jsx    # ⭐ Data-driven engine: ALL 6 treatment pages render this with a `data` object.
│   ├── LegalPage.jsx        # Data-driven engine for the 4 legal pages.
│   ├── ArticleLayout.jsx    # Blog post layout (BlogPosting schema).
│   ├── Dropdown.jsx         # ⭐ Custom accessible <select> replacement (SSR-safe, Netlify-compatible).
│   ├── FormSuccess.jsx      # Shared "thank you" UI (animated checkmark + steps).
│   ├── CookieConsent.jsx    # GDPR banner; gates analytics.
│   ├── Analytics.jsx        # SPA page_view on route change (if consented).
│   ├── MobileCallBar.jsx    # Sticky bottom "Call now / Book" bar on mobile.
│   └── CtaBand.jsx          # Reusable full-width emergency CTA strip (used on homepage).
├── pages/
│   ├── Home.jsx             # Homepage: composes sections + Dentist/WebSite JSON-LD.
│   ├── AreasServed.jsx, OurTeam.jsx, RegisterAsPatient.jsx, Blog.jsx, BlogPost.jsx
│   ├── ThankYou.jsx, Registered.jsx   # Trackable post-submit pages (noindex).
│   ├── treatments/*.jsx     # 6 files, each just a `data` object + <TreatmentPage data={data}/>.
│   ├── blog/                # (posts come from data/blog.js via BlogPost — no per-post files needed)
│   └── legal/*.jsx          # Privacy, Complaints, Terms, Accessibility.
├── sections/                # Homepage sections (Hero, EmergencyBand, Concerns, About, WhyChooseUs,
│                            #   Treatments, SmileGallery, Register, Testimonials, Team, AreasServed, HomeFaq, Contact)
└── styles/global.css        # Global design system + all the helper/section CSS appended over time.
index.html                   # Shell: <head> (fonts, icons, manifest, robots, GSC slot) + a HIDDEN static
                             #   <form name="register"> so Netlify detects the multi-step register fields.
scripts/sitemap.mjs          # Post-build: generates dist/sitemap.xml (excludes noindex pages).
public/                      # favicon set, og-image.jpg, logo.png, robots.txt, site.webmanifest, 404.html
LAUNCH_CHECKLIST.md          # High-level checklist.
```

---

## 5. Key patterns & gotchas (IMPORTANT — read before editing)

- **NAP single source of truth:** all name/address/phone/email/geo live in `src/data/practice.js`. Change once, applies everywhere (footer, header, schema, contact, etc.). **Never hardcode contact details elsewhere.**
- **Treatment pages are data-driven:** to edit a treatment, edit its `data` object in `src/pages/treatments/<Name>.jsx`. The layout/SEO/schema all come from `TreatmentPage.jsx`. Optional `concern` block on the data = the problem-framed section (deep-linked from homepage concern cards via `#concern`).
- **SSR-safety (this is a static pre-render):** NEVER use `window`/`document`/`localStorage`/`new Date()` at module scope or during render — only inside `useEffect`. Breaking this breaks `npm run build`. (See Header/Layout/Dropdown/CookieConsent for the correct pattern.)
- **Netlify Forms:** both forms POST to `/` from React state, then `navigate()` to a thank-you page. Contact form is fully pre-rendered so Netlify detects it. Register is multi-step, so a **hidden static `<form name="register">` in `index.html`** lists all its fields for detection. Custom `Dropdown` renders a hidden `<input>` so its value is captured (DOB part-dropdowns use `suppressHidden` so they don't leak `dobDay/dobMonth/dobYear`).
- **Clean URLs vs `.html`:** internal links + canonicals use clean URLs (`/treatments/invisalign`). The `.html` form 404s client-side; Netlify pretty-urls handles it in prod. Don't link to `.html`.
- **Analytics is consent-gated:** nothing loads until the user clicks Accept on the cookie banner AND `config.js` has IDs. Empty IDs = total no-op.
- **Preview-panel quirk:** the Claude Code preview *panel* and the Claude_Preview MCP sometimes render the page scaled-down/tiny — that's a tool artifact, NOT the site. View at `http://localhost:4173` in a real maximised browser for the true look.
- **Typography:** headings use `clamp(min, vw, max)`. The scale was deliberately tuned DOWN once already (it was "too zoomed" at narrow widths). Be conservative raising it.
- **⚠️ COMPLIANCE — do NOT re-add fake social proof.** The practice isn't open. `Testimonials.jsx` was deliberately rewritten from fabricated reviews ("4.9/5, 200+ reviews" + invented patients) to honest "promises." `SmileGallery.jsx` images are stock with an "illustrative only" note. Do NOT add `aggregateRating` schema or star ratings until REAL Google reviews exist (it's an ASA/GDC/Google-policy risk). The schema wiring is dormant in `practice.js` (`rating: null`).

---

## 6. What's been built (done & verified)

Home + 6 treatment pages + areas-served + 4 legal pages + our-team + register-as-patient + blog (index + 3 posts) + 2 thank-you pages + 404 = **21 pages**, all pre-rendered, build green.

- **SEO:** per-route title/description/canonical; full structured-data `@id` graph (Dentist + WebSite on home; Breadcrumb + MedicalProcedure + Service + FAQPage per treatment; Person on team; BlogPosting on posts); auto-sitemap; robots; geo meta; og:image (branded) + Twitter cards + favicons + manifest; Glasgow/Merchant City local targeting; concern (symptom-intent) sections on treatment pages.
- **Conversion:** homepage repositioned around the **24/7 night-emergency** USP (hero leads with it, phone = primary CTA), two `CtaBand`s, sticky mobile call bar, custom on-brand form controls (Dropdown + Day/Month/Year DOB), **trackable `/thank-you` + `/registered`** pages.
- **Forms:** contact + register both wired to **Netlify Forms** (capture works on deploy; locally they just navigate to the thank-you page). Register's medical-history step was removed — **no special-category health data is collected anywhere.**
- **Compliance/legal:** Privacy, Complaints (GDC-aligned), Terms, Accessibility pages; GDPR cookie banner; fabricated reviews neutralised.
- **Accessibility:** prefers-reduced-motion, :focus-visible, skip-link, burger ARIA, contrast bump.
- **Perf:** non-blocking fonts, critical-CSS inlining (beasties), code-split, WebP images, image dimensions (no CLS), Netlify caching/security headers.

---

## 7. ⭐ Placeholders to fill in (the "make it real" list)

Search the codebase for `[` to find bracketed placeholders. Specifically:

| What | Where | Notes |
|---|---|---|
| Street address, postcode | `src/data/practice.js` (`streetAddress`, `postcode`) | |
| Phone (display + E.164) | `src/data/practice.js` (`phoneDisplay`, `phoneE164`) | E.164 has no spaces, e.g. `+441410000000` |
| Email | `src/data/practice.js` (`email`) | already `hello@dayandnightdental.co.uk` |
| Rooftop geo coords | `src/data/practice.js` (`geo`) | currently Merchant City centroid; get exact from GBP pin |
| Prices | `[£X]` across treatment data files + blog | |
| Team: names, roles, GDC numbers, photos | `src/sections/Team.jsx` (`team` array) | add `gdc: '123456'` to a member → emits in Person schema on /our-team |
| **GA4 + Meta Pixel IDs** | `src/data/config.js` | empty = analytics off. Fill `G-XXXX` + pixel number when ads start. |
| Google Business Profile URL + social links | `src/data/practice.js` (`googleMapsUrl`, `sameAs`) | feeds schema hasMap/sameAs |
| Real reviews → star rating | `src/data/practice.js` (`rating: { value, count }`) | ONLY when real reviews exist → enables aggregateRating stars |
| Real practice/patient photos | replace `images.unsplash.com` URLs in Hero/About/SmileGallery/Team | with consent for patient photos |
| Search Console / Bing verification | `index.html` (commented slot in `<head>`) | |

---

## 8. What's NOT done / next steps

1. **Dentally online booking (parked).** The practice uses **Dentally** (PMS). Confirmed via their docs: online booking is a **hosted Patient Portal link/button, NOT an embeddable widget** (embed only via their API). Plan when ready: add a `dentallyBookingUrl` constant; "Register"/"Book" buttons open it when set, else fall back to the contact form. New-patient registration + medical history should happen **inside Dentally** (never collected on this site). The owner doesn't have the booking link enabled yet.
2. **Deploy to Netlify** + point the domain (owner has a domain). Then set the Netlify Forms notification email (any inbox; swappable).
3. **Off-page SEO (owner's ~60%):** Google Business Profile (biggest lever), review-generation engine, UK dental citations (NHS.uk, GDC register, Bupa, Denplan, WhatClinic), local backlinks, verify GSC + submit sitemap.
4. **Content growth:** add blog posts over time (just add to `src/data/blog.js`); consider per-clinician bio pages once team is real.

---

## 9. Verify after changes

```bash
npm run build                                            # must succeed (SSR pre-render)
grep -o 'name="[a-zA-Z-]*"' dist/index.html | sort -u    # Netlify form fields must survive; no name="dobDay" etc.
ls dist/**/*.html                                        # ~21 pages
# then: npm run preview  → click around at http://localhost:4173 in a real browser
```

If `npm run build` fails on CSS, check the end of `global.css` (it's been appended to many times — a malformed rule there is the usual cause).
