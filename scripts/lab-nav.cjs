#!/usr/bin/env node
/* In-preview navigator. Scans public/preview, writes a shared /preview/_nav.js (manifest + UI)
   and injects <script src="/preview/_nav.js?v=HASH"> into every preview page. The UI adds
   Prev / Next + a grouped "Browse" jump-menu into each page's .lab-top bar (arrow keys too).
   Source dir optional (default public/preview). */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '..', 'public', 'preview');
const labels = {
  'real-smiles': 'Real Smiles', 'registration': 'New Patients', 'where-we-serve': 'Where We Are',
  'team': 'The Practitioners', 'faq': 'Common Questions', 'book': 'Book Appointment',
  'about': "Why We're Different", 'journey': 'When You Call', 'treatments': 'Our Treatments',
};
const order = ['real-smiles', 'registration', 'where-we-serve', 'team', 'faq', 'book', 'about', 'journey', 'treatments'];
const EVOLVED = new Set(['where-we-serve', 'book', 'registration']);

const dirs = fs.readdirSync(SRC).filter((d) => { if (d === 'icons' || d.startsWith('_')) return false; try { return fs.statSync(path.join(SRC, d)).isDirectory(); } catch (e) { return false; } });
const secs = [...new Set([...order.filter((o) => dirs.includes(o)), ...dirs])];

