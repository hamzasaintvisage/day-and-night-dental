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

## STILL TO DO — owner / team (these are DNS changes, not code)
1. **Verify the sending domain in Resend.** Add these 3 records to `daynightdental.co.uk` DNS
   (they sit on sub-names, so they do NOT affect the existing `reception@` mailbox):
   - `TXT`  name `resend._domainkey`  value `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCtdQ5zVXfRHd1dtR5AtL4exnXzYnptTAAVZWy+7OmRYoDPzABFZVbiZdJ9WObbF/qs0cwPvmnJOreMTeJuKyeIzl14ikLxBZq/JalycrSLTLHJfFY8sIzYSDYFiiVBigwrSxI7QTdci4mbfltZ8QxIV25RQD+bSaCuZiiSMeIxwIDAQAB`
   - `MX`   name `send`  value `feedback-smtp.eu-west-1.amazonses.com`  priority `10`
   - `TXT`  name `send`  value `v=spf1 include:amazonses.com ~all`
   Until this is done the form returns an error and no email is sent.
2. **Tighten DMARC** (anti-spoofing for the practice domain). Current `_dmarc.daynightdental.co.uk`
   is `p=none` (forged emails are not stopped). Change it to start at
   `v=DMARC1; p=quarantine; adkim=s; aspf=s; pct=100; rua=mailto:<an address you check>` and,
   after watching reports for a couple of weeks, move to `p=reject`. Google Workspace mail is
   unaffected.
3. **Move the domain's nameservers to Cloudflare** (for the custom domain). Before flipping
   them, confirm the existing email (MX) records are copied into Cloudflare DNS or inbound mail
   to `reception@` breaks.

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
