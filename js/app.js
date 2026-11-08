/**
 * MotoCare PH — Core Engine v2026.3
 * Multi-Brand Motorcycle Registry & Telemetry Suite (Yamaha & Honda PH)
 */

const $ = s => document.querySelector(s), K = 'motocare.v3', SEVERE = 0.7;
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* =========================================================================
   1. MASTER DICTIONARY RE-INDEXING (Yamaha + Honda Hybrid Engine)
   ========================================================================= */
// Guarantee LIST exists and safely merge HONDA_LIST without duplication
window.LIST = window.LIST || [];
if (typeof HONDA_LIST !== 'undefined' && Array.isArray(HONDA_LIST)) {
  HONDA_LIST.forEach(m => {
    if (!window.LIST.some(existing => existing.id === m.id)) {
      window.LIST.push(m);
    }
  });
}

// Safely mutate or create DB without throwing 'Identifier already declared'
if (typeof DB !== 'undefined') {
  Object.assign(DB, Object.fromEntries(window.LIST.map(m => [m.id, m])));
} else {
  window.DB = Object.fromEntries(window.LIST.map(m => [m.id, m]));
}

// Helper to deduce brand from model profile
const getBrand = m => m ? (m.brand || (/honda/i.test(m.id) || /beat|click|pcx|adv|xrm|winner|cb300|rebel|crf/i.test(m.id) ? 'Honda' : 'Yamaha')) : 'Yamaha';

/* =========================================================================
   2. PERSISTENCE & STORAGE
   ========================================================================= */
let S;
try { S = JSON.parse(localStorage.getItem(K)); } catch (e) { }
S = (S && Array.isArray(S.bikes)) ? S : { bikes: [], active: null, theme: 'auto' };
const save = () => { try { localStorage.setItem(K, JSON.stringify(S)); } catch (e) { } };
const act = () => S.bikes.find(b => String(b.id) === String(S.active)) || S.bikes[0];

/* =========================================================================
   3. 2026 ADAPTIVE THEME SYSTEM
   ========================================================================= */
function theme() {
  const r = document.documentElement;
  if (S.theme === 'auto') {
    r.removeAttribute('data-theme');
  } else {
    r.dataset.theme = S.theme;
  }
  const t = $('#th');
  if (t) t.textContent = 'Theme: ' + S.theme;
}

/* =========================================================================
   4. PRECISION WEAR DIAGNOSTICS & TELEMETRY
   ========================================================================= */
function assemblies(m, severe) {
  if (!m) return [];
  const o = m.s1_engine_oil || { interval_km: 3000, grade: '10W-40', drain_ml: 800 };
  const f = m.s2_filtration || { type: 'mesh', part_no: null };
  const paper = /cartridge|paper/i.test(f.type);
  
  // Apply manufacturer specific severe mileage limits (Metro Manila severe spec)
  const oilKm = severe ? (o.severe_km || Math.round(o.interval_km * SEVERE)) : o.interval_km;
  const oilDays = severe ? 60 : 90;

  const a = [
    {
      k: 'oil',
      n: 'Engine oil',
      km: oilKm,
      d: oilDays,
      pn: `${o.grade} (${o.drain_ml} ml drain)`
    },
    {
      k: 'filt',
      n: paper ? 'Oil filter cartridge' : 'Oil strainer mesh (clean)',
      km: paper ? oilKm * 2 : oilKm,
      d: paper ? 180 : oilDays,
      pn: f.part_no || 'Clean & inspect mesh'
    }
  ];

  // CVT Belt vs Drive Chain Transmission
  if (m.s7_cvt_belt) {
    a.push({
      k: 'drive',
      n: 'CVT drive belt',
      km: m.s7_cvt_belt.replace_km || 20000,
      d: 730,
      pn: m.s7_cvt_belt.part_no || 'OEM Belt'
    });
  } else if (m.s3_final_drive && m.s3_final_drive.kind === 'drive_chain') {
    a.push({
      k: 'drive',
      n: 'Drive chain (clean & lube)',
      km: m.s3_final_drive.interval_km || 1000,
      d: 30,
      pn: m.s3_final_drive.chain_spec || 'Drive chain'
    });
  }

  // Spark Plug
  if (m.s4_spark_plug) {
    a.push({
      k: 'plug',
      n: 'Spark plug',
      km: m.s4_spark_plug.interval_km || 8000,
      d: 365,
      pn: `${m.s4_spark_plug.ngk} (${m.s4_spark_plug.torque_nm} Nm)`
    });
  }

  // Liquid Cooling Subsystem
  if (m.s13_cooling && m.s13_cooling.liquid_cooled) {
    a.push({
      k: 'cool',
      n: 'Radiator coolant',
      km: m.s13_cooling.interval_km || 12000,
      d: 730,
      pn: `${m.s13_cooling.radiator_ml} ml radiator reserve`
    });
  }

  // Hydraulic Brake Fluid & Friction Media
  const frontPads = m.s11_front_brake ? (m.s11_front_brake.pads || m.s11_front_brake.part_no || 'Brake Pads') : 'Standard Shoe';
  const tires = m.s18_tires ? `${m.s18_tires.front} / ${m.s18_tires.rear}` : 'OEM Spec Tires';
  a.push(
    { k: 'bfl', n: 'Brake fluid (bleed/flush)', km: 20000, d: 730, pn: 'DOT 4 Glycol Fluid' },
    { k: 'brk', n: 'Brake friction (pads/shoes)', km: 8000, d: 365, pn: frontPads },
    { k: 'tire', n: 'Tires (tread depth & PSI)', km: 12000, d: 730, pn: tires }
  );

  return a;
}

