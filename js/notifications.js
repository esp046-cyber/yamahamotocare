const Notif={
 standalone:()=>navigator.standalone===true||matchMedia('(display-mode: standalone)').matches,
 scan(){let S;try{S=JSON.parse(localStorage.getItem('motocare.v3'))}catch(e){}if(!S||!Array.isArray(S.bikes))return[];const out=[];
  S.bikes.forEach(b=>{if(!DB[b.model])return;diag(b).forEach(t=>{if(t.cls)out.push({bike:b,task:t})})});return out},
 badge(){const n=Notif.scan().filter(x=>x.task.cls==='over').length;if('setAppBadge'in navigator)(n?navigator.setAppBadge(n):navigator.clearAppBadge()).catch(()=>{});return n},
 async enable(){if(!('Notification'in window))return'This browser does not support notifications.';
  if(Notification.permission==='denied')return'Notifications are blocked. Allow them in your browser or phone settings.';
  const p=await Notification.requestPermission();if(p!=='granted')return'Alerts not enabled.';await Notif.notify();
  return'Alerts enabled. MotoCare will notify you when you open the app with items due.'+(Notif.standalone()?'':' On iPhone, install to the Home Screen first.')},
 async notify(){if(!('Notification'in window)||Notification.permission!=='granted'||!navigator.serviceWorker)return;
  const o=Notif.scan().filter(x=>x.task.cls==='over');if(!o.length)return;const reg=await navigator.serviceWorker.getRegistration();if(!reg)return;
  reg.showNotification('MotoCare: '+o.length+' overdue',{body:o.slice(0,4).map(x=>(x.bike.nick||DB[x.bike.model].name)+': '+x.task.n).join('\n'),tag:'motocare-overdue',icon:'icons/icon-192.png',badge:'icons/icon-96.png'})},
 // Web Push registration (iOS 16.4+ Home Screen apps, Android). Needs your own push server and VAPID public key; returns the subscription to send to it.
 async subscribePush(vapidKey){if(!vapidKey)throw new Error('A VAPID public key is required.');if(!('PushManager'in window))throw new Error('Push is not supported here.');
  if((await Notification.requestPermission())!=='granted')throw new Error('Permission not granted.');
  const pad='='.repeat((4-vapidKey.length%4)%4),raw=atob((vapidKey+pad).replace(/-/g,'+').replace(/_/g,'/')),key=Uint8Array.from(raw,c=>c.charCodeAt(0));
  const reg=await navigator.serviceWorker.ready;return(await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key})).toJSON()},
 ics(b,t,date){const m=DB[b.model],name=b.nick?b.nick+' ('+m.name+')':m.name,d=date.toISOString().slice(0,10).replace(/-/g,''),dueOdo=b.odo+Math.max(0,t.kl);
  const esc=x=>String(x).replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');
  const desc=['Model: '+m.name,'Bike: '+name,'Service: '+t.n,'Odometer now: '+b.odo+' km','Due at about: '+dueOdo+' km (interval '+t.km+' km / '+t.d+' days'+(b.severe?', severe duty x0.70':'')+')','YGP part / spec: '+(t.pn||'n/a'),'Check specs with your Yamaha dealer before buying.'].join('\n');
  const fold=l=>{const o=[];while(l.length>73){o.push(l.slice(0,73));l=' '+l.slice(73)}o.push(l);return o.join('\r\n')};
  const L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MotoCare PH//EN','BEGIN:VEVENT','UID:'+b.id+'-'+t.k+'-'+d+'@motocare-ph','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z','DTSTART;VALUE=DATE:'+d,'SUMMARY:'+esc(t.n+' - '+name),'DESCRIPTION:'+esc(desc),'BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:'+esc(t.n+' due soon'),'END:VALARM','END:VEVENT','END:VCALENDAR'].map(fold).join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([L],{type:'text/calendar'}));a.download='motocare-'+t.k+'.ics';a.click()}};
window.addEventListener('load',()=>{Notif.badge();Notif.notify()});
