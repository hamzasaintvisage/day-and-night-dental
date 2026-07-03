#!/usr/bin/env python3
"""
Day Night Dental — Hostinger FTP deploy helper.

All secrets come from the environment, never from this file:
  FH  FTP host         FU  FTP user        FP  FTP password
  DND_RESEND_KEY       Resend API key (only needed for the `api` target, to render _config.php)
  DND_RECAPTCHA_SECRET Google reCAPTCHA v3 Secret key (OPTIONAL; when set + non-empty the `api`
                       target turns reCAPTCHA on. Unset/blank = protection off, form still works.)

Usage:
  FH=.. FU=.. FP=.. DND_RESEND_KEY=.. python3 hostinger/deploy.py api     # endpoint + config + .htaccess (incl. api/.htaccess)
  FH=.. FU=.. FP=.. python3 hostinger/deploy.py dist                       # ordered, pruned sync of the built dist/ tree
  FH=.. FU=.. FP=.. python3 hostinger/deploy.py htaccess                   # just the root .htaccess

The FTP user lands inside public_html (chrooted), so remote paths are relative to it.

Deploy-safety notes (the dist target):
  - Uploads non-HTML assets FIRST and HTML LAST, so a page never references a not-yet-uploaded
    hashed asset during the upload window.
  - Excludes dist/.vite (build manifests) from production. (dist/preview mockups are kept because the
    owner currently views them on production; they are noindex, so trimming them is an owner decision.)
  - Prunes STALE remote files using a manifest of the previous deploy (.deploy-manifest.json). This
    only ever deletes files THIS dist deploy previously created; it can never touch api/, cron/,
    _config.php or .htaccess (which are deployed by other targets and are absent from the manifest).
  - Runs a post-deploy HTTP smoke check on key routes and exits non-zero if any is not 200.
  True atomic swap is not possible over plain FTP on shared LiteSpeed; ordered upload + pruning +
  smoke check is the safe approximation. Rollback = rebuild the previous commit and redeploy.
"""
import os, sys, json
from ftplib import FTP_TLS, error_perm
from io import BytesIO
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

MANIFEST = ".deploy-manifest.json"          # remote record of the files this dist deploy owns
EXCLUDE_TOP = {".vite"}                     # never ship build manifests (preview mockups kept: owner uses them on prod, noindex)
SMOKE_ROUTES = ["", "treatments/", "treatments/invisalign/", "register-as-patient/", "blog/", "404.html"]
# Files that must NEVER be publicly readable. The smoke check demands non-200 for each;
# any 200 fails the deploy (recovery: rebuild the previous commit and redeploy — no auto-rollback).
BLOCKED_ROUTES = [".vite/manifest.json", ".vite/ssr-manifest.json", "api/_config.php"]
SITE = "https://daynightdental.co.uk/"

def connect():
    host, user, pw = os.environ.get("FH"), os.environ.get("FU"), os.environ.get("FP")
    if not (host and user and pw):
        sys.exit("FH, FU, FP must be set in the environment")
    # Explicit FTPS (AUTH TLS): encrypts the control channel (login/password) and, via prot_p(),
    # the data channel — so file contents incl. the rendered _config.php no longer cross in clear.
    ftp = FTP_TLS(); ftp.connect(host, 21, timeout=30); ftp.login(user, pw)
    ftp.prot_p()
    ftp.set_pasv(True)
    return ftp

def make_helpers(ftp):
    base = ftp.pwd()
    def reset(): ftp.cwd(base)
    def ensure_cd(dirpath):
        reset()
        for part in [p for p in dirpath.split("/") if p]:
            try: ftp.mkd(part)
            except error_perm: pass
            ftp.cwd(part)
    def put_file(local, remote):
        d, name = os.path.split(remote)
        ensure_cd(d) if d else reset()
        with open(local, "rb") as f:
            ftp.storbinary("STOR " + name, f)
        reset()
        print("  uploaded", remote)
    def put_bytes(content, remote):
        d, name = os.path.split(remote)
        ensure_cd(d) if d else reset()
        ftp.storbinary("STOR " + name, BytesIO(content))
        reset()
        print("  uploaded", remote, "(%d bytes)" % len(content))
    def rm(remote):
        d, name = os.path.split(remote)
        try:
            ensure_cd(d) if d else reset()
            ftp.delete(name)
            reset()
            print("  deleted stale", remote)
        except error_perm as e:
            reset()
            print("  (could not delete %s: %s)" % (remote, e))
    return reset, put_file, put_bytes, rm