const meta = (sec, f) => {
  const html = fs.readFileSync(path.join(SRC, sec, f), 'utf8').slice(0, 60000);
  const m = (html.match(/class="lab-meta"[\s\S]*?(?=<\/div>\s*<span)/) || [html])[0];
  const name = (m.match(/<b>([^<]+)<\/b>/) || [])[1] || f.replace(/-/g, ' ').replace('.html', '');
  const rankRaw = ((m.match(/lab-rank">#?([^<]+)</) || [])[1] || '').trim();
  return { name: name.trim(), isNew: rankRaw.toUpperCase() === 'NEW', rank: /^\d+$/.test(rankRaw) ? +rankRaw : 99 };
};

const D = [];
secs.forEach((sec) => {
  const items = fs.readdirSync(path.join(SRC, sec)).filter((f) => f.endsWith('.html')).map((f) => {
    const mm = meta(sec, f);
    return { s: sec, sl: f.replace('.html', ''), n: mm.name, sec: labels[sec] || sec, isNew: mm.isNew, rank: mm.rank };
  });
  items.sort((a, b) => (a.isNew === b.isNew ? (a.rank - b.rank || a.n.localeCompare(b.n)) : (a.isNew ? -1 : 1)));
  items.forEach((e) => D.push({ s: e.s, sl: e.sl, n: e.n, sec: e.sec, u: '/preview/' + e.s + '/' + e.sl + '.html', nw: e.isNew ? 1 : 0 }));
});

// ---- the in-page UI (serialized to the shared script; references window.__DN_NAV) ----
function NAV_UI() {
  var D = window.__DN_NAV || [];
  if (!D.length) return;
  var bar = document.querySelector('.lab-top');
  if (!bar) return;
  var p = location.pathname;
  var cur = -1;
  for (var i = 0; i < D.length; i++) { if (p === D[i].u || p.slice(-D[i].u.length) === D[i].u) { cur = i; break; } }

  var css = '.dnnav{display:flex;align-items:center;gap:.4rem;flex:0 0 auto;}'
    + '.dnnav-b{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1px solid var(--dn-mist,rgba(255,255,255,.1));background:rgba(255,255,255,.03);color:var(--dn-bone-dim,rgba(255,255,255,.72));font-size:1.15rem;line-height:1;cursor:pointer;transition:.15s;-webkit-appearance:none;}'
    + '.dnnav-b:hover{color:#fff;border-color:var(--dn-day,#f8c760);}'
    + '.dnnav-pos{display:inline-flex;align-items:center;gap:.45rem;height:30px;padding:0 .7rem;border-radius:8px;border:1px solid var(--dn-mist,rgba(255,255,255,.1));background:rgba(255,255,255,.03);color:var(--dn-bone-dim,rgba(255,255,255,.72));font-size:.72rem;letter-spacing:.05em;cursor:pointer;font-family:inherit;white-space:nowrap;}'
    + '.dnnav-pos b{color:var(--dn-day,#f8c760);font-weight:600;}'
    + '.dnnav-pos svg{width:12px;height:12px;transition:transform .2s;}'
    + '.dnnav-pos[aria-expanded="true"] svg{transform:rotate(180deg);}'
    + '.dnnav-pos:hover{color:#fff;border-color:var(--dn-day,#f8c760);}'
    + '.dnnav-panel{position:fixed;z-index:200;width:300px;max-height:74vh;overflow-y:auto;background:#121218;border:1px solid var(--dn-mist,rgba(255,255,255,.1));border-radius:14px;padding:8px;box-shadow:0 30px 70px -20px rgba(0,0,0,.85);}'
    + '.dnnav-panel[hidden]{display:none;}'
    + '.dnnav-grp{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dn-bone-faint,rgba(255,255,255,.5));padding:11px 10px 5px;position:sticky;top:0;background:#121218;}'
    + '.dnnav-i{display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:9px 10px;border-radius:9px;color:var(--dn-bone-dim,rgba(255,255,255,.72));text-decoration:none;font-size:.85rem;}'
    + '.dnnav-i:hover{background:rgba(255,255,255,.05);color:#fff;}'
    + '.dnnav-i.on{background:rgba(248,199,96,.12);color:var(--dn-day,#f8c760);}'
    + '.dnnav-i .nw{font-size:.54rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#0a0a0c;background:var(--dn-day,#f8c760);border-radius:999px;padding:1px 6px;flex:0 0 auto;}'
    + '@media(max-width:520px){.dnnav-panel{left:10px;right:10px;width:auto;}.dnnav-pos b{display:none;}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var wrap = bar.querySelector(':scope > span:last-child');
  if (!wrap || wrap.className === 'lab-meta' || wrap.querySelector) { /* keep */ }
  if (!wrap) { wrap = document.createElement('span'); bar.appendChild(wrap); }
  wrap.className = 'dnnav';
  var posLabel = cur > -1 ? ('<b>' + (cur + 1) + '</b> / ' + D.length) : 'Browse';
  wrap.innerHTML = ''
    + '<button class="dnnav-b" id="dnnav-prev" title="Previous design (left arrow)" aria-label="Previous design">‹</button>'
    + '<button class="dnnav-pos" id="dnnav-browse" aria-haspopup="true" aria-expanded="false">' + posLabel
    + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></button>'
    + '<button class="dnnav-b" id="dnnav-next" title="Next design (right arrow)" aria-label="Next design">›</button>';

  var panel = document.createElement('div');
  panel.className = 'dnnav-panel'; panel.id = 'dnnav-panel'; panel.hidden = true;
  panel.setAttribute('role', 'menu');
  var html = '', lastSec = '';
  for (var j = 0; j < D.length; j++) {
    var d = D[j];
    if (d.sec !== lastSec) { html += '<div class="dnnav-grp">' + d.sec + '</div>'; lastSec = d.sec; }
    html += '<a class="dnnav-i' + (j === cur ? ' on' : '') + '" role="menuitem" href="' + d.u + '">' + d.n + (d.nw ? '<span class="nw">New</span>' : '') + '</a>';
  }
  panel.innerHTML = html;
  document.body.appendChild(panel);

  var go = function (i) { if (i < 0) i = D.length - 1; if (i >= D.length) i = 0; location.href = D[i].u; };
  var prev = document.getElementById('dnnav-prev');
  var next = document.getElementById('dnnav-next');
  var browse = document.getElementById('dnnav-browse');
  if (prev) prev.addEventListener('click', function () { go(cur - 1); });
  if (next) next.addEventListener('click', function () { go(cur + 1); });
  var place = function () { var r = bar.getBoundingClientRect(); panel.style.top = (r.bottom + 6) + 'px'; panel.style.right = '12px'; };
  var openP = function () { place(); panel.hidden = false; browse.setAttribute('aria-expanded', 'true'); var on = panel.querySelector('.dnnav-i.on'); if (on) on.scrollIntoView({ block: 'center' }); };
  var closeP = function () { panel.hidden = true; browse.setAttribute('aria-expanded', 'false'); };
  if (browse) browse.addEventListener('click', function (e) { e.stopPropagation(); panel.hidden ? openP() : closeP(); });
  document.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target) && e.target !== browse) closeP(); });
  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Escape') { closeP(); }
    else if (cur > -1 && e.key === 'ArrowLeft') { go(cur - 1); }
    else if (cur > -1 && e.key === 'ArrowRight') { go(cur + 1); }
  });
}

const body = 'window.__DN_NAV=' + JSON.stringify(D) + ';\n;(' + NAV_UI.toString() + ')();\n';
fs.writeFileSync(path.join(SRC, '_nav.js'), body);
const ver = crypto.createHash('sha1').update(body).digest('hex').slice(0, 10);
const tag = '<script src="/preview/_nav.js?v=' + ver + '" defer></script>';

let injected = 0;
secs.forEach((sec) => {
  fs.readdirSync(path.join(SRC, sec)).filter((f) => f.endsWith('.html')).forEach((f) => {
    const fp = path.join(SRC, sec, f);
    let h = fs.readFileSync(fp, 'utf8');
    if (!/<div class="lab-top"/.test(h)) return; // only pages with the lab bar
    h = h.replace(/\s*<script src="\/preview\/_nav\.js[^"]*"[^>]*><\/script>/g, ''); // drop any prior tag
    if (/<\/body>/i.test(h)) h = h.replace(/<\/body>/i, tag + '\n</body>');
    else h += '\n' + tag + '\n';
    fs.writeFileSync(fp, h);
    injected++;
  });
});

console.log('lab-nav: manifest ' + D.length + ' designs -> _nav.js (v' + ver + '); injected into ' + injected + ' pages');
