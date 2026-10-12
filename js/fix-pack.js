(function(){try{
const $=id=>document.getElementById(id),SK='eclipse_rpg_settings_v1';
const cfg=()=>{try{return JSON.parse(localStorage.getItem(SK)||'{}')}catch(e){return{}}};
/* indikator muat */
const mask=$('bootMask');
const hideMask=()=>setTimeout(()=>{mask&&mask.classList.add('off');setTimeout(()=>mask&&mask.remove(),600)},250);
if(document.readyState==='complete')hideMask();else addEventListener('load',hideMask);
addEventListener('error',()=>{const t=$('bootTxt');if(t&&mask&&!mask.classList.contains('off'))t.textContent='TERJADI KESALAHAN — MUAT ULANG HALAMAN'});
setTimeout(()=>{const t=$('bootTxt');if(t&&mask&&!mask.classList.contains('off'))t.textContent='MASIH MEMUAT… MOHON TUNGGU'},8000);
/* deteksi perangkat low-end */
const low=(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=2||matchMedia('(prefers-reduced-motion:reduce)').matches;
document.body.classList.toggle('lowfx',low);
/* pengaturan aksesibilitas: baris baru di layar Pengaturan */
const rb=$('resetSettings');
if(rb&&rb.parentElement){
 const R=(ic,lb,ds,k,o)=>'<div class="settingRow"><div class="settingInfo"><div class="settingIcon">'+ic+'</div><div><div class="settingLabel">'+lb+'</div><div class="settingDesc">'+ds+'</div></div></div><div class="segmented" data-setting="'+k+'">'+o.map(x=>'<button data-value="'+x[0]+'">'+x[1]+'</button>').join('')+'</div></div>';
 const g=document.createElement('div');g.className='settingsGroup';
 g.innerHTML='<div class="groupLabel">♿ AKSESIBILITAS</div>'
  +R('🔠','Ukuran Teks','HUD & menu','uiText',[['0.9','Kecil'],['1','Sedang'],['1.2','Besar']])
  +R('🌓','Kontras Tinggi','Untuk bermain di luar ruangan','hiContrast',[['false','Off'],['true','On']])
  +R('🎨','Ramah Buta Warna','Palet + pola pada bar','colorBlind',[['false','Off'],['true','On']])
  +R('⏱','Waktu Tahan Tombol','Tombol menu baru aktif setelah ditahan','holdMs',[['0','Off'],['300','0,3 dtk'],['600','0,6 dtk']]);
 rb.parentElement.parentElement.insertBefore(g,rb.parentElement);
}
function apply(){const s=cfg();
 document.documentElement.style.setProperty('--ui-zoom',Number(s.uiText)||1);
 document.body.classList.toggle('hc',!!s.hiContrast);
 document.body.classList.toggle('cb',!!s.colorBlind);
 window.__holdMs=Number(s.holdMs)||0;}
apply();
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-setting],#resetSettings'))setTimeout(apply,0)});
/* cegah input ganda + waktu tahan tombol (hanya tombol menu, bukan tombol aksi) */
const down=new WeakMap(),last=new WeakMap(),SKIP=['attack','skillBtn','dashBtn','ultBtn','pauseBtn','shopBtn'];
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('button');if(b)down.set(b,performance.now())},true);
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button');
 if(!b||SKIP.includes(b.id)||e.detail===0)return;const n=performance.now(),d=down.get(b),h=window.__holdMs||0;
 if(h&&d&&n-d<h){e.stopImmediatePropagation();e.preventDefault();return}
 if(!b.closest('#shopGrid')&&n-(last.get(b)||0)<260){e.stopImmediatePropagation();e.preventDefault();return}
 last.set(b,n)},true);
/* joystick: selalu reset saat jari lepas / fokus hilang */
const joy=$('joy');
const relJoy=()=>{try{joy.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true}))}catch(_){}};
if(joy){joy.addEventListener('lostpointercapture',relJoy);
 document.addEventListener('touchend',e=>{if(!e.touches.length)relJoy()},{passive:true});
 document.addEventListener('touchcancel',relJoy,{passive:true});addEventListener('blur',relJoy);}
