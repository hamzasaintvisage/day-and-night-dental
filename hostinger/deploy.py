#!/usr/bin/env python3
"""
Day Night Dental — Hostinger FTP deploy helper.

All secrets come from the environment, never from this file:
  FH  FTP host         FU  FTP user        FP  FTP password
  DND_RESEND_KEY   Resend API key (only needed for the `api` target, to render _config.php)

Usage:
  FH=.. FU=.. FP=.. DND_RESEND_KEY=.. python3 hostinger/deploy.py api     # endpoint + config + .htaccess
  FH=.. FU=.. FP=.. python3 hostinger/deploy.py dist                       # sync the built dist/ tree
  FH=.. FU=.. FP=.. python3 hostinger/deploy.py htaccess                   # just the .htaccess

The FTP user lands inside public_html (chrooted), so remote paths are relative to it.
"""
import os, sys
from ftplib import FTP_TLS, error_perm
from io import BytesIO

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

def connect():
    host, user, pw = os.environ.get("FH"), os.environ.get("FU"), os.environ.get("FP")
    if not (host and user and pw):
        sys.exit("FH, FU, FP must be set in the environment")
    # Explicit FTPS (AUTH TLS, same port 21 + credentials Hostinger already uses): encrypts the
    # control channel (login/password) and, via prot_p(), the data channel — so file contents
    # incl. the rendered _config.php (which holds the Resend key) no longer cross the wire in clear.
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
    return reset, put_file, put_bytes

def render_config():
    key = os.environ.get("DND_RESEND_KEY")
    if not key:
        sys.exit("DND_RESEND_KEY must be set to render _config.php")
    return (
        "<?php\n"
        "// Day Night Dental secrets — generated at deploy, denied to the web, never committed.\n"
        "define('DND_RESEND_KEY', '%s');\n"
        "define('DND_SEND_FROM',  'Day Night Dental <bookings@daynightdental.co.uk>');\n"
        "define('DND_ENQUIRY_TO', 'reception@daynightdental.co.uk');\n"
        "define('DND_SITE',       'https://daynightdental.co.uk');\n"
        % key
    ).encode("utf-8")

def deploy_api(ftp):
    reset, put_file, put_bytes = make_helpers(ftp)
    print("Deploying endpoint + config + .htaccess ...")
    put_file(os.path.join(HERE, "api", "send-enquiry.php"), "api/send-enquiry.php")
    put_bytes(render_config(), "api/_config.php")
    put_file(os.path.join(HERE, ".htaccess"), ".htaccess")

def deploy_htaccess(ftp):
    reset, put_file, _ = make_helpers(ftp)
    print("Deploying .htaccess ...")
    put_file(os.path.join(HERE, ".htaccess"), ".htaccess")

def deploy_cron(ftp):
    reset, put_file, _ = make_helpers(ftp)
    print("Deploying cron scripts ...")
    for name in ("purge-enquiries.php", "monitor.php", ".htaccess"):
        put_file(os.path.join(HERE, "cron", name), "cron/" + name)

def deploy_dist(ftp):
    reset, put_file, _ = make_helpers(ftp)
    dist = os.path.join(ROOT, "dist")
    if not os.path.isdir(dist):
        sys.exit("dist/ not found — run the build first")
    print("Syncing dist/ ...")
    n = 0
    for cur, _dirs, files in os.walk(dist):
        rel = os.path.relpath(cur, dist)
        for fn in files:
            remote = fn if rel == "." else (rel.replace(os.sep, "/") + "/" + fn)
            put_file(os.path.join(cur, fn), remote)
            n += 1
    print("  %d files synced" % n)

TARGETS = {"api": deploy_api, "dist": deploy_dist, "htaccess": deploy_htaccess, "cron": deploy_cron}

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
