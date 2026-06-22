#!/usr/bin/env node
/* Generates the Design Lab index. Clean + organised: a sticky section nav to jump around,
   numbered section headers, and per section a clearly-labelled "New this round" block + an
   "Evolved/Existing" block. Source dir optional (default public/preview); writes <src>/index.html. */
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '..', 'public', 'preview');
const labels = {
  'real-smiles': 'Real Smiles', 'registration': 'New Patients', 'where-we-serve': 'Where We Are',
  'team': 'The Practitioners', 'faq': 'Common Questions', 'book': 'Book Appointment',
  'about': "Why We're Different", 'journey': 'When You Call', 'treatments': 'Our Treatments',
};
const order = ['real-smiles', 'registration', 'where-we-serve', 'team', 'faq', 'book', 'about', 'journey', 'treatments'];
const EVOLVED = new Set(['where-we-serve', 'book', 'registration']); // sections whose existing previews were evolved this round
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const dirs = fs.readdirSync(SRC).filter((d) => { try { return fs.statSync(path.join(SRC, d)).isDirectory(); } catch (e) { return false; } });
const secs = [...new Set([...order.filter((o) => dirs.includes(o)), ...dirs])];

const read = (sec) => fs.readdirSync(path.join(SRC, sec)).filter((f) => f.endsWith('.html')).map((f) => {
  // Read enough to reach the .lab-top bar in <body>; heavy form-kit pages push it well past the first KB.
  const html = fs.readFileSync(path.join(SRC, sec, f), 'utf8').slice(0, 60000);
  const meta = (html.match(/class="lab-meta"[\s\S]*?(?=<\/div>\s*<span)/) || [html])[0]; // the bar's meta block only
  const name = (meta.match(/<b>([^<]+)<\/b>/) || [])[1] || f.replace(/-/g, ' ').replace('.html', '');
  const lens = (meta.match(/lab-lens">([^<]+)</) || [])[1] || '';
  const rankRaw = ((meta.match(/lab-rank">#?([^<]+)</) || [])[1] || '').trim();
  return { slug: f.replace('.html', ''), name: name.trim(), lens: lens.trim(), isNew: rankRaw.toUpperCase() === 'NEW', rank: /^\d+$/.test(rankRaw) ? +rankRaw : 99, winner: /lab-win/.test(html) };
});

let total = 0, nav = '', blocks = '';
secs.forEach((sec, i) => {
  const items = read(sec); total += items.length;
  const num = String(i + 1).padStart(2, '0');
  nav += `<a href="#${sec}">${esc(labels[sec] || sec)} <span>${items.length}</span></a>`;
  const card = (e) => `<a class="card${e.isNew ? ' isnew' : ''}" href="/preview/${sec}/${e.slug}.html">
    <div class="ctop">${e.isNew ? '<span class="b new">New</span>' : ''}${e.lens ? `<span class="lens">${esc(e.lens)}</span>` : ''}</div>
    <div class="nm">${esc(e.name)}</div><div class="go">Open →</div></a>`;
  const news = items.filter((e) => e.isNew).sort((a, b) => a.name.localeCompare(b.name));
  const old = items.filter((e) => !e.isNew).sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name));
  let body = '';
  if (news.length) body += `<div class="band new"><span class="dotg"></span>New this round <i>${news.length}</i></div><div class="grid">${news.map(card).join('')}</div>`;
  if (old.length) body += `<div class="band">${EVOLVED.has(sec) ? 'Evolved' : 'Existing'} <i>${old.length}</i></div><div class="grid">${old.map(card).join('')}</div>`;
  blocks += `<section class="grp" id="${sec}"><div class="ghead"><span class="gnum">${num}</span><h2>${esc(labels[sec] || sec)}</h2><span class="gcnt">${items.length} designs</span></div>${body}</section>`;
});

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Design Lab · Day Night Dental</title>
<style>
@font-face{font-family:'Fraunces';src:url('/fonts/fraunces.woff2') format('woff2');font-weight:100 900;font-display:swap;}
@font-face{font-family:'Inter Tight';src:url('/fonts/inter-tight.woff2') format('woff2');font-weight:100 900;font-display:swap;}
:root{--day:#f8c760;--night:#4590ec;--nb:#0a0a0c;--card:#101015;--bone:#fff;--dim:rgba(255,255,255,.72);--faint:rgba(255,255,255,.48);--mist:rgba(255,255,255,.1);--disp:'Fraunces',Georgia,serif;--body:'Inter Tight',system-ui,sans-serif;}
*{box-sizing:border-box;}html{scroll-behavior:smooth;scroll-padding-top:84px;}
body{margin:0;background:var(--nb);color:var(--bone);font-family:var(--body);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
.nav{position:sticky;top:0;z-index:50;display:flex;gap:.5rem;overflow-x:auto;padding:12px clamp(1rem,4vw,2.5rem);background:rgba(10,10,12,.9);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid var(--mist);scrollbar-width:none;}
.nav::-webkit-scrollbar{display:none;}
.nav a{flex:none;display:inline-flex;align-items:center;gap:.4rem;padding:6px 13px;border-radius:999px;border:1px solid var(--mist);color:var(--dim);text-decoration:none;font-size:.8rem;white-space:nowrap;transition:.2s;}
.nav a:hover{color:var(--bone);border-color:color-mix(in srgb,var(--day) 60%,transparent);}
.nav a span{font-size:.66rem;color:var(--faint);}
.wrap{max-width:1200px;margin:0 auto;padding:clamp(2.5rem,6vw,4.5rem) clamp(1rem,4vw,2.5rem) 7rem;}
.ey{display:inline-flex;align-items:center;gap:9px;padding:7px 16px;border-radius:999px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--day);}
.ey::before{content:'';width:7px;height:7px;border-radius:50%;background:currentColor;}
h1{font-family:var(--disp);font-weight:600;font-size:clamp(2.3rem,5.6vw,3.6rem);line-height:1.06;margin:1.2rem 0 .7rem;}h1 em{font-style:normal;color:var(--day);}
.lead{color:var(--dim);max-width:640px;margin:0 0 3.5rem;}
.grp{margin:0 0 4.5rem;}
.ghead{display:flex;align-items:baseline;gap:1rem;padding-bottom:1rem;margin-bottom:1.6rem;border-bottom:1px solid var(--mist);}
.gnum{font-family:var(--disp);font-weight:700;color:var(--day);font-size:1.1rem;font-variant-numeric:tabular-nums;}
.ghead h2{font-family:var(--disp);font-weight:600;font-size:clamp(1.6rem,3vw,2.2rem);margin:0;flex:1;}
.gcnt{color:var(--faint);font-size:.82rem;}
.band{display:flex;align-items:center;gap:.6rem;font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--faint);margin:2rem 0 1rem;}
.band i{font-style:normal;font-size:.62rem;border:1px solid var(--mist);border-radius:999px;padding:1px 8px;}
.band.new{color:var(--day);}.band.new i{border-color:color-mix(in srgb,var(--day) 40%,transparent);}
.dotg{width:7px;height:7px;border-radius:50%;background:var(--day);box-shadow:0 0 10px var(--day);}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:14px;}
.card{display:flex;flex-direction:column;gap:.6rem;padding:1.35rem 1.4rem 1.2rem;border:1px solid var(--mist);border-radius:16px;background:var(--card);text-decoration:none;color:inherit;min-height:128px;transition:border-color .25s,box-shadow .25s,transform .25s;}
.card:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--day) 65%,transparent);box-shadow:0 0 0 1px color-mix(in srgb,var(--day) 45%,transparent),0 14px 30px -16px color-mix(in srgb,var(--day) 50%,transparent);}
.card.isnew{border-color:color-mix(in srgb,var(--day) 30%,transparent);}
.ctop{display:flex;align-items:center;gap:.45rem;flex-wrap:wrap;}
.b{font-size:.56rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:2px 8px;}
.b.new{color:#0a0a0c;background:var(--day);}
.b.evo{color:#9cc2f5;border:1px solid color-mix(in srgb,var(--night) 50%,transparent);}
.b.og{color:var(--faint);border:1px solid var(--mist);}
.b.win{color:var(--day);border:1px solid color-mix(in srgb,var(--day) 50%,transparent);padding:1px 7px;}
.lens{font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);}
.nm{font-family:var(--disp);font-weight:600;font-size:1.18rem;line-height:1.15;margin-top:auto;}
.go{color:var(--day);font-size:.76rem;font-weight:600;}
</style></head><body>
<nav class="nav">${nav}</nav>
<div class="wrap">
<span class="ey">Design Lab</span>
<h1>${total} ways to build the <em>homepage</em></h1>
<p class="lead">Jump to any section above. Each one is split into <strong style="color:var(--day)">New this round</strong> and <strong style="color:var(--bone)">Evolved</strong> (the originals, upgraded). Tap a card to open it full-page.</p>
${blocks}
</div></body></html>`;

fs.writeFileSync(path.join(SRC, 'index.html'), html);
console.log('lab index (clean): ' + total + ' designs, ' + secs.length + ' sections -> ' + path.join(SRC, 'index.html'));
