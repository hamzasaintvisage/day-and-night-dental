# ⚠️ LEGACY — DO NOT USE

These files are archived from the **old Cloudflare Pages / Netlify era**. They are
**not** how this site is built or deployed anymore.

**The live platform is HOSTINGER (LiteSpeed + PHP).**

- Deploy + runbook: see `../RUNBOOK.md` and `../hostinger/`
- The live form endpoint is `../hostinger/api/send-enquiry.php` (PHP), **not**
  `functions/api/send-enquiry.js` (Cloudflare) in this folder.
- Security headers + redirects live in `../hostinger/.htaccess`, **not** in
  `_headers` / `_redirects` (those are Netlify-format and Hostinger ignores them).

Nothing in this folder is deployed or imported by the build. Kept only for history.
If you are a future maintainer or agent: ignore everything here and use `../hostinger/`.

Archived: 2026-06-12