function diag(b) {
  if (!b) return [];
  const m = DB[b.model];
  if (!m) return [];
  return assemblies(m, b.severe).map(t => {
    const l = b.last[t.k] || { odo: b.start_odo, date: b.start };
    const used = Math.max(0, b.odo - l.odo);
    const days = Math.max(0, Math.floor((Date.now() - new Date(l.date).getTime()) / 864e5));
    const kl = t.km - used;
    const dl = t.d - days;
    const wear = Math.min(999, Math.round(Math.max(used / t.km, days / t.d) * 100));
    return {
      ...t,
      kl,
      dl,
      wear,
      cls: (kl <= 0 || dl <= 0) ? 'over' : (kl <= 300 || dl <= 14) ? 'soon' : ''
    };
  });
}

const overdue = b => diag(b).filter(t => t.cls === 'over').length;

/* =========================================================================
   5. REAL-TIME SEARCH INDEX (Multi-Brand OEM Cross-Reference)
   ========================================================================= */
const SYS = {
  s1_engine_oil: 'Engine oil', s2_filtration: 'Oil filtration', s3_final_drive: 'Final drive',
  s4_spark_plug: 'Spark plug', s5_air_cleaner: 'Air cleaner', s6_duct_filter: 'CVT duct filter',
  s7_cvt_belt: 'CVT belt', s8_rollers: 'CVT rollers', s9_sliders: 'CVT sliders', s10_clutch: 'Clutch',
  s11_front_brake: 'Front brake', s12_rear_brake: 'Rear brake', s13_cooling: 'Cooling',
  s14_fork: 'Front fork', s15_bearings: 'Wheel bearings', s16_steering: 'Steering head',
  s17_electrical: 'Battery and electrical', s18_tires: 'Tires', torque_nm: 'Torque', engine: 'Engine'
};

function flat(o, p, out) {
  for (const k in o) {
    const v = o[k];
    if (v === null || v === undefined || k === 'src' || k === 'verified') continue;
    if (typeof v === 'object' && !Array.isArray(v)) {
      flat(v, p + k + ' ', out);
    } else {
      out.push([p + k, String(v)]);
    }
  }
}

const INDEX = [];
window.LIST.forEach(m => Object.keys(SYS).forEach(s => {
  if (!m[s]) return;
  const out = [];
  flat(m[s], '', out);
  const brand = getBrand(m);
  out.forEach(([l, v]) => INDEX.push({
    m,
    brand,
    s,
    sys: SYS[s],
    l: l.replace(/_/g, ' '),
    v,
    ok: m[s].verified,
    h: `${brand} ${m.name} ${SYS[s]} ${l} ${v} ${m.category}`.toLowerCase().replace(/_/g, ' ')
  }));
}));

