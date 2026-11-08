const $=s=>document.querySelector(s),K='motocare.v3',SEVERE=0.7;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- Storage ---------- */
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
S=S&&Array.isArray(S.bikes)?S:{bikes:[],active:null,theme:'auto'};
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const act=()=>S.bikes.find(b=>b.id===S.active)||S.bikes[0];
/* ---------- Theme engine ---------- */
function theme(){const r=document.documentElement;S.theme==='auto'?r.removeAttribute('data-theme'):r.dataset.theme=S.theme;const t=$('#th');if(t)t.textContent='Theme: '+S.theme}
/* ---------- Wear diagnostic ---------- */
function assemblies(m){const o=m.s1_engine_oil,f=m.s2_filtration,paper=/cartridge/i.test(f.type),a=[
 {k:'oil',n:'Engine oil',km:o.interval_km,d:90,pn:o.grade},
 {k:'filt',n:paper?'Oil filter element':'Oil strainer (clean)',km:paper?o.interval_km*2:o.interval_km,d:paper?180:90,pn:f.part_no},
 m.s7_cvt_belt?{k:'drive',n:'CVT belt',km:m.s7_cvt_belt.replace_km,d:730,pn:m.s7_cvt_belt.part_no}:{k:'drive',n:'Drive chain (lube, adjust)',km:m.s3_final_drive.interval_km||1000,d:60,pn:m.s3_final_drive.chain_spec},
 {k:'plug',n:'Spark plug',km:m.s4_spark_plug.interval_km,d:365,pn:m.s4_spark_plug.ygp}];
 if(m.s13_cooling&&m.s13_cooling.liquid_cooled)a.push({k:'cool',n:'Coolant',km:m.s13_cooling.interval_km,d:730,pn:m.s13_cooling.radiator_ml+' ml radiator'});
 a.push({k:'bfl',n:'Brake fluid',km:24000,d:365,pn:'DOT 4'},{k:'brk',n:'Brake friction (pads/shoes)',km:8000,d:365,pn:m.s11_front_brake.pads||m.s11_front_brake.part_no},
 {k:'tire',n:'Tires',km:10000,d:730,pn:m.s18_tires.front+' / '+m.s18_tires.rear});return a}
function diag(b){const m=DB[b.model],f=b.severe?SEVERE:1;return assemblies(m).map(t=>{const km=Math.round(t.km*f),d=Math.round(t.d*f),l=b.last[t.k]||{odo:b.start_odo,date:b.start};
 const used=b.odo-l.odo,days=Math.floor((Date.now()-new Date(l.date))/864e5),kl=km-used,dl=d-days,wear=Math.min(999,Math.round(Math.max(used/km,days/d)*100));
 return{...t,km,d,kl,dl,wear,cls:kl<=0||dl<=0?'over':(kl<=300||dl<=14)?'soon':''}})}
const overdue=b=>diag(b).filter(t=>t.cls==='over').length;
/* ---------- Parts search index ---------- */
const SYS={s1_engine_oil:'Engine oil',s2_filtration:'Oil filtration',s3_final_drive:'Final drive',s4_spark_plug:'Spark plug',s5_air_cleaner:'Air cleaner',s6_duct_filter:'CVT duct filter',s7_cvt_belt:'CVT belt',s8_rollers:'CVT rollers',s9_sliders:'CVT sliders',s10_clutch:'Clutch',s11_front_brake:'Front brake',s12_rear_brake:'Rear brake',s13_cooling:'Cooling',s14_fork:'Front fork',s15_bearings:'Wheel bearings',s16_steering:'Steering head',s17_electrical:'Battery and electrical',s18_tires:'Tires',torque_nm:'Torque',engine:'Engine'};
function flat(o,p,out){for(const k in o){const v=o[k];if(v===null||k==='src'||k==='verified')continue;typeof v==='object'?flat(v,p+k+' ',out):out.push([p+k,String(v)])}}
const INDEX=[];LIST.forEach(m=>Object.keys(SYS).forEach(s=>{if(!m[s])return;const out=[];flat(m[s],'',out);out.forEach(([l,v])=>INDEX.push({m,s,sys:SYS[s],l:l.replace(/_/g,' '),v,ok:m[s].verified,h:(m.name+' '+SYS[s]+' '+l+' '+v+' '+m.category).toLowerCase().replace(/_/g,' ')}))}));
function search(q){const t=q.toLowerCase().trim().split(/\s+/).filter(Boolean);if(!t.length)return'<p class="mut">Type a part number (1S7), a keyword (belt, NGK) or a system (brake).</p>';
 const r=INDEX.filter(e=>t.every(w=>e.h.includes(w))).slice(0,60);
 return r.length?r.map(e=>`<div class="card"><b>${esc(e.m.name)}</b><br><span class="mut">${e.sys} · ${esc(e.l)}</span><br>${esc(e.v)} <span class="mut">${e.ok?'':'(unverified)'}</span></div>`).join(''):'<p>No match. Try a shorter term.</p>'}
