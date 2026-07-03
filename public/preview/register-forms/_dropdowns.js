/* Turns every native <select> in the register-form previews into a real on-brand
   dark dropdown, and fills the date-of-birth day/month/year selects with their
   COMPLETE option sets. Native <select> popups can't be dark-styled, so we build a
   custom control and keep the underlying <select> in sync (hidden) for its value.
   Shared across all 12 designs. */
(function () {
  if (window.__rfDD) return; window.__rfDD = true;

  var DAYS = []; for (var d = 1; d <= 31; d++) DAYS.push(String(d));
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var YEARS = []; for (var y = 2026; y >= 1920; y--) YEARS.push(String(y));

  var css = document.createElement('style');
  css.textContent = [
    '.rf-dd{position:relative;width:100%;box-sizing:border-box;}',
    '.rf-dd-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;cursor:pointer;box-sizing:border-box;',
      'text-align:left;background:#14141a;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:.82rem .95rem;',
      'font:400 1rem/1.2 "Inter Tight",-apple-system,system-ui,sans-serif;transition:border-color .2s,box-shadow .2s;}',
    '.rf-dd-trigger:hover{border-color:rgba(248,199,96,.5);}',
    '.rf-dd.open .rf-dd-trigger{border-color:#f8c760;box-shadow:0 0 0 2px rgba(248,199,96,.3);}',
    '.rf-dd-val{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
    '.rf-dd-val.ph{color:rgba(255,255,255,.45);}',
    '.rf-dd-chev{flex:none;width:9px;height:9px;border-right:2px solid #f8c760;border-bottom:2px solid #f8c760;transform:rotate(45deg);margin-top:-3px;transition:transform .2s;}',
    '.rf-dd.open .rf-dd-chev{transform:rotate(-135deg);margin-top:2px;}',
    '.rf-dd-list{position:absolute;top:calc(100% + 6px);left:0;right:0;z-index:99999;max-height:264px;overflow-y:auto;',
      'background:#14141a;border:1px solid rgba(248,199,96,.35);border-radius:10px;box-shadow:0 22px 54px -14px rgba(0,0,0,.85);padding:6px;display:none;}',
    '.rf-dd.open .rf-dd-list{display:block;}',
    '.rf-dd-opt{padding:10px 12px;border-radius:7px;cursor:pointer;color:#fff;',
      'font:400 15px/1.2 "Inter Tight",-apple-system,system-ui,sans-serif;white-space:nowrap;}',
    '.rf-dd-opt:hover,.rf-dd-opt.active{background:rgba(248,199,96,.14);color:#f8c760;}',
    '.rf-dd-opt.sel{color:#f8c760;}',
    '.rf-dd-list::-webkit-scrollbar{width:11px;}',
    '.rf-dd-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:10px;border:3px solid #14141a;}'
  ].join('');
  document.head.appendChild(css);

  function kindOf(sel) {
    var texts = Array.prototype.map.call(sel.options, function (o) { return (o.text || '').trim(); });
    var f = (texts[0] || '').toLowerCase();
    if (f === 'day' || f === 'dd') return 'day';
    if (f === 'month' || f === 'mm') return 'month';
    if (f === 'year' || f === 'yyyy') return 'year';
    var joined = texts.join(' ').toLowerCase();
    if (/january|february|december/.test(joined)) return 'month';
    var nums = texts.slice(1).filter(function (t) { return /^\d+$/.test(t); }).map(Number);
    if (nums.length) { var mx = Math.max.apply(null, nums); if (mx <= 31) return 'day'; if (mx > 1900) return 'year'; }
    return 'other';
  }

  function completeOptions(sel) {
    var kind = kindOf(sel);
    var list = kind === 'day' ? DAYS : kind === 'month' ? MONTHS : kind === 'year' ? YEARS : null;
    if (!list) return;
    var phText = sel.options.length ? sel.options[0].text : null;
    var phIsPlaceholder = sel.options.length && (sel.options[0].value === '' || /^(day|month|year|dd|mm|yyyy)$/i.test((sel.options[0].text || '').trim()));
    var expected = list.length + (phIsPlaceholder ? 1 : 0);
    if (sel.options.length >= expected) return; // already complete
    sel.innerHTML = '';
    if (phIsPlaceholder) { var o0 = document.createElement('option'); o0.value = ''; o0.textContent = phText; sel.appendChild(o0); }
    list.forEach(function (t, idx) {
      var o = document.createElement('option');
      o.value = kind === 'month' ? String(idx + 1) : t;
      o.textContent = t;
      sel.appendChild(o);
    });
    sel.selectedIndex = 0;
  }

  function copyBox(sel, trigger) {
    try {
      var cs = getComputedStyle(sel);
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') trigger.style.backgroundColor = cs.backgroundColor;
      if (cs.color) trigger.style.color = cs.color;
      if (parseFloat(cs.borderTopWidth) > 0) trigger.style.border = cs.borderTopWidth + ' ' + cs.borderTopStyle + ' ' + cs.borderTopColor;
      if (cs.borderTopLeftRadius) trigger.style.borderRadius = cs.borderTopLeftRadius;
      trigger.style.padding = cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft;
      if (cs.fontSize) trigger.style.fontSize = cs.fontSize;
      if (cs.minHeight && cs.minHeight !== '0px') trigger.style.minHeight = cs.minHeight;
    } catch (e) {}
  }

  function enhance(sel) {
    if (sel.getAttribute('data-rf-dd')) return;
    sel.setAttribute('data-rf-dd', '1');
    completeOptions(sel);

    var dd = document.createElement('div'); dd.className = 'rf-dd';
    var trigger = document.createElement('button'); trigger.type = 'button'; trigger.className = 'rf-dd-trigger';
    var val = document.createElement('span'); val.className = 'rf-dd-val';
    var chev = document.createElement('span'); chev.className = 'rf-dd-chev';
    trigger.appendChild(val); trigger.appendChild(chev);
    var list = document.createElement('div'); list.className = 'rf-dd-list';

    function refreshVal() {
      var opt = sel.options[sel.selectedIndex];
      var isPh = !opt || opt.value === '';
      val.textContent = opt ? opt.text : '';
      val.className = 'rf-dd-val' + (isPh ? ' ph' : '');
    }

    Array.prototype.forEach.call(sel.options, function (opt, idx) {
      if (opt.value === '' && idx === 0) return; // skip the placeholder in the list
      var o = document.createElement('div'); o.className = 'rf-dd-opt'; o.textContent = opt.text;
      if (idx === sel.selectedIndex) o.classList.add('sel');
      o.addEventListener('click', function () {
        sel.selectedIndex = idx;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        list.querySelectorAll('.rf-dd-opt').forEach(function (x) { x.classList.remove('sel'); });
        o.classList.add('sel');
        refreshVal(); close();
      });
      list.appendChild(o);
    });

    function open() { dd.classList.add('open'); document.addEventListener('mousedown', outside); var s = list.querySelector('.sel'); if (s) s.scrollIntoView({ block: 'nearest' }); }
    function close() { dd.classList.remove('open'); document.removeEventListener('mousedown', outside); }
    function outside(e) { if (!dd.contains(e.target)) close(); }
    trigger.addEventListener('click', function () { dd.classList.contains('open') ? close() : open(); });
    trigger.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    copyBox(sel, trigger);
    refreshVal();
    sel.style.display = 'none';
    sel.parentNode.insertBefore(dd, sel.nextSibling);
    dd.appendChild(trigger); dd.appendChild(list);
  }

  function run() { Array.prototype.forEach.call(document.querySelectorAll('select'), enhance); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