/* auto-pause saat tab/app disembunyikan */
document.addEventListener('visibilitychange',()=>{if(!document.hidden)return;relJoy();
 const pb=$('pauseBtn');if(pb&&pb.offsetParent&&!document.querySelector('.screen.active'))pb.click()});
/* Panduan & Tips */
const gs=document.createElement('div');gs.id='guideScreen';gs.className='screen';
gs.innerHTML='<div class="box"><p class="screenH" style="color:#a9f3b0;text-align:center">📚 PANDUAN & TIPS</p>'
+'<h3>🎮 KONTROL</h3><ul><li>Joystick / WASD: bergerak</li><li>ATTACK / Space: menyerang</li><li>SKILL / Q: skill karakter</li><li>DASH / E / F: menghindar (ada beberapa muatan)</li><li>ULT / R: ultimate</li><li>⏸ / ESC: pause · 🎒: toko</li></ul>'
+'<h3>📊 ATRIBUT</h3><ul><li>HP: nyawa. Habis = tumbang. Potion (🧪) memulihkan HP, ketuk angkanya di HUD.</li><li>ATK: kekuatan serangan.</li><li>XP & Level: naik level lalu pilih 1 dari 3 upgrade.</li></ul>'
+'<h3>🗺 MEKANIK</h3><ul><li>Kalahkan target musuh tiap stage, lalu boss, untuk membuka portal.</li><li>Timer ⏳ menunjukkan batas waktu bertahan hidup di stage.</li><li>Kesulitan tiap stage naik bertahap; ubah tingkat kesulitan di Pengaturan (juga dari menu pause).</li><li>Progress tersimpan otomatis di awal tiap stage (mulai Stage 2).</li></ul>'
+'<h3>💡 TIPS</h3><ul><li>Jangan berhenti bergerak saat boss menyiapkan serangan.</li><li>Simpan Dash untuk menghindar, bukan untuk mengejar.</li><li>Belanja di toko sebelum stage boss.</li></ul>'
+'<button id="guideBack" class="btn-big primary">← KEMBALI</button></div>';
document.getElementById('game').appendChild(gs);
let ret='start';
const openG=f=>{ret=f;document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));if(f==='start')$('start').classList.add('lobby-backdrop');gs.classList.add('active')};
$('guideBack').addEventListener('click',()=>{gs.classList.remove('active');const t=$(ret);$('start').classList.remove('lobby-backdrop');if(t)t.classList.add('active')});
const pi=$('pauseIndex');if(pi){const b=document.createElement('button');b.className='btn-big blue';b.textContent='📚 PANDUAN & TIPS';b.addEventListener('click',()=>openG('pauseScreen'));pi.after(b)}
const ml=document.querySelector('.menuList');if(ml){const b=document.createElement('button');b.className='menuItem';b.innerHTML='<span>📚</span> Panduan <b>›</b>';b.addEventListener('click',()=>openG('start'));ml.appendChild(b)}
/* tips berbeda tiap stage */
const TIPS=['Bergeraklah terus: musuh yang berhenti mengejar mudah dikalahkan.','Gunakan Dash untuk keluar dari area bahaya di lantai.','Skill punya cooldown — pakai saat musuh berkumpul.','Potion lebih berguna saat HP rendah, jangan ditimbun.','Pilih upgrade yang menutup kelemahan karaktermu.','Mampir ke toko sebelum menghadapi boss.','Perhatikan tanda peringatan di tanah sebelum boss menyerang.','Ultimate terbaik dipakai saat boss mulai fase baru.'];
const sn=$('siNum');if(sn){const d=$('siDesc');const tip=document.createElement('div');tip.id='siTip';d.after(tip);
 new MutationObserver(()=>{const n=parseInt((sn.textContent.match(/\d+/)||[1])[0],10)||1;
  tip.textContent='💡 '+(n<=3?'Stage awal: biasakan dulu dengan Dash dan Skill.':n>=70?'Dunia akhir: musuh dan boss jauh lebih tangguh — jaga HP dan jarak.':TIPS[n%TIPS.length]);
 }).observe(sn,{childList:true,characterData:true,subtree:true})}
}catch(err){console.error('Fix pack gagal:',err)}})();