/* ---------- Views ---------- */
let view='garage';
const pills=()=>`<div class="pills" role="tablist" aria-label="Active bike">${S.bikes.map(b=>{const o=overdue(b);return `<button role="tab" aria-selected="${b.id===act().id}" class="${b.id===act().id?'on':''}" data-b="${b.id}">${esc(b.nick||DB[b.model].name)}${o?`<span class="badge">${o}</span>`:''}</button>`}).join('')}<button id="add">+ Add bike</button></div>`;
const empty=t=>`<div class="card"><h2>No bike yet</h2><p>${t}</p><button class="pri" id="add">Add your first bike</button></div>`;
const V={
garage(){if(!S.bikes.length)return empty('Add your Yamaha to track wear and look up parts.');const b=act(),m=DB[b.model];
 return pills()+`<div class="card"><h2>${esc(b.nick||m.name)}</h2><p class="mut">${esc(m.name)} · ${m.engine.displacement_cc} cc · ${m.cooling}</p>
 <label for="od">Odometer (km)</label><input id="od" type="number" inputmode="numeric" min="0" value="${b.odo}">
 <label><input id="sv" type="checkbox"${b.severe?' checked':''} style="min-height:auto;width:auto"> Severe duty (Metro Manila traffic): all intervals x0.70</label>
 <div class="row"><button class="pri" id="sa">Save</button><button class="del" id="rm">Remove bike</button></div></div>`},
search(){return `<label for="q">Search parts, part numbers and specs</label><input id="q" type="search" placeholder="1S7, belt, NGK, brake..." autocomplete="off"><div id="res" style="margin-top:12px">${search('')}</div>`},
diag(){if(!S.bikes.length)return empty('Add a bike to see wear.');const b=act();
 return pills()+diag(b).map(t=>`<div class="card due ${t.cls}"><h2>${t.n}</h2><div style="height:8px;border-radius:4px;background:var(--line);overflow:hidden"><div style="height:100%;width:${Math.min(100,t.wear)}%;background:var(--${t.cls==='over'?'bad':t.cls==='soon'?'warn':'ok'})"></div></div>
 <p><span class="tag">${t.cls==='over'?'Overdue':t.cls==='soon'?'Due soon':'OK'}</span> · ${t.wear}% worn · ${t.kl>0?t.kl+' km left':-t.kl+' km over'} · ${t.dl>0?t.dl+' days left':'time is up'}</p><p class="mut">${esc(t.pn||'')}</p>
 <div class="row"><button data-done="${t.k}">Mark done now</button><button data-ics="${t.k}">Add to calendar</button></div></div>`).join('')},
torque(){if(!S.bikes.length)return empty('Add a bike to see its torque specs.');const m=DB[act().model],t=m.torque_nm;
 return pills()+`<div class="card"><h2>${esc(m.name)}: torque (Nm)</h2><table style="width:100%;border-collapse:collapse">${Object.keys(t).filter(k=>k!=='src'&&k!=='verified'&&t[k]!==null).map(k=>`<tr><th scope="row" style="text-align:left;padding:8px 0;border-bottom:1px solid var(--line)">${k.replace(/_/g,' ')}</th><td style="text-align:right;border-bottom:1px solid var(--line)">${esc(t[k])}</td></tr>`).join('')}</table>
 <p class="mut">${t.verified?'Marked verified by the project owner.':'Unverified.'} Confirm with the service manual before tightening.</p></div>`},
settings(){return `<div class="card"><h2>Theme</h2><label for="ts">Appearance</label><select id="ts">${['auto','light','dark'].map(t=>`<option${t===S.theme?' selected':''}>${t}</option>`).join('')}</select></div>
 <div class="card"><h2>Backup</h2><p class="mut">iPhones can clear website data after 7 days of non-use. Export a copy now and then.</p><div class="row"><button id="ex" class="pri">Export backup</button><button id="im">Restore backup</button></div><input id="fi" type="file" accept=".json" hidden></div>
 <div class="card"><h2>Alerts</h2><p class="mut">Get a notification when you open the app with overdue items. On iPhone, add the app to your Home Screen first.</p><button id="np" class="pri">Enable alerts</button></div>`}};
