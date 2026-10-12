/* ===== SEMUA SLIME BEDA: warna + hiasan per nama ===== */
(function(){try{
const H={'Slime Hijau':0,'Slime Lumut':40,'Slime Padang':-45,'Slime Duri':-80,'Slime Jamur':180,'Slime Lava':-118,'Slime Magma':-100,'Slime Kristal':190,'Slime Laut':85,'Slime Sungai':55,'Slime Rawa':-40,'Slime Es':75,'Slime Gunung Es':105};
for(const d of ET)if(!d.boss&&d.p==='slime'&&H[d.n]!==undefined)d.th=H[d.n];
function ex(e){
 const n=ET[e.et].n,t=worldTime,h=Math.max(30,e.r*1.9),top=-h/2+3,w=e.r*1.5;
 ctx.save();ctx.translate(Math.round(e.x),Math.round(e.y+Math.sin(e.phase)*2));
 if(n==='Slime Lumut'){ctx.fillStyle='#2f6a2a';for(let j=0;j<4;j++)ctx.fillRect((j-1.5)*w*.3|0,(top+6+(j%2)*7)|0,6,4);ctx.fillStyle='#d8f2a0';ctx.fillRect(w*.25,top-2,3,3)}
 else if(n==='Slime Padang'){ctx.fillStyle='#ff8fc0';for(let j=0;j<4;j++){const a=j*1.57;ctx.fillRect(Math.cos(a)*4-w*.2-1,top-3+Math.sin(a)*4,3,3)}ctx.fillStyle='#ffe040';ctx.fillRect(-w*.2-1,top-3,3,3)}
 else if(n==='Slime Duri'){ctx.fillStyle='#5a3a1a';for(let j=-2;j<=2;j++){const x=j*w*.24,y=top+3+Math.abs(j);ctx.beginPath();ctx.moveTo(x-3,y);ctx.lineTo(x,y-9);ctx.lineTo(x+3,y);ctx.fill()}}
 else if(n==='Slime Magma'){ctx.strokeStyle='rgba(255,230,90,'+(.6+.3*Math.sin(t*6))+')';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-w*.3,top+8);ctx.lineTo(-2,top+14);ctx.lineTo(w*.2,top+9);ctx.lineTo(w*.35,top+18);ctx.stroke();
  ctx.fillStyle='#ff8a20';const p=(t*.8)%1;ctx.fillRect(w*.3|0,(h/2-4+p*8)|0,3,4)}
 else if(n==='Slime Gunung Es'){ctx.fillStyle='#bfe6ff';for(let j=-1;j<=1;j++){const x=j*w*.34,y=top+4;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x,y-12-(j===0?6:0));ctx.lineTo(x+4,y);ctx.fill()}}
 else if(n==='Slime Sungai'){ctx.strokeStyle='rgba(210,250,255,.7)';ctx.lineWidth=1;for(let j=0;j<2;j++){const k=(t*.8+j*.5)%1;ctx.beginPath();ctx.ellipse(0,h/2-2,w*(.4+k*.5),3+k*3,0,0,6.283);ctx.globalAlpha=1-k;ctx.stroke()}ctx.globalAlpha=1}
 else if(n==='Slime Laut'){ctx.fillStyle='#ff9040';for(let j=0;j<5;j++){const a=j*1.257-1.57;ctx.fillRect(Math.cos(a)*5+w*.25|0,top-3+Math.sin(a)*5|0,3,3)}}
 else if(n==='Slime Rawa'){ctx.fillStyle='#4a3a1a';for(let j=-1;j<=1;j++)ctx.fillRect(j*w*.3-2|0,(h/2-6)|0,4,6+(j&1?4:0));ctx.fillStyle='#7a6a30';ctx.fillRect(-w*.3|0,top+8,5,3)}
 ctx.restore()}
const _d3=window.drawEnemy;
window.drawEnemy=function(e){_d3(e);if(!e.boss&&e.p==='slime'){try{ex(e)}catch(_){}}};
}catch(err){console.error('Patch slime gagal:',err)}})();
