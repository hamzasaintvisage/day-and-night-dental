# Day & Night Dental — Launch Checklist

_Last updated: 2026-06-08. Merchant City, Glasgow practice._

## ✅ Done (built & verified)
- [x] Vite + React + static-pre-render (SSG) site — 8 pages, all rendered to crawlable HTML
- [x] Home page + 6 treatment pages (emergency, Invisalign, implants, whitening, cosmetic, general)
- [x] Areas-served page (`/areas-served`)
- [x] World-class on-page SEO: unique titles/descriptions/canonicals per page
- [x] Structured data graph (Dentist + WebSite + Breadcrumb + FAQ + Service, linked by @id)
- [x] Branded og:image, Twitter cards, full favicon/icon set, web manifest
- [x] Performance: non-blocking fonts, vendor code-split, image dimensions (no layout shift), Netlify caching + security headers
- [x] Internal linking (footer + concern cards + treatment rows all link to pages)
- [x] Glasgow / Merchant City local targeting in copy + schema
- [x] sitemap.xml + robots.txt + 404 page
- [x] Human, de-AI'd copy (no em dashes), typography scale tuned
- [x] Central NAP file (`src/data/practice.js`) — update once, applies everywhere

## 🟥 Needs YOU (data / decisions — these block "finished")
- [ ] Real street address + postcode
- [ ] Real phone number
- [ ] Contact email (where form enquiries should land)
- [ ] Prices (replaces the `[£X]` placeholders)
- [ ] Team: names, roles, qualifications, **GDC numbers**, photos
- [ ] Real practice photos (exterior w/ signage, reception, surgeries) to replace stock
- [ ] **Testimonials decision** — supply real Google reviews OR remove the placeholder "200+ reviews" (compliance risk)
- [ ] Netlify account + domain DNS access (for deploy)
- [ ] Google Business Profile pin coordinates + URL (once created)

## 🟧 Must-do before launch
- [x] Wire contact form to email (Netlify Forms) — built; just needs a notification email set at deploy
- [x] Legal pages: Privacy Policy, **Complaints Procedure** (GDC-required), Terms, Accessibility Statement — starter content, review before publishing
- [x] Sticky mobile "Call now" bar
- [ ] Cookie-consent banner (UK/GDPR)
- [ ] Analytics: GA4 + Google Search Console + conversion tracking (call clicks, form submits)
- [ ] `/our-team` page (with Person schema per clinician)
- [ ] `/register-as-patient` page (the registration form on its own page)
- [ ] Link homepage Team/Register sections through to the new pages
- [ ] Accessibility pass (contrast, focus states, prefers-reduced-motion, form labels)
- [ ] Deploy to Netlify + point the domain (www, force HTTPS)
- [ ] Submit sitemap in Search Console

## 🟩 Off-page — the ~60% of local dental ranking (mostly you)
- [ ] Create + fully optimise the Google Business Profile
- [ ] Review-generation engine (steady real Google reviews, reply to each)
- [ ] UK dental citations: NHS.uk, GDC register, Bupa, Denplan, WhatClinic, Yell
- [ ] Local backlinks: Merchant City BID, Glasgow Chamber, local press

## 🟦 Growth (after launch)
- [ ] Online booking integration (Dentally / Curve / Dentr) — biggest conversion upgrade
- [ ] Blog / advice hub (e.g. "emergency dentist Glasgow at night", "implant cost Glasgow")
- [ ] Fees page (high-intent search)
- [ ] Nervous-patient / sedation page
- [ ] Accreditation badges (Invisalign Provider, Enlighten, GDC, Healthcare Improvement Scotland)
- [ ] Real before/after gallery (with patient consent)
- [ ] Short practice walkthrough video
- [ ] Individual dentist bio pages
- [ ] "From £X/month" finance display on implants & Invisalign
