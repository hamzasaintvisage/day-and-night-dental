# Day Night Dental — Deploy & Go-Live Runbook (Hostinger)

Hosted on **Hostinger (LiteSpeed)**. Static HTML is built by Vite/`vite-react-ssg` into `dist/`;
the contact form is a **PHP** endpoint; server config lives in `hostinger/`.

FTP creds are read automatically from the macOS Keychain (`dnd-ftp`) or `hostinger/.deploy.env`
(both gitignored). **Never hard-code secrets.**

## Deploy targets — each ships a DIFFERENT thing (this is the foot-gun Codex flagged)

| Command | Ships | When |
|---|---|---|
| `npm run deploy:static` | built `dist/` (HTML/CSS/JS/images) | any front-end change |
| `npm run deploy:htaccess` | `hostinger/.htaccess` (headers, gate, redirects) | any `.htaccess` change |
| `npm run deploy:cron` | cron PHP (purge + monitor) | cron changes |
| `DND_RESEND_KEY=… npm run deploy:api` | PHP endpoint + generated `_config.php` | endpoint/email changes |
| `npm run deploy:all` | static + htaccess + cron (NOT api) | a full front-end + config push |

> ⚠️ `deploy:static` alone does **not** ship the API, `.htaccess` or crons. Use the right target.
> `deploy:api` is separate because it needs `DND_RESEND_KEY` to render the server config.

## Standard front-end deploy
```bash
npm run deploy:static
```

## GO-LIVE checklist (only when the owner says launch)
1. Real content in place: team names + GDC numbers, real hours, real photos, Complaints Manager name.
2. Remove the gate: delete the **COMING SOON MODE** block from `hostinger/.htaccess`, delete
   `hostinger/preview.php`, and remove the 2 preview `RewriteCond` lines.
3. `npm run deploy:all`, then `DND_RESEND_KEY=… npm run deploy:api`.
4. Verify live:
   - `curl -I https://www.daynightdental.co.uk/` → **301** to apex.
   - `curl -I https://daynightdental.co.uk/` → **200**, and NOT the coming-soon page.
   - `curl -I https://daynightdental.co.uk/definitely-fake-route` → **404** + branded `/404.html`.
   - Confirm the real homepage is indexable (gate gone, no `noindex`).
5. Google Search Console: add the property, submit `sitemap.xml`, request indexing of key pages.
6. Send one real test enquiry from BOTH forms; confirm it lands at `reception@` and is replyable.

## Crons (schedule in Hostinger hPanel)
- `cron/purge-enquiries.php` — daily (90-day GDPR purge of form backups)
- `cron/monitor.php` — daily (delivery/health check)

## Canonical host
Apex `https://daynightdental.co.uk` is canonical (`SITE` in `src/data/practice.js`); `www` 301s to
apex via `hostinger/.htaccess`. If you ever switch to `www`, update both.
