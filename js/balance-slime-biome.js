/* ===== BALANCE + SLIME BIOME + BOSS SANGAR ===== */
(function(){try{
const STH='nnnueenunuppeeeercooiiiirrrrhhthnnuoopooooooeeeessnsrrrresseiiiivuvvhhttmmpmvrvvueuvhhvmphvvvvnthvvv';
/* sprite boss disesuaikan nama */
const FIX={3:['mecha',95],57:['sam',30],58:['sam',80],53:['dslime',0],77:['dslime',280]};
for(const s in FIX)NA_BOSS[s]=FIX[s];
/* warna slime per biome (hue relatif hijau) */
const SH={0:0,1:-60,10:180,16:-112,17:190,18:90,20:75,24:-140,36:60,37:-40,60:80};
const EP={n:'Murka Rimba',e:'Penghancur Batu',p:'Racun Maut',u:'Penguasa Kematian',r:'Amarah Api',i:'Kutukan Beku',o:'Teror Samudra',h:'Hukuman Langit',t:'Murka Petir',v:'Kegelapan Abadi',m:'Mesin Pemusnah',s:'Bayangan Pedang',c:'Pecahan Kristal'};
for(const d of ET){const s=d.si|0;delete d._na;
 if(d.boss){const f=s<10?.85:s>=70?1.2:1,a=s<10?.9:s>=70?1.15:1;
  d.hp=Math.round(d.hp*f);d.atk=Math.round(d.atk*a);d.r=Math.round(d.r*1.12);
  if(!d._ep){d._ep=1;d.n=d.n+', '+(EP[STH[s]]||'')}}
 else{if(s>=60)d.hp=Math.round(d.hp*1.1);if(s<5)d.atk=Math.max(3,Math.round(d.atk*.9));
  if(d.p==='slime'&&SH[s]!==undefined)d.th=SH[s]}}
/* hiasan slime sesuai biome */
function slimeFx(e){
 const s=ET[e.et].si|0,k=STH[s],t=worldTime,h=Math.max(30,e.r*1.9),top=-h/2+3,w=e.r*1.5;
 ctx.save();ctx.translate(Math.round(e.x),Math.round(e.y+Math.sin(e.phase)*2));
 if(s===10){ctx.fillStyle='#8a3a2a';ctx.beginPath();ctx.ellipse(0,top+2,w*.7,h*.2,0,Math.PI,0);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(-w*.35,top-2,4,4);ctx.fillRect(w*.15,top-4,4,4)}
 else if(k==='i'){ctx.fillStyle='#f4fbff';ctx.beginPath();ctx.ellipse(0,top+2,w*.6,h*.17,0,0,6.283);ctx.fill();
  for(let j=-1;j<=1;j++)ctx.fillRect(j*w*.3-2,top+3,4,j&1?5:8);
  ctx.fillStyle='rgba(255,255,255,.85)';for(let j=0;j<6;j++){const p=(t*.5+j/6)%1;ctx.fillRect(((j*37)%40-20)*e.r/20|0,(top-14+p*(h+10))|0,2,2)}}
 else if(k==='r'){ctx.fillStyle='rgba(255,90,20,.22)';ctx.beginPath();ctx.ellipse(0,0,w*.9,h*.55,0,0,6.283);ctx.fill();
  for(let j=0;j<6;j++){const p=(t*.7+j/6)%1;ctx.fillStyle=j%2?'rgba(255,220,80,'+(1-p)+')':'rgba(255,110,30,'+(1-p)+')';ctx.fillRect(((j*29)%30-15)*e.r/20|0,(top-p*22)|0,3,3)}}
 else if(k==='c'){const C=['#e6b8ff','#8ff0ff','#ff9be8'];for(let j=0;j<3;j++){const x=(j-1)*w*.38,y=top+2+(j&1)*4;ctx.fillStyle=C[j];ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x,y-11-(j===1?5:0));ctx.lineTo(x+4,y);ctx.fill()}
  ctx.fillStyle='rgba(255,255,255,'+(.4+.4*Math.sin(t*5))+')';ctx.fillRect(w*.3,top-6,2,2)}
 else if(k==='o'||k==='p'){ctx.strokeStyle=k==='p'?'rgba(190,255,90,.8)':'rgba(200,245,255,.8)';ctx.lineWidth=1;
  for(let j=0;j<3;j++){const p=(t*.6+j/3)%1;ctx.beginPath();ctx.arc(((j*13)%16-8)*e.r/20,top+8-p*18,2+j%2,0,6.283);ctx.stroke()}}
 else if(k==='n'){ctx.fillStyle='#3fae3a';ctx.beginPath();ctx.ellipse(w*.2,top,6,3,-.6,0,6.283);ctx.fill()}
 ctx.restore()}
const _d2=window.drawEnemy;
window.drawEnemy=function(e){_d2(e);if(!e.boss&&e.p==='slime'){try{slimeFx(e)}catch(_){}}};
}catch(err){console.error('Patch balance gagal:',err)}})();