def render_config():
    key = os.environ.get("DND_RESEND_KEY")
    if not key:
        sys.exit("DND_RESEND_KEY must be set to render _config.php")
    php = (
        "<?php\n"
        "// Day Night Dental secrets — generated at deploy, denied to the web, never committed.\n"
        "define('DND_RESEND_KEY', '%s');\n"
        "define('DND_SEND_FROM',  'Day Night Dental <bookings@daynightdental.co.uk>');\n"
        "define('DND_ENQUIRY_TO', 'reception@daynightdental.co.uk');\n"
        "define('DND_SITE',       'https://daynightdental.co.uk');\n"
        % key
    )
    # Google reCAPTCHA v3 secret: only emit the define() when the env var is present and
    # non-empty, so an unset/blank secret leaves reCAPTCHA OFF (the endpoint skips it) and the
    # form keeps working. The value is escaped so a stray quote can't break the generated PHP.
    recaptcha = os.environ.get("DND_RECAPTCHA_SECRET", "").strip()
    if recaptcha:
        php += "define('DND_RECAPTCHA_SECRET', '%s');\n" % recaptcha.replace("\\", "\\\\").replace("'", "\\'")
    return php.encode("utf-8")

def deploy_api(ftp):
    _, put_file, put_bytes, _ = make_helpers(ftp)
    print("Deploying endpoint + validation include + config + .htaccess ...")
    put_file(os.path.join(HERE, "api", "send-enquiry.php"), "api/send-enquiry.php")
    # the shared validation include is require()d by the endpoint — without it every POST 503s
    put_file(os.path.join(HERE, "api", "_validation.php"), "api/_validation.php")
    put_bytes(render_config(), "api/_config.php")
    # the api-directory .htaccess (denies _config.php, dotfiles, data files) MUST reach production
    api_ht = os.path.join(HERE, "api", ".htaccess")
    if os.path.isfile(api_ht):
        put_file(api_ht, "api/.htaccess")
    put_file(os.path.join(HERE, ".htaccess"), ".htaccess")

def deploy_htaccess(ftp):
    _, put_file, _, _ = make_helpers(ftp)
    print("Deploying .htaccess ...")
    put_file(os.path.join(HERE, ".htaccess"), ".htaccess")

def deploy_cron(ftp):
    _, put_file, _, _ = make_helpers(ftp)
    print("Deploying cron scripts ...")
    for name in ("purge-enquiries.php", "monitor.php", ".htaccess"):
        put_file(os.path.join(HERE, "cron", name), "cron/" + name)

def list_local_dist(dist):
    """All deployable files under dist/, excluding .vite + preview top-level dirs."""
    files = []
    for cur, dirs, fns in os.walk(dist):
        rel = os.path.relpath(cur, dist)
        parts = [] if rel == "." else rel.split(os.sep)
        if parts and parts[0] in EXCLUDE_TOP:
            dirs[:] = []
            continue
        for fn in fns:
            remote = fn if rel == "." else (rel.replace(os.sep, "/") + "/" + fn)
            files.append((os.path.join(cur, fn), remote))
    return files

def read_remote_manifest(ftp):
    buf = BytesIO()
    try:
        ftp.retrbinary("RETR " + MANIFEST, buf.write)
        return set(json.loads(buf.getvalue().decode("utf-8")))
    except (error_perm, json.JSONDecodeError):
        return set()  # first deploy, or no manifest yet

def head_status(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=25) as resp:
            return resp.status
    except Exception as e:
        return getattr(e, "code", "ERR")

