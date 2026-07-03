/* Prev/Next navigator injected into each register-form design page.
   Full-page navigation (no iframe): clicking Next just loads the next design.
   Wraps around, supports left/right arrow keys, and pushes page content down
   so the fixed bar never covers anything. */
(function () {
  var D = [
    ['01-evolved.html', 'The Evolved Form'],
    ['02-the-atrium.html', 'The Atrium'],
    ['03-concierge-letter.html', 'The Concierge Letter'],
    ['04-split-stage.html', 'The Split Stage'],
    ['05-reception-desk.html', 'The Reception Desk'],
    ['06-thirty-seconds.html', 'Thirty Seconds'],
    ['07-gold-slab.html', 'The Gold Slab'],
    ['08-night-watch.html', 'Night Watch'],
    ['09-the-ledger.html', 'The Ledger'],
    ['10-quiet-card.html', 'The Quiet Card'],
    ['11-two-column-grid.html', 'The Grid'],
    ['12-welcome-threshold.html', 'The Welcome Threshold'],
    ['13-reception-hybrid.html', 'Reception Desk + Headline (hybrid)'],
    ['14-reception-native.html', 'Reception Native (site context)']
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
    // hide the tiny "DESIGN: X" corner tag (its name is now in the bar)
    var d = document.querySelectorAll('div');
    for (var j = 0; j < d.length; j++) {
      if (d[j] !== bar && d[j].children.length === 0 && /^DESIGN:/.test((d[j].textContent || '').trim())) d[j].style.display = 'none';
    }
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
