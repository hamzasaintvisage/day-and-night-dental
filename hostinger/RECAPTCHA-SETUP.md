# Turning on Google reCAPTCHA v3 (form spam protection)

This is a plain-English guide for switching on the invisible spam protection on the Day Night
Dental enquiry forms. You do not need to be a developer to follow it.

**You do not have to do this to launch.** Until both keys below are set, the forms work
normally and the rest of the anti-abuse stack (honeypot, time-trap, rate limits, disposable
email blocking, duplicate drop, origin allowlist) is still fully active. reCAPTCHA is an extra
layer on top.

reCAPTCHA v3 is **invisible**: there is no puzzle for the patient to solve. It quietly scores
each submission from 0 (almost certainly a bot) to 1 (almost certainly a real person) and we
refuse anything that scores too low. Patients only ever see a small "protected by reCAPTCHA"
badge in the bottom-right corner of the page.

---

## Step 1 - sign in as the practice, not yourself

**IMPORTANT:** create the key while logged into the **Google account that owns the Day Night
Dental Google Business Profile**, so the key belongs to the practice and not to a personal
account. If you leave, a key made on your personal account leaves with you.

## Step 2 - create the key

1. Go to **https://www.google.com/recaptcha/admin/create**
2. Sign in with the practice Google account (see Step 1).
3. Fill the form in:
   - **Label:** `Day Night Dental`
   - **reCAPTCHA type:** choose **reCAPTCHA v3**
   - **Domains:** add both of these, one per line:
     - `daynightdental.co.uk`
     - `www.daynightdental.co.uk`
   - Tick to **accept the reCAPTCHA Terms of Service**.
4. Click **Submit**.
5. Google now shows you two keys. Copy them somewhere safe for a moment:
   - a **Site key** (public)
   - a **Secret key** (private, treat it like a password)

## Step 3 - put each key in its place

There are two keys and they go in two different places. This matters.

### Site key (public, safe to commit)

- Goes in **`src/data/config.js`**, in the line:
  ```js
  export const RECAPTCHA_SITE_KEY = ''
  ```
- Paste your Site key between the quotes, e.g.
  ```js
  export const RECAPTCHA_SITE_KEY = '6Lc...your-site-key...'
  ```
- This one is public by design (it ships in the web page), so it is fine to commit it and it is
  fine for people to see it.
- Rebuild and redeploy the site (`npm run build`, then the usual dist deploy) so the new
  `config.js` reaches production.

### Secret key (private, NEVER commit)

- Goes in the deploy **environment variable `DND_RECAPTCHA_SECRET`**.
- Treat it like a password. Put it in **`hostinger/.deploy.env`** (which is gitignored and never
  committed) or the **macOS Keychain**. **Never** paste it into `config.js`, any committed file,
  or anywhere public.
- The deploy script reads `DND_RECAPTCHA_SECRET` from the environment when it renders the
  server config. When (and only when) that variable is present and non-empty, the server turns
  reCAPTCHA verification on. Redeploy the **api** target so the secret reaches the server.

## Step 4 - confirm it is on

After both keys are set and deployed:

- Visit a page with a form (the contact form, or the patient registration page). You should see
  a small **reCAPTCHA badge in the bottom-right corner** of the page. That badge appearing is
  the sign the Site key is live.
- A genuine submission from a normal browser goes through as usual.
- A submission that scores very low (an automated/bot-like request) is **refused** with a
  "Verification failed. Please try again, or call us." message. Real patients essentially never
  hit this.

## If something looks wrong

- **No badge appears:** the Site key is probably still empty or not yet deployed. Re-check
  `RECAPTCHA_SITE_KEY` in `config.js` and that you rebuilt and redeployed the site.
- **Every submission is refused with "Verification failed":** the Site key and Secret key may be
  from different reCAPTCHA registrations, or the domain was not added in Step 2. They must be the
  two keys from the **same** setup, and `daynightdental.co.uk` (plus the `www` version) must be
  listed as domains.
- **"We could not process this right now, please call us":** the server could not reach Google
  to verify. This is deliberately fail-closed (we would rather ask the patient to call than let
  an unverified submission through). It should be rare and clears itself once Google is
  reachable again.

Remember: to switch reCAPTCHA **off** again, simply clear `DND_RECAPTCHA_SECRET` (unset the
environment variable) and redeploy the api target. The forms keep working with the rest of the
anti-abuse stack still in place.