def smoke_check():
    print("Smoke-checking key routes ...")
    ok = True
    for r in SMOKE_ROUTES:
        code = head_status(SITE + r)
        print("  %s  %s" % (code, SITE + r))
        if code != 200:
            ok = False
    # Negative checks: secrets/manifests must NOT be reachable. HEAD only — never print bodies.
    print("Verifying blocked routes are NOT public ...")
    for r in BLOCKED_ROUTES:
        code = head_status(SITE + r)
        verdict = "OK (blocked)" if code != 200 else "FAIL: PUBLICLY READABLE"
        print("  %s  %s  %s" % (code, SITE + r, verdict))
        if code == 200:
            ok = False
    return ok

def deploy_dist(ftp):
    reset, put_file, put_bytes, rm = make_helpers(ftp)
    dist = os.path.join(ROOT, "dist")
    if not os.path.isdir(dist):
        sys.exit("dist/ not found — run the build first")

    local = list_local_dist(dist)
    new_set = {remote for _, remote in local}
    prev = read_remote_manifest(ftp)

    # 1. Upload non-HTML (hashed assets, images, css, js, xml) FIRST, HTML LAST.
    local.sort(key=lambda x: x[1].endswith(".html"))
    print("Uploading %d files (assets first, HTML last), excluding %s ..." % (len(local), ", ".join(sorted(EXCLUDE_TOP))))
    for lp, remote in local:
        put_file(lp, remote)

    # 2. Record the new manifest so the NEXT deploy can prune what this one no longer ships.
    put_bytes(json.dumps(sorted(new_set), indent=0).encode("utf-8"), MANIFEST)

    # 3. Prune files the PREVIOUS deploy created that are no longer present. Manifest-scoped, so this
    #    can never delete api/, cron/, _config.php or .htaccess (they are not in the dist manifest).
    stale = sorted((prev - new_set) - {MANIFEST})
    if stale:
        print("Pruning %d stale file(s) ..." % len(stale))
        for remote in stale:
            rm(remote)
    else:
        print("No stale files to prune.")

    print("  %d files synced" % len(local))

    # 4. Post-deploy smoke check (live HTTP). Non-zero exit flags a bad release for the operator.
    if not smoke_check():
        sys.exit("DEPLOY SMOKE CHECK FAILED: one or more key routes did not return 200 — investigate before announcing the release.")

def deploy_hotfix(ftp):
    """Live-defect hotfix: block + remove the leaked .vite manifests. Deploys .htaccess first
    (the 403 rule), then deletes the stale .vite files (absent from the dist manifest, so the
    normal prune can never remove them), then verifies from outside that nothing is public."""
    reset, put_file, _, _ = make_helpers(ftp)
    print("HOTFIX 1/3: deploying .htaccess (contains the /.vite 403 rule) ...")
    put_file(os.path.join(HERE, ".htaccess"), ".htaccess")
    print("HOTFIX 2/3: deleting stale .vite files from the server ...")
    for name in ("manifest.json", "ssr-manifest.json"):
        try:
            reset(); ftp.cwd(".vite"); ftp.delete(name); reset()
            print("  deleted .vite/" + name)
        except error_perm as e:
            reset(); print("  (.vite/%s: %s)" % (name, e))
    try:
        reset(); ftp.rmd(".vite")
        print("  removed empty .vite/ directory")
    except error_perm as e:
        reset(); print("  (.vite dir: %s — fine if non-empty or already gone)" % e)
    print("HOTFIX 3/3: verifying from outside ...")
    if not smoke_check():
        sys.exit("HOTFIX VERIFICATION FAILED: a blocked route is still public or a key route broke.")

TARGETS = {"api": deploy_api, "dist": deploy_dist, "htaccess": deploy_htaccess, "cron": deploy_cron, "hotfix": deploy_hotfix}

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "api"
    if target not in TARGETS:
        sys.exit("unknown target %r; choose: %s" % (target, ", ".join(TARGETS)))
    ftp = connect()
    try:
        print("Connected, landing dir:", ftp.pwd())
        TARGETS[target](ftp)
        print("Done.")
    finally:
        ftp.quit()

if __name__ == "__main__":
    main()