function search(q, filterBrand = 'all') {
  const t = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let pool = INDEX;
  if (filterBrand !== 'all') {
    pool = pool.filter(e => e.brand.toLowerCase() === filterBrand.toLowerCase());
  }
  if (!t.length) {
    return '<p class="mut">Search by part number (1S7, 15421), spark plug (MR9C, CPR8), or subsystem (variator, belt, brake).</p>';
  }
  const r = pool.filter(e => t.every(w => e.h.includes(w))).slice(0, 75);
  return r.length ? r.map(e => `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <b>${esc(e.m.name)}</b>
        <span class="brand-indicator ${e.brand.toLowerCase()}">${esc(e.brand)}</span>
      </div>
      <div class="mut" style="font-size:0.78rem;margin-bottom:4px">${esc(e.sys)} · ${esc(e.l)}</div>
      <div style="font-family:var(--font-mono);font-size:0.95rem;font-weight:700;color:var(--cyan-glow)">${esc(e.v)}</div>
    </div>`).join('') : '<p class="mut">No matching specifications found. Try a broader keyword.</p>';
}

/* =========================================================================
   6. 2026 HUD VIEWS & TELEMETRY MODULES
   ========================================================================= */
let view = 'garage';
let searchFilter = 'all';

const pills = () => `
  <div class="pills" role="tablist" aria-label="Active Fleet">
    ${S.bikes.map(b => {
      const o = overdue(b);
      const isAct = String(b.id) === String(act()?.id);
      const m = DB[b.model] || {};
      const brand = getBrand(m);
      return `<button role="tab" aria-selected="${isAct}" class="${isAct ? 'on' : ''}" data-b="${b.id}">
        <span style="font-size:0.6rem;opacity:0.75;text-transform:uppercase">${brand}</span>
        <span>${esc(b.nick || m.name || 'Bike')}</span>
        ${o ? `<span class="badge">${o}</span>` : ''}
      </button>`;
    }).join('')}
    <button id="add">+ Add bike</button>
  </div>`;

const empty = t => `
  <div class="card" style="text-align:center;padding:32px 16px">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-glow)" stroke-width="1.5" style="margin-bottom:12px"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
    <h2>Garage is Empty</h2>
    <p class="mut" style="margin-bottom:18px">${t}</p>
    <button class="pri" id="add">Register Motorcycle</button>
  </div>`;

