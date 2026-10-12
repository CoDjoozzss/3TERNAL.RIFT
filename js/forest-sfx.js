window.forestSfx=function(k){try{if(!(Number(settings.sound)>0))return;const c=AUD.ctx;if(!c||c.state!=='running')return;const n=performance.now();if(n-(forestSfx.l||0)<45)return;forestSfx.l=n;
 if(k==='tok'){aTone({f:220,f2:150,t:.09,w:'triangle',v:.22});aNoise({f:900,t:.04,ft:'bandpass',v:.12})}
 else if(k==='leaf'){aNoise({f:3500,f2:1200,t:.22,ft:'bandpass',q:1.2,v:.1})}
 else if(k==='boing'){aTone({f:260,f2:640,t:.16,v:.2});aTone({d:.1,f:520,f2:880,t:.12,v:.12})}}catch(_){}};
document.querySelectorAll('.menuItem,#charBack,#indexBack,#charNext').forEach(b=>b.addEventListener('pointerdown',()=>forestSfx('tok')));
{let ready=false;setTimeout(()=>ready=true,800);const mo=new MutationObserver(ms=>{if(!ready)return;for(const m of ms)if(m.target.classList.contains('active')&&!(m.oldValue||'').includes('active')){forestSfx('leaf');break}});
document.querySelectorAll('.screen').forEach(el=>mo.observe(el,{attributes:true,attributeFilter:['class'],attributeOldValue:true}))}
