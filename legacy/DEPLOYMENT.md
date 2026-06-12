# Day Night Dental — deployment & operations

Plain-English record of how the site is hosted, how to deploy it, and what is left to do.

## Hosting
- **Host:** Cloudflare Pages (free). Live at `https://daynightdental.pages.dev` until the
  custom domain is moved over.
- **What it is:** a static website (pre-built pages) plus one small server function that
  receives the contact / registration forms and emails them out via Resend. No database;
  enquiries are emailed, never stored (a deliberate data-protection choice).
- **Code backup:** this GitHub repo. Pushed automatically (see "Automatic backups" below).

## How to deploy a change
From the project folder, with the Cloudflare token + account id set as environment variables:

```
npm run build
npx wrangler@3 pages deploy dist --project-name=daynightdental --branch=main --commit-dirty=true
```

(`wrangler@3` is required because the machine runs Node 20; `wrangler@latest` needs Node 22.)

## Security (verified by an adversarial audit + two independent confirmations)
- Full security headers on every page: strict Content-Security-Policy (`connect-src 'self'`,
  no third-party script/connect origins while analytics is off), HSTS preload, X-Frame-Options
  DENY, nosniff, Referrer-Policy, COOP, CORP, Permissions-Policy.
- The form function validates and escapes every field (blocks email-header/CRLF injection,
  HTML injection, prototype pollution, oversized/array payloads), checks the request origin,
  uses a honeypot + a timing trap, and **rate-limits to 8 submissions per IP per minute**
  (KV-backed; fails open so a real patient is never blocked).
- No secrets in the browser bundle; API keys live only in Cloudflare environment variables.

## Domain facts (verified 2026-06-10 via dig/whois)
- **Registrar (owned at):** Namecheap. The nameserver change MUST be done in the Namecheap account.
- **DNS currently managed by:** Hostinger (nameservers `aurora.dns-parking.com` / `nebula.dns-parking.com`
  = Hostinger parking). The domain currently just shows a parking page; it is NOT on Netlify or Cloudflare.
- **Email:** Google Workspace (`MX -> SMTP.GOOGLE.COM`, `SPF v=spf1 include:_spf.google.com ~all`,
  Google DKIM). `reception@` and `admin@` are Google Workspace. This MUST be preserved.
- **Old Netlify records (A 75.2.60.5, www -> netlify): never applied (confirmed absent). Discard them.**

## STILL TO DO
**Team (the only DNS work needed):**
1. In **Cloudflare**, add `daynightdental.co.uk`. Cloudflare auto-imports existing records — CONFIRM the
   Google Workspace records came across (MX `SMTP.GOOGLE.COM`, the `_spf.google.com` SPF, and the
   `google._domainkey` DKIM) so `reception@`/`admin@` email is never interrupted.
2. In **Namecheap**, change the nameservers from the Hostinger ones to the two Cloudflare provides.

**Me (after the nameserver move, all via the Cloudflare/Resend APIs — no team work):**
- Add the Resend sending records in Cloudflare DNS, then trigger Resend domain verification:
  - `TXT resend._domainkey = p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCtdQ5zVXfRHd1dtR5AtL4exnXzYnptTAAVZWy+7OmRYoDPzABFZVbiZdJ9WObbF/qs0cwPvmnJOreMTeJuKyeIzl14ikLxBZq/JalycrSLTLHJfFY8sIzYSDYFiiVBigwrSxI7QTdci4mbfltZ8QxIV25RQD+bSaCuZiiSMeIxwIDAQAB`
  - `MX send = feedback-smtp.eu-west-1.amazonses.com` (priority 10)
  - `TXT send = v=spf1 include:amazonses.com ~all`
  (These sit on the `send` / `resend._domainkey` sub-names, so they do NOT touch the Google root MX/SPF.)
- Tighten DMARC: `_dmarc` is currently `v=DMARC1; p=none; rua=mailto:admin@daynightdental.co.uk`.
  Move to `p=quarantine; adkim=s; aspf=s; pct=100` (keep the rua), then to `p=reject` after watching
  reports. Both Google Workspace and Resend mail align (DKIM), so legit mail is unaffected.
- Attach the custom domain to the Pages project (POST .../pages/projects/daynightdental/domains).

## CUTOVER CHECKLIST (when the domain goes live on Cloudflare)
- [ ] Confirm the Resend domain shows "verified", then submit each form once and check the email arrives.
- [ ] Add a Cloudflare WAF rate-limiting rule on `/api/*` (the stronger, edge-level bouncer).
- [ ] Remove the `*.pages.dev` branch from `originAllowed()` in `functions/api/send-enquiry.js`
      so only the real domain (+ localhost) can use the form endpoint.
- [ ] Deploy the health monitor (see `monitor/worker.js` header for the exact steps).

## Automatic backups
The project lives at `/Users/admin/day-and-night-dental-recovered` (home folder, NOT Downloads,
so macOS does not block background access — no Full Disk Access switch needed). A scheduled job
commits and pushes any changes to GitHub every 2 hours (`~/.daynight-backup.sh`, run by
`~/Library/LaunchAgents/com.daynightdental.backup.plist`). It refuses to commit any
secret-looking file. Log: `~/.daynight-backup.log`. Fully hands-off.