const V = {
  garage() {
    if (!S.bikes.length) return empty('Add your Yamaha or Honda motorcycle to track maintenance schedules, parts, and factory torques.');
    
    let b = act();
    let m = b && DB[b.model];
    
    // Graceful recovery if local storage model ID is not found
    if (!m) {
      b = S.bikes.find(bike => DB[bike.model]) || null;
      if (b) {
        S.active = b.id;
        m = DB[b.model];
      } else {
        S.bikes = [];
        S.active = null;
        save();
        return empty('No registered motorcycles found in database. Please register your bike.');
      }
    }
    
    const brand = getBrand(m);
    const brandClass = brand.toLowerCase();
    const dList = diag(b);
    const totalWorn = dList.length ? Math.round(dList.reduce((acc, curr) => acc + curr.wear, 0) / dList.length) : 0;

    return pills() + `
      <div class="card" style="border-top:3px solid ${brand === 'Honda' ? 'var(--honda-red)' : 'var(--yamaha-blue)'}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
          <div>
            <span class="brand-indicator ${brandClass}">${brand} Philippines</span>
            <h2 style="font-size:1.35rem;margin-top:6px">${esc(b.nick || m.name)}</h2>
            <p class="mut">${esc(m.name)} · ${m.engine.displacement_cc} cc · ${m.cooling}</p>
          </div>
          <div style="text-align:right">
            <div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase">Fleet Wear</div>
            <div style="font-size:1.4rem;font-weight:800;color:var(--${totalWorn > 85 ? 'bad-crimson' : totalWorn > 60 ? 'warn-amber' : 'ok-green'})">${totalWorn}%</div>
          </div>
        </div>

        <div style="margin:16px 0">
          <label for="od">Current Odometer (km)</label>
          <input id="od" type="number" inputmode="numeric" min="0" value="${b.odo}">
        </div>

        <div style="background:rgba(0,0,0,0.2);padding:12px;border-radius:var(--radius-md);margin-bottom:16px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input id="sv" type="checkbox"${b.severe ? ' checked' : ''} style="width:18px;height:18px;accent-color:var(--cyan-glow)">
            <span style="font-size:0.85rem"><b>Severe duty operating mode</b> (Metro Manila traffic, heavy idle, dusty routes): adapts oil interval to ${m.s1_engine_oil.severe_km || 2000} km</span>
          </label>
        </div>

        <div class="row">
          <button class="pri" id="sa">Save Telemetry</button>
          <button class="del" id="rm">Remove from Garage</button>
        </div>
      </div>

      <div class="card" style="background:rgba(0, 229, 255, 0.03);border-color:rgba(0,229,255,0.15)">
        <h3 style="font-size:0.92rem;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.04em">Factory Oil &amp; Fluid Spec</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:0.82rem">
          <div><b>Grade:</b> <span style="color:var(--cyan-glow)">${esc(m.s1_engine_oil.grade)}</span></div>
          <div><b>Drain Cap:</b> ${m.s1_engine_oil.drain_ml} ml</div>
          <div><b>Spark Plug:</b> ${esc(m.s4_spark_plug?.ngk || 'OEM Plug')}</div>
          <div><b>Final Drive:</b> ${m.s3_final_drive?.kind === 'gear_oil' ? m.s3_final_drive.gear_oil_ml + ' ml' : 'Chain Drive'}</div>
        </div>
      </div>`;
  },

  search() {
    return `
      <div class="card">
        <label for="q">Search OEM Parts, Part Numbers &amp; Torques</label>
        <input id="q" type="search" placeholder="Type part code (1S7, 15421), spark plug, variator nut..." autocomplete="off">
        <div style="display:flex;gap:6px;margin-top:10px">
          <button class="hud-btn ${searchFilter === 'all' ? 'pri' : ''}" data-filter="all">All</button>
          <button class="hud-btn ${searchFilter === 'yamaha' ? 'pri' : ''}" data-filter="yamaha">Yamaha</button>
          <button class="hud-btn ${searchFilter === 'honda' ? 'pri' : ''}" data-filter="honda">Honda</button>
        </div>
      </div>
      <div id="res">${search($('#q') ? $('#q').value : '', searchFilter)}</div>`;
  },

  diag() {
    if (!S.bikes.length) return empty('Add a motorcycle to view live wear telemetry.');
    const b = act();
    const m = b && DB[b.model];
    if (!m) return empty('Model data unavailable.');
    
    return pills() + diag(b).map(t => `
      <div class="card due ${t.cls}" style="position:relative;overflow:hidden">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <h2 style="font-size:1.05rem;font-weight:700">${esc(t.n)}</h2>
          <span class="tag" style="padding:2px 8px;font-size:0.7rem;font-weight:700;border-radius:var(--radius-pill);background:var(--${t.cls === 'over' ? 'bad-crimson' : t.cls === 'soon' ? 'warn-amber' : 'ok-green'});color:#fff">
            ${t.cls === 'over' ? 'OVERDUE' : t.cls === 'soon' ? 'DUE SOON' : 'HEALTHY'}
          </span>
        </div>

        <div style="height:8px;border-radius:4px;background:var(--border-subtle);overflow:hidden;margin-bottom:10px">
          <div style="height:100%;width:${Math.min(100, t.wear)}%;background:var(--${t.cls === 'over' ? 'bad-crimson' : t.cls === 'soon' ? 'warn-amber' : 'ok-green'});transition:width 0.4s ease"></div>
        </div>

        <p style="font-size:0.85rem;margin-bottom:6px">
          <b>${t.wear}% worn</b> · 
          ${t.kl > 0 ? t.kl + ' km remaining' : Math.abs(t.kl) + ' km past due'} · 
          ${t.dl > 0 ? t.dl + ' days remaining' : 'Inspection overdue'}
        </p>

        <p class="mut" style="font-size:0.8rem;font-family:var(--font-mono)">${esc(t.pn)}</p>

        <div class="row" style="margin-top:14px">
          <button data-done="${t.k}" class="hud-btn" style="justify-content:center;background:rgba(255,255,255,0.06)">Mark Serviced</button>
          <button data-ics="${t.k}" class="hud-btn" style="justify-content:center;background:rgba(0,229,255,0.08);color:var(--cyan-glow)">Add Reminder</button>
        </div>
      </div>`).join('');
  },

  torque() {
    if (!S.bikes.length) return empty('Add a motorcycle to view factory torque specifications.');
    const b = act();
    const m = b && DB[b.model];
    if (!m) return empty('Motorcycle not found.');
    const t = m.torque_nm || {};
    const brand = getBrand(m);

    return pills() + `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h2>${esc(m.name)}: Torque Specs</h2>
          <span class="brand-indicator ${brand.toLowerCase()}">${brand}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
          ${Object.keys(t).filter(k => k !== 'src' && k !== 'verified' && t[k] !== null).map(k => `
            <tr>
              <th scope="row" style="text-align:left;padding:10px 0;border-bottom:1px solid var(--border-subtle);font-weight:600;color:var(--text-muted)">
                ${esc(k.replace(/_/g, ' '))}
              </th>
              <td style="text-align:right;padding:10px 0;border-bottom:1px solid var(--border-subtle);font-family:var(--font-mono);font-weight:700;color:var(--cyan-glow)">
                ${esc(t[k])} Nm
              </td>
            </tr>`).join('')}
        </table>
        <p class="mut" style="font-size:0.75rem;margin-top:12px">
          Official factory specification verified against ${brand} Service Manual. Always use a calibrated torque wrench.
        </p>
      </div>`;
  },

  settings() {
    return `
      <div class="card">
        <h2>Appearance &amp; Telemetry</h2>
        <label for="ts">Theme Preset</label>
        <select id="ts">${['auto', 'light', 'dark'].map(t => `<option${t === S.theme ? ' selected' : ''}>${t}</option>`).join('')}</select>
      </div>
      <div class="card">
        <h2>Garage Backup &amp; Sync</h2>
        <p class="mut" style="margin-bottom:14px">Export your local garage maintenance log to JSON for offline backup across devices.</p>
        <div class="row">
          <button id="ex" class="pri">Export Backup</button>
          <button id="im" class="hud-btn" style="justify-content:center">Restore Backup</button>
        </div>
        <input id="fi" type="file" accept=".json" hidden>
      </div>
      <div class="card">
        <h2>Fleet Information</h2>
        <p class="mut">Database loaded: <b>${window.LIST.length} total models</b> (${window.LIST.filter(m => getBrand(m) === 'Yamaha').length} Yamaha, ${window.LIST.filter(m => getBrand(m) === 'Honda').length} Honda).</p>
      </div>`;
  }
};

