/* Prev/Next among the live redesigned-panel previews (separate from the main set). */
(function () {
  var D = [
    ['04-panel-sp.html', 'The Spotlit Stage'],
    ['04-panel-fo.html', 'Gold Foil and Grain'],
    ['04-panel-gl.html', 'Layered Glass'],
    ['04-panel-de.html', 'The Deep Editorial'],
    ['04-panel-wd.html', 'Warm and Dimensional']
  ];
  var file = (location.pathname.split('/').pop() || '').split('?')[0].split('#')[0];
  var i = 0; for (var k = 0; k < D.length; k++) { if (D[k][0] === file) { i = k; break; } }
  function pad(n){ return (n<10?'0':'')+n; }
  function go(step){ location.href = D[(i+step+D.length)%D.length][0]; }
  var H=52, bar=document.createElement('div');
  bar.style.cssText='position:fixed;top:0;left:0;right:0;height:'+H+'px;display:flex;align-items:center;gap:10px;padding:0 12px;background:rgba(10,10,12,.97);border-bottom:1px solid rgba(255,255,255,.12);z-index:2147483647;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-sizing:border-box;';
  function skin(el,primary){ el.style.cssText='font:600 13px/1 "Inter Tight",system-ui,sans-serif;color:'+(primary?'#0a0a0c':'#fff')+';background:'+(primary?'#f8c760':'#1b1b22')+';border:1px solid '+(primary?'#f8c760':'rgba(255,255,255,.16)')+';border-radius:100px;padding:10px 17px;cursor:pointer;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;'; }
  var all=document.createElement('a'); all.href='index.html'; all.textContent='▦ All designs'; skin(all,false);
  var prev=document.createElement('button'); prev.textContent='◀ Prev'; skin(prev,false); prev.onclick=function(){go(-1);};
  var label=document.createElement('div'); label.style.cssText='flex:1;text-align:center;color:#fff;font:600 14px/1.2 "Inter Tight",system-ui,sans-serif;';
  label.innerHTML='<span style="color:#f8c760;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-right:8px;">Live panel</span><b style="font-family:Fraunces,Georgia,serif;font-weight:600">'+D[i][1]+'</b><span style="color:rgba(255,255,255,.5);font-size:12px;margin-left:8px;">· '+pad(i+1)+' / '+D.length+'</span>';
  var next=document.createElement('button'); next.textContent='Next ▶'; skin(next,true); next.onclick=function(){go(1);};
  bar.appendChild(all); bar.appendChild(prev); bar.appendChild(label); bar.appendChild(next);
  document.addEventListener('keydown',function(e){ if(e.key==='ArrowLeft')go(-1); else if(e.key==='ArrowRight')go(1); });
  function mount(){ document.body.appendChild(bar); var cur=parseInt(getComputedStyle(document.body).paddingTop,10)||0; document.body.style.paddingTop=(cur+H)+'px';
    var d=document.querySelectorAll('div'); for(var j=0;j<d.length;j++){ if(d[j]!==bar && d[j].children.length===0 && /^DESIGN:/.test((d[j].textContent||'').trim())) d[j].style.display='none'; } }
  if(document.body) mount(); else document.addEventListener('DOMContentLoaded',mount);
})();
