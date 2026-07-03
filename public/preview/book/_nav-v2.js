/* Prev/Next navigator for the Round 2 booking mockups (the 12 v2-*.html designs).
   Full-page navigation: Next/Prev load the next/previous design, wrapping around.
   Left/right arrow keys work too. Pushes page content down so the fixed bar never
   covers anything. "All" returns to the gallery index. */
(function () {
  var D = [
    ['v2-01-map-split-left.html', 'Map Split Left'],
    ['v2-02-map-hero-banner.html', 'Map Hero Banner'],
    ['v2-03-front-desk-console.html', 'Front Desk Console'],
    ['v2-04-map-inset-card.html', 'Map Inset Card'],
    ['v2-05-night-switchboard.html', 'Night Switchboard'],
    ['v2-06-the-atrium.html', 'The Atrium'],
    ['v2-07-two-column-ledger.html', 'Two-Column Ledger'],
    ['v2-08-gold-slab-map.html', 'Gold Slab Map'],
    ['v2-09-concierge-letter.html', 'Concierge Letter'],
    ['v2-10-the-split-stage.html', 'The Split Stage'],
    ['v2-11-map-forward.html', 'Map Forward'],
    ['v2-12-the-monogram.html', 'The Monogram']
  ];
  var file = (location.pathname.split('/').pop() || '').split('?')[0].split('#')[0];
  var i = 0;
  for (var k = 0; k < D.length; k++) { if (D[k][0] === file) { i = k; break; } }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function go(step) { location.href = D[(i + step + D.length) % D.length][0]; }

  var H = 52;
  var bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;right:0;height:' + H + 'px;display:flex;align-items:center;gap:10px;padding:0 12px;background:rgba(10,10,12,.97);border-bottom:1px solid rgba(255,255,255,.12);z-index:2147483647;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-sizing:border-box;';

  function skin(el, primary) {
    el.style.cssText = 'font:600 13px/1 "Inter Tight",-apple-system,system-ui,sans-serif;color:' + (primary ? '#0a0a0c' : '#fff') + ';background:' + (primary ? '#f8c760' : '#1b1b22') + ';border:1px solid ' + (primary ? '#f8c760' : 'rgba(255,255,255,.16)') + ';border-radius:100px;padding:10px 17px;cursor:pointer;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;';
  }
  var all = document.createElement('a'); all.href = 'index.html'; all.textContent = '▦ All'; skin(all, false);
  var prev = document.createElement('button'); prev.textContent = '◀ Prev'; skin(prev, false); prev.onclick = function () { go(-1); };
  var label = document.createElement('div');
  label.style.cssText = 'flex:1;text-align:center;color:#fff;font:600 14px/1.2 "Inter Tight",-apple-system,system-ui,sans-serif;';
  label.innerHTML = '<b style="font-family:Fraunces,Georgia,serif;font-weight:600">' + D[i][1] + '</b><span style="color:rgba(255,255,255,.5);font-size:12px;margin-left:8px;letter-spacing:.05em">· ' + pad(i + 1) + ' / ' + D.length + '</span>';
  var next = document.createElement('button'); next.textContent = 'Next ▶'; skin(next, true); next.onclick = function () { go(1); };

  bar.appendChild(all); bar.appendChild(prev); bar.appendChild(label); bar.appendChild(next);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') go(-1); else if (e.key === 'ArrowRight') go(1);
  });

  function mount() {
    document.body.appendChild(bar);
    var cur = parseInt(getComputedStyle(document.body).paddingTop, 10) || 0;
    document.body.style.paddingTop = (cur + H) + 'px';
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