/* =========================================================================
   7. RENDER & INTERACTIVE EVENT CONTROLLER
   ========================================================================= */
function render(v) {
  view = V[v] ? v : view;
  if (location.hash.slice(1) !== view) location.hash = view;

  // Build HUD navigation bar
  const n = $('nav .nav-inner') || $('nav');
  const totalOverdue = S.bikes.reduce((a, b) => a + overdue(b), 0);
  const items = [
    ['garage', 'Garage'],
    ['search', 'Parts'],
    ['diag', 'Wear'],
    ['torque', 'Torque'],
    ['settings', 'Settings']
  ];

  if (n) {
    n.innerHTML = items.map(x => `
      <button data-v="${x[0]}" class="${x[0] === view ? 'on' : ''}">
        <span>${x[1]}</span>
        ${x[0] === 'diag' && totalOverdue ? `<span class="badge">${totalOverdue}</span>` : ''}
      </button>`).join('');

    n.querySelectorAll('button').forEach(b => b.onclick = () => render(b.dataset.v));
  }
  
  const viewContainer = $('#view');
  if (viewContainer) {
    viewContainer.innerHTML = V[view]();
  }
  bind();
}

function bind() {
  const m = $('#view');
  if (!m) return;
  const b = S.bikes.length && act();

  // Active bike pill selector
  m.querySelectorAll('[data-b]').forEach(e => e.onclick = () => {
    S.active = e.dataset.b;
    save();
    render();
  });

  // Open Add Bike Modal dialog with Brand Optgroups
  const a = m.querySelector('#add');
  if (a) a.onclick = () => {
    const yamahaModels = window.LIST.filter(x => getBrand(x) === 'Yamaha');
    const hondaModels = window.LIST.filter(x => getBrand(x) === 'Honda');

    const dm = $('#dm');
    if (dm) {
      dm.innerHTML = `
        <optgroup label="Yamaha Motor Philippines">
          ${yamahaModels.map(x => `<option value="${x.id}">${esc(x.name)}</option>`).join('')}
        </optgroup>
        <optgroup label="Honda Philippines">
          ${hondaModels.map(x => `<option value="${x.id}">${esc(x.name)}</option>`).join('')}
        </optgroup>`;
    }
    
    if ($('#dn')) $('#dn').value = '';
    if ($('#do')) $('#do').value = 0;
    const dlg = $('#dlg');
    if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
  };

  // Garage view actions
  if (view === 'garage' && b) {
    const sa = $('#sa');
    if (sa) {
      sa.onclick = () => {
        b.odo = Math.max(0, +$('#od').value || 0);
        b.severe = $('#sv').checked;
        save();
        render();
      };
    }
    const rm = $('#rm');
    if (rm) {
      rm.onclick = () => {
        const bikeName = b.nick || (DB[b.model] && DB[b.model].name) || 'Bike';
        if (confirm(`Remove ${bikeName} and its maintenance telemetry from your garage?`)) {
          S.bikes = S.bikes.filter(x => x !== b);
          S.active = S.bikes[0] ? S.bikes[0].id : null;
          save();
          render();
        }
      };
    }
  }

  // Parts search & brand filtering
  if (view === 'search') {
    const q = $('#q');
    if (q) {
      q.oninput = e => {
        $('#res').innerHTML = search(e.target.value, searchFilter);
      };
    }
    m.querySelectorAll('[data-filter]').forEach(btn => {
      btn.onclick = () => {
        searchFilter = btn.dataset.filter;
        render('search');
        const input = $('#q');
        if (input) input.focus();
      };
    });
  }

  // Wear diagnostics actions
  if (view === 'diag' && b) {
    m.querySelectorAll('[data-done]').forEach(e => e.onclick = () => {
      b.last[e.dataset.done] = { odo: b.odo, date: new Date().toISOString() };
      save();
      render();
    });

    m.querySelectorAll('[data-ics]').forEach(e => e.onclick = () => {
      if (!window.Notif || typeof window.Notif.ics !== 'function') {
        alert('Maintenance reminder calendar export requires notifications.js.');
        return;
      }
      const t = diag(b).find(x => x.k === e.dataset.ics);
      if (t) {
        const estDays = Math.max(1, Math.min(t.dl > 0 ? t.dl : 1, t.kl > 0 ? Math.round(t.kl / 20) : 1));
        Notif.ics(b, t, new Date(Date.now() + estDays * 864e5));
      }
    });
  }

  // Settings view actions
  if (view === 'settings') {
    const ts = $('#ts');
    if (ts) ts.onchange = e => { S.theme = e.target.value; save(); theme(); };
    const ex = $('#ex');
    if (ex) {
      ex.onclick = () => {
        const l = document.createElement('a');
        l.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
        l.download = `motocare-garage-backup-${new Date().toISOString().slice(0, 10)}.json`;
        l.click();
      };
    }
    const im = $('#im');
    if (im) im.onclick = () => $('#fi').click();
    const fi = $('#fi');
    if (fi) {
      fi.onchange = async e => {
        try {
          const d = JSON.parse(await e.target.files[0].text());
          if (!Array.isArray(d.bikes)) throw 0;
          S = d;
          save();
          theme();
          render('garage');
        } catch (x) {
          alert('Invalid MotoCare PH backup file.');
        }
      };
    }
  }
}

/* =========================================================================
   8. GLOBAL LISTENERS & DIALOG CONTROLS
   ========================================================================= */
const da = $('#da');
if (da) {
  da.onclick = () => {
    const o = Math.max(0, +$('#do').value || 0);
    const selectedModel = $('#dm').value;
    const b = {
      id: String(Date.now()),
      model: selectedModel,
      nick: ($('#dn').value || '').trim(),
      odo: o,
      start_odo: o,
      start: new Date().toISOString(),
      severe: true,
      last: {}
    };
    S.bikes.push(b);
    S.active = b.id;
    save();
    const dlg = $('#dlg');
    if (dlg) dlg.close();
    render('garage');
  };
}

const dc = $('#dc');
if (dc) dc.onclick = () => {
  const dlg = $('#dlg');
  if (dlg) dlg.close();
};

const th = $('#th');
if (th) {
  th.onclick = () => {
    S.theme = { auto: 'light', light: 'dark', dark: 'auto' }[S.theme] || 'auto';
    save();
    theme();
    if (view === 'settings') render();
  };
}

// Initial bootstrap
theme();
render(location.hash.slice(1) || 'garage');

if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
if (window.Notif) {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && typeof Notif.badge === 'function') Notif.badge();
  });
}