function render(v){view=V[v]?v:view;if(location.hash.slice(1)!==view)location.hash=view;
 const n=$('nav');n.innerHTML=[['garage','Garage'],['search','Parts'],['diag','Wear'],['torque','Torque'],['settings','Settings']].map(x=>`<button data-v="${x[0]}" class="${x[0]===view?'on':''}">${x[1]}${x[0]==='diag'&&S.bikes.reduce((a,b)=>a+overdue(b),0)?`<span class="badge">${S.bikes.reduce((a,b)=>a+overdue(b),0)}</span>`:''}</button>`).join('');
 n.querySelectorAll('button').forEach(b=>b.onclick=()=>render(b.dataset.v));$('#view').innerHTML=V[view]();bind()}
function bind(){const m=$('#view'),b=S.bikes.length&&act();
 m.querySelectorAll('[data-b]').forEach(e=>e.onclick=()=>{S.active=+e.dataset.b;save();render()});
 const a=m.querySelector('#add');if(a)a.onclick=()=>{$('#dm').innerHTML=LIST.map(x=>`<option value="${x.id}">${esc(x.name)}</option>`).join('');$('#dn').value='';$('#do').value=0;$('#dlg').showModal()};
 if(view==='garage'&&b){$('#sa').onclick=()=>{b.odo=Math.max(0,+$('#od').value||0);b.severe=$('#sv').checked;save();render()};$('#rm').onclick=()=>{if(confirm('Remove '+(b.nick||DB[b.model].name)+' and its history?')){S.bikes=S.bikes.filter(x=>x!==b);S.active=S.bikes[0]&&S.bikes[0].id;save();render()}}}
 if(view==='search'){$('#q').oninput=e=>{$('#res').innerHTML=search(e.target.value)}}
 if(view==='diag'&&b){m.querySelectorAll('[data-done]').forEach(e=>e.onclick=()=>{b.last[e.dataset.done]={odo:b.odo,date:new Date().toISOString()};save();render()});
  m.querySelectorAll('[data-ics]').forEach(e=>e.onclick=()=>{const t=diag(b).find(x=>x.k===e.dataset.ics),days=Math.max(0,Math.min(t.dl,t.kl>0?t.kl/15:0));Notif.ics(b,t,new Date(Date.now()+days*864e5))})}
 if(view==='settings'){$('#ts').onchange=e=>{S.theme=e.target.value;save();theme()};
  $('#np').onclick=()=>Notif.enable().then(m=>alert(m));
  $('#ex').onclick=()=>{const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));l.download='motocare-backup.json';l.click()};
  $('#im').onclick=()=>$('#fi').click();$('#fi').onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());if(!Array.isArray(d.bikes))throw 0;S=d;save();theme();render('garage')}catch(x){alert('That file is not a valid MotoCare backup.')}}}}
$('#da').onclick=()=>{const o=Math.max(0,+$('#do').value||0),b={id:Date.now(),model:$('#dm').value,nick:$('#dn').value.trim(),odo:o,start_odo:o,start:new Date().toISOString(),severe:true,last:{}};S.bikes.push(b);S.active=b.id;save();$('#dlg').close();render('garage')};
$('#dc').onclick=()=>$('#dlg').close();
$('#th').onclick=()=>{S.theme={auto:'light',light:'dark',dark:'auto'}[S.theme];save();theme();if(view==='settings')render()};
theme();render(location.hash.slice(1)||'garage');
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');

if(window.Notif)document.addEventListener('visibilitychange',()=>{if(!document.hidden)Notif.badge()});
