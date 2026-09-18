/* Merchtech site: scroll reveal, hero word animation, five client-side demos.
   All demo data is illustrative and lives only in the page. Nothing is sent anywhere. */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const money = n => '$' + n.toFixed(2);

  /* product illustrations, drawn inline with shading so nothing external loads */
  let gid = 0;
  const shade = (c, id) => `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${c}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient><linearGradient id="${id}h" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
  const wrap = (inner, vb) => `<svg viewBox="${vb || '0 0 200 200'}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const SHAPES = {
    tee: c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<path d="M62 42 L88 30 Q100 44 112 30 L138 42 L178 62 L164 92 L142 82 L142 182 Q100 190 58 182 L58 82 L36 92 L22 62 Z" fill="url(#${g})"/><path d="M88 30 Q100 44 112 30 Q114 52 100 56 Q86 52 88 30 Z" fill="#000" fill-opacity=".28"/><path d="M62 42 L88 30 Q100 44 112 30 L138 42 L178 62 L164 92 L142 82 L142 182 Q100 190 58 182 L58 82 L36 92 L22 62 Z" fill="url(#${g}h)"/><path d="M142 82 L164 92 M58 82 L36 92" stroke="#000" stroke-opacity=".25" stroke-width="2"/>`); },
    cap: c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<path d="M40 124 C40 44 160 44 160 124 Q100 134 40 124 Z" fill="url(#${g})"/><path d="M100 64 C78 74 64 96 62 122 M100 64 C122 74 136 96 138 122 M100 64 V126 M100 64 C90 86 84 104 84 124 M100 64 C110 86 116 104 116 124" stroke="#000" stroke-opacity=".22" stroke-width="2" fill="none"/><circle cx="100" cy="64" r="5" fill="${c}" stroke="#000" stroke-opacity=".35" stroke-width="2"/><path d="M40 124 C40 44 160 44 160 124 Q100 134 40 124 Z" fill="url(#${g}h)"/><path d="M34 122 Q100 110 166 122 Q170 146 100 154 Q30 146 34 122 Z" fill="url(#${g})"/><path d="M34 122 Q100 110 166 122 Q170 146 100 154 Q30 146 34 122 Z" fill="#000" fill-opacity=".22"/><path d="M40 124 Q100 136 160 124" stroke="#000" stroke-opacity=".3" stroke-width="3" fill="none"/>`); },
    tumbler: c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<rect x="58" y="22" width="84" height="18" rx="6" fill="#2A2E36"/><rect x="66" y="16" width="68" height="10" rx="4" fill="#3A3F49"/><rect x="92" y="10" width="16" height="8" rx="3" fill="#2A2E36"/><path d="M62 40 H138 L130 178 Q100 190 70 178 Z" fill="url(#${g})"/><path d="M62 40 H138 L130 178 Q100 190 70 178 Z" fill="url(#${g}h)"/><path d="M72 48 L68 170" stroke="#fff" stroke-opacity=".22" stroke-width="5" stroke-linecap="round"/>`); },
    blanket: c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<rect x="30" y="66" width="140" height="96" rx="12" fill="url(#${g})"/><path d="M30 92 H170 M30 118 H170 M30 144 H170" stroke="#000" stroke-opacity=".18" stroke-width="6"/><rect x="42" y="52" width="116" height="26" rx="8" fill="#F4F1EA"/><rect x="42" y="52" width="116" height="26" rx="8" fill="#000" fill-opacity=".06"/><path d="M60 65 H140" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`); },
    backpack: c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<rect x="64" y="22" width="72" height="30" rx="14" fill="#2A2E36"/><rect x="46" y="44" width="108" height="136" rx="26" fill="url(#${g})"/><rect x="46" y="44" width="108" height="136" rx="26" fill="url(#${g}h)"/><rect x="60" y="110" width="80" height="50" rx="12" fill="#000" fill-opacity=".28"/><path d="M60 122 H140" stroke="#2A2E36" stroke-width="4"/><rect x="86" y="70" width="28" height="9" rx="4" fill="#F4F1EA"/>`); },
    notebook: c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<rect x="52" y="28" width="104" height="146" rx="8" fill="url(#${g})"/><rect x="44" y="34" width="16" height="134" rx="5" fill="#2A2E36"/><rect x="52" y="28" width="104" height="146" rx="8" fill="url(#${g}h)"/><rect x="132" y="28" width="12" height="146" fill="#000" fill-opacity=".18"/><path d="M78 70 H126 M78 90 H126 M78 110 H108" stroke="#000" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/>`); },
    mug: c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<path d="M50 56 H140 V156 Q140 174 122 174 H68 Q50 174 50 156 Z" fill="url(#${g})"/><path d="M140 76 H154 Q182 76 182 108 Q182 140 154 140 H140 V126 H152 Q168 126 168 108 Q168 90 152 90 H140 Z" fill="url(#${g})"/><ellipse cx="95" cy="56" rx="45" ry="9" fill="#000" fill-opacity=".35"/><path d="M50 56 H140 V156 Q140 174 122 174 H68 Q50 174 50 156 Z" fill="url(#${g}h)"/>`); },
    card: c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<rect x="24" y="56" width="152" height="96" rx="12" fill="url(#${g})"/><rect x="24" y="78" width="152" height="18" fill="#000" fill-opacity=".4"/><rect x="40" y="112" width="64" height="12" rx="4" fill="#F4F1EA"/><rect x="40" y="130" width="40" height="8" rx="3" fill="#F4F1EA" fill-opacity=".6"/><circle cx="150" cy="128" r="12" fill="#F4F1EA" fill-opacity=".9"/>`); }
  };
  const ART = SHAPES;
  const ACC = '#D97B2B';

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(n => io.observe(n));

  /* hero words */
  document.querySelectorAll('.hero-word').forEach(w => {
    const words = w.textContent.split(' ');
    w.innerHTML = words.map((t, i) => `<span style="animation-delay:${0.08 * i + 0.1}s">${t}</span>`).join(' ');
  });

  /* mobile menu */
  const mb = $('.menu-btn'); if (mb) mb.addEventListener('click', () => $('.links').classList.toggle('open'));

  /* ---------- 1. redemption flow ---------- */
  function redemption(root) {
    const CODES = { 'GIFT-2041': 'Priya N.', 'GIFT-2042': 'Marcus T.', 'GIFT-2043': 'Dana R.' };
    const GIFTS = [
      { id: 'tumbler', name: 'Insulated tumbler 20oz', note: 'Laser engraved', art: ART.tumbler },
      { id: 'blanket', name: 'Fleece blanket', note: 'Embroidered corner', art: ART.blanket },
      { id: 'backpack', name: 'Daypack', note: 'Screen print', art: ART.backpack },
      { id: 'notebook', name: 'Hardcover notebook', note: 'Foil stamp', art: ART.notebook }
    ];
    let step = 0, code = '', gift = null, used = {}, started = false;
    const body = $('.device-body', root);

    function steps() { return `<div class="d-steps">${[0,1,2,3].map(i => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`; }

    function render() {
      if (step === 0) {
        body.innerHTML = steps() + `<div class="fade"><div class="d-title">Claim your gift</div><div class="d-sub">Enter the code from your email.</div>
          <div class="d-row"><input class="d-input" id="rc" placeholder="GIFT-0000" maxlength="9" style="max-width:220px"><button class="btn" id="rgo">Continue</button></div>
          <div class="d-err" id="rerr"></div>
          <div class="demo-note">Try GIFT-2041, GIFT-2042 or GIFT-2043. Each code works once.</div></div>`;
        const inp = $('#rc', body);
        const go = () => {
          const v = inp.value.trim().toUpperCase();
          if (!CODES[v]) { $('#rerr', body).textContent = 'Code not recognised.'; return; }
          if (used[v]) { $('#rerr', body).textContent = 'This code has already been redeemed.'; return; }
          code = v; step = 1; started = true; render();
        };
        $('#rgo', body).onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); }; if (started) inp.focus();
      } else if (step === 1) {
        body.innerHTML = steps() + `<div class="fade"><div class="d-title">Hi ${CODES[code].split(' ')[0]}, pick one</div><div class="d-sub">Your team chose four options. Choose the one you will use.</div>
          <div class="gifts">${GIFTS.map(g => `<button class="gift" data-id="${g.id}">${g.art(ACC)}<b>${g.name}</b><small>${g.note}</small></button>`).join('')}</div>
          <div class="d-row" style="margin-top:14px"><button class="btn" id="rnext" disabled>Continue</button><button class="btn ghost sm" id="rback">Back</button></div></div>`;
        body.querySelectorAll('.gift').forEach(b => b.onclick = () => {
          body.querySelectorAll('.gift').forEach(x => x.classList.remove('sel')); b.classList.add('sel');
          gift = GIFTS.find(g => g.id === b.dataset.id); $('#rnext', body).disabled = false;
        });
        $('#rnext', body).onclick = () => { step = 2; render(); };
        $('#rback', body).onclick = () => { step = 0; render(); };
      } else if (step === 2) {
        body.innerHTML = steps() + `<div class="fade"><div class="d-title">Where should it go?</div><div class="d-sub">US addresses only for this programme.</div>
          <div class="d-form">
            <input class="d-input full" id="fn" placeholder="Full name" value="${CODES[code]}">
            <input class="d-input full" id="a1" placeholder="Street address">
            <input class="d-input" id="ci" placeholder="City"><input class="d-input" id="zp" placeholder="ZIP">
            <input class="d-input full" id="em" placeholder="Email for tracking">
          </div><div class="d-err" id="rerr"></div>
          <div class="d-row"><button class="btn" id="rsub">Confirm gift</button><button class="btn ghost sm" id="rback">Back</button></div></div>`;
        $('#rsub', body).onclick = () => {
          const miss = ['a1', 'ci', 'zp'].filter(id => !$('#' + id, body).value.trim());
          if (miss.length) { $('#rerr', body).textContent = 'Street, city and ZIP are required.'; return; }
          used[code] = true; step = 3; render();
        };
        $('#rback', body).onclick = () => { step = 1; render(); };
      } else {
        body.innerHTML = steps() + `<div class="fade"><div class="d-title"><span class="d-ok">Done.</span> Your ${gift.name.toLowerCase()} is on its way.</div>
          <div class="d-sub">This is what lands in the fulfilment sheet, one row per redemption.</div>
          <div class="d-summary">timestamp &nbsp;<b>${new Date().toISOString().slice(0, 16).replace('T', ' ')}</b><br>code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${code}</b> (now locked)<br>sku &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${gift.id.toUpperCase()}</b><br>name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${$('#fn', body) ? '' : ''}${CODES[code]}</b><br>status &nbsp;&nbsp;&nbsp;<b>new</b></div>
          <div class="d-row" style="margin-top:14px"><button class="btn ghost sm" id="ragain">Try another code</button></div></div>`;
        $('#ragain', body).onclick = () => { step = 0; gift = null; render(); };
      }
    }
    render();
  }

  /* ---------- 2. order board ---------- */
  function board(root) {
    const COLS = ['New', 'Art approved', 'In production', 'Shipped'];
    const today = new Date('2026-09-18');
    let orders = [
      { id: 'SO-1187', client: 'Baylor Dental', item: '300 x Tumbler', vendor: 'Hit Promo', due: '2026-09-20', s: 0 },
      { id: 'SO-1184', client: 'Northwind Logistics', item: '120 x Fleece blanket', vendor: 'Alpha Broder', due: '2026-09-15', s: 1 },
      { id: 'SO-1182', client: 'Ridge Credit Union', item: '500 x Notebook', vendor: 'Journalbooks', due: '2026-09-26', s: 1 },
      { id: 'SO-1179', client: 'Cedar Realty', item: '80 x Daypack', vendor: 'Gemline', due: '2026-09-17', s: 2 },
      { id: 'SO-1175', client: 'Baylor Dental', item: '300 x Tee', vendor: 'SanMar', due: '2026-09-10', s: 3 },
      { id: 'SO-1171', client: 'Lakeside Brewing', item: '200 x Cap', vendor: 'Cap America', due: '2026-09-08', s: 3 }
    ];
    let q = '', lateOnly = false;
    const body = $('.device-body', root);
    body.innerHTML = `<div class="board-tools"><input class="d-input" id="bq" placeholder="Filter by client or vendor"><button class="btn ghost sm" id="blate">Late only</button><span class="d-pill" id="bcount"></span></div><div class="board" id="bcols"></div><div class="demo-note">Click an order to move it to the next stage. Sales sees the email when an order ships.</div>`;
    const cols = $('#bcols', body);

    function isLate(o) { return o.s < 3 && new Date(o.due) < today; }
    function toast(msg) { const t = el('div', 'toast', msg); body.appendChild(t); setTimeout(() => t.remove(), 2400); }
    function render() {
      const vis = orders.filter(o => (!q || (o.client + o.vendor).toLowerCase().includes(q)) && (!lateOnly || isLate(o)));
      $('#bcount', body).textContent = vis.length + ' of ' + orders.length + ' orders';
      cols.innerHTML = COLS.map((c, i) => `<div class="col"><h4>${c}<em>${vis.filter(o => o.s === i).length}</em></h4>${vis.filter(o => o.s === i).map(o => `<div class="ord" data-id="${o.id}"><b>${o.id} · ${o.client}</b><small>${o.item} · ${o.vendor}</small><small>Due ${o.due.slice(5)}${isLate(o) ? ' <span class="late">LATE</span>' : ''}</small>${o.s < 3 ? `<div class="adv">→ ${COLS[o.s + 1]}</div>` : ''}</div>`).join('')}</div>`).join('');
      cols.querySelectorAll('.ord').forEach(n => n.onclick = () => {
        const o = orders.find(x => x.id === n.dataset.id); if (o.s >= 3) return;
        o.s++; render();
        if (o.s === 3) toast('Email sent to sales: ' + o.id + ' shipped');
      });
    }
    $('#bq', body).oninput = e => { q = e.target.value.toLowerCase(); render(); };
    $('#blate', body).onclick = e => { lateOnly = !lateOnly; e.target.classList.toggle('btn'); e.target.classList.toggle('ghost'); render(); };
    render();
  }

  /* ---------- 3. quote calculator ---------- */
  function quote(root) {
    const PRODUCTS = {
      tumbler: { name: 'Insulated tumbler 20oz', tiers: [[24, 14.9], [100, 12.4], [250, 10.8], [500, 9.6]], setup: 45, art: ART.tumbler },
      tee: { name: 'Cotton tee', tiers: [[24, 9.2], [100, 7.4], [250, 6.1], [500, 5.3]], setup: 30, art: ART.tee },
      notebook: { name: 'Hardcover notebook', tiers: [[50, 8.5], [100, 7.2], [250, 6.4], [500, 5.9]], setup: 40, art: ART.notebook },
      cap: { name: 'Structured cap', tiers: [[24, 11.5], [100, 9.8], [250, 8.4], [500, 7.6]], setup: 50, art: ART.cap }
    };
    const DECO = { none: ['Blank', 0], one: ['1 colour print', 0], two: ['2 colour print', 0.6], emb: ['Embroidery', 1.4], laser: ['Laser engrave', 0.9] };
    const body = $('.device-body', root);
    body.innerHTML = `<div class="quote"><div>
      <label>Product</label><select id="qp">${Object.entries(PRODUCTS).map(([k, p]) => `<option value="${k}">${p.name}</option>`).join('')}</select>
      <label>Quantity <span id="qqv" class="d-pill acc">100</span></label><input type="range" id="qq" min="24" max="1000" step="1" value="100"><div class="tiers" id="qt"></div>
      <label>Decoration</label><select id="qd">${Object.entries(DECO).map(([k, d]) => `<option value="${k}">${d[0]}</option>`).join('')}</select>
      <label>Margin %</label><input type="number" id="qm" value="35" min="0" max="80">
    </div><div class="q-out" id="qo"></div></div><div class="demo-note">Illustrative prices. The real tool reads your product master and vendor cost sheets.</div>`;
    function calc() {
      const p = PRODUCTS[$('#qp', body).value], qty = +$('#qq', body).value, d = DECO[$('#qd', body).value], m = +$('#qm', body).value / 100;
      $('#qqv', body).textContent = qty;
      let ti = 0; p.tiers.forEach((t, i) => { if (qty >= t[0]) ti = i; });
      $('#qt', body).innerHTML = p.tiers.map((t, i) => `<span class="${i === ti ? 'on' : ''}">${t[0]}+ ${money(t[1])}</span>`).join('');
      const unitCost = p.tiers[ti][1] + d[1], setup = d[1] === 0 && $('#qd', body).value === 'none' ? 0 : p.setup;
      const cost = unitCost * qty + setup, price = cost / (1 - m), unit = price / qty;
      $('#qo', body).innerHTML = `<div style="height:70px;width:70px;margin-bottom:6px">${p.art(ACC)}</div><span class="d-pill">Quote</span><div class="big">${money(price)}<small> total</small></div>
        <table><tr><td>${qty} × ${p.name}</td><td>${money(p.tiers[ti][1])} ea</td></tr><tr><td>${d[0]}</td><td>${d[1] ? '+' + money(d[1]) + ' ea' : 'included'}</td></tr><tr><td>Setup</td><td>${money(setup)}</td></tr><tr><td>Cost</td><td>${money(cost)}</td></tr><tr><td><b style="color:var(--accent)">Sell price per unit</b></td><td><b style="color:var(--accent)">${money(unit)}</b></td></tr></table>`;
    }
    body.querySelectorAll('select,input').forEach(n => n.oninput = calc); calc();
  }

  /* ---------- 4. kit builder ---------- */
  function kit(root) {
    const ITEMS = [
      { id: 'tumbler', name: 'Tumbler', p: 12.4, art: ART.tumbler }, { id: 'tee', name: 'Tee', p: 7.4, art: ART.tee },
      { id: 'notebook', name: 'Notebook', p: 7.2, art: ART.notebook }, { id: 'cap', name: 'Cap', p: 9.8, art: ART.cap },
      { id: 'mug', name: 'Mug', p: 6.5, art: ART.mug }, { id: 'card', name: '$25 gift card', p: 25, art: ART.card }
    ];
    const BUDGET = 45; let sel = [];
    const body = $('.device-body', root);
    body.innerHTML = `<div class="kit"><div><div class="d-title">Build your welcome kit</div><div class="d-sub">Budget per new hire: <b class="mono" style="color:var(--accent)">${money(BUDGET)}</b>. Tap to add or remove.</div><div class="kit-items" id="ki"></div></div>
      <div class="kit-box"><div class="kit-viz" id="kv"><div class="kb"><i></i></div></div><div class="d-row" style="justify-content:space-between"><span class="d-pill">Kit total</span><b class="mono" id="kt">$0.00</b></div><div class="meter"><i id="km"></i></div><div class="kit-list" id="kl"></div><button class="btn sm" id="kgo" disabled style="margin-top:10px">Approve kit</button><div class="d-err" id="kerr"></div></div></div>
      <div class="demo-note">The real builder pulls items and prices from your product master and enforces the client's budget per recipient.</div>`;
    function render() {
      const total = sel.reduce((s, i) => s + i.p, 0), over = total > BUDGET;
      $('#ki', body).innerHTML = ITEMS.map(i => `<button class="gift ${sel.includes(i) ? 'sel' : ''}" data-id="${i.id}">${i.art(ACC)}<b>${i.name}</b><small>${money(i.p)}</small></button>`).join('');
      body.querySelectorAll('.gift').forEach(b => b.onclick = () => { const it = ITEMS.find(i => i.id === b.dataset.id); sel = sel.includes(it) ? sel.filter(x => x !== it) : [...sel, it]; render(); });
      $('#kt', body).textContent = money(total); $('#kt', body).style.color = over ? '#E0684B' : 'var(--text)';
      const m = $('#km', body); m.style.width = Math.min(100, total / BUDGET * 100) + '%'; m.classList.toggle('over', over);
      $('#kl', body).innerHTML = sel.map(i => `<div><span>${i.name}</span><span>${money(i.p)}</span></div>`).join('') || '<div><span class="muted">Nothing added yet</span><span></span></div>';
      $('#kv', body).innerHTML = '<div class="kb"><i></i></div>' + sel.map((i, n) => `<div class="ki" style="left:${30 + n * 28}px;background:${n % 2 ? '#E6E8EB' : '#8B929C'}"></div>`).join('');
      $('#kerr', body).textContent = over ? 'Over budget by ' + money(total - BUDGET) : '';
      const go = $('#kgo', body); go.disabled = !sel.length || over;
      go.onclick = () => { go.textContent = 'Kit approved'; go.disabled = true; $('#kerr', body).innerHTML = '<span class="d-ok">Saved to the programme. Ready for the redemption site.</span>'; };
    }
    render();
  }

  /* ---------- 5. merch designer ---------- */
  function designer(root) {
    /* print areas are in the 200x200 product viewBox; the canvas scales the product to CW px */
    const PROD = {
      tee: { name: 'Tee', area: { x: 74, y: 70, w: 52, h: 60 } },
      cap: { name: 'Cap', area: { x: 76, y: 76, w: 48, h: 36 } },
      tumbler: { name: 'Tumbler', area: { x: 76, y: 70, w: 44, h: 72 } },
      tote: { name: 'Tote', area: { x: 66, y: 84, w: 68, h: 60 } }
    };
    SHAPES.tote = c => { const g = 'g' + (++gid); return wrap(shade(c, g) + `<path d="M70 26 Q100 4 130 26 L124 40 Q100 22 76 40 Z" fill="none" stroke="#2A2E36" stroke-width="7"/><path d="M40 60 H160 L150 178 Q100 186 50 178 Z" fill="url(#${g})"/><path d="M40 60 H160 L150 178 Q100 186 50 178 Z" fill="url(#${g}h)"/><path d="M40 60 H160" stroke="#000" stroke-opacity=".25" stroke-width="4"/>`); };
    const COLORS = [['#1C1D22', 'Black'], ['#F4F1EA', 'Natural'], ['#1F4E79', 'Navy'], ['#D97B2B', 'Orange'], ['#3E7C59', 'Forest'], ['#7A2E2E', 'Maroon'], ['#8B929C', 'Heather']];
    let CW = 320; /* product render size in px, set from the canvas width */
    let prod = 'tee', color = COLORS[2][0], mark = 'colour', size = 44, pos = null, method = 'Screen print';
    const body = $('.device-body', root);
    body.innerHTML = `<div class="designer"><div class="canvas" id="dc"></div><div class="dz-panel">
      <div><label>Product</label><div class="seg" id="dp">${Object.entries(PROD).map(([k, p]) => `<button data-k="${k}" class="${k === prod ? 'on' : ''}">${p.name}</button>`).join('')}</div></div>
      <div><label>Colour <span class="muted" id="dcn"></span></label><div class="swatches" id="ds">${COLORS.map(c => `<button data-c="${c[0]}" title="${c[1]}" style="background:${c[0]}" class="${c[0] === color ? 'on' : ''}"></button>`).join('')}</div></div>
      <div><label>Artwork</label><div class="seg" id="dm"><button data-m="colour" class="on">Full colour</button><button data-m="ink">One colour</button></div></div>
      <div><label>Method</label><div class="seg" id="dme"><button class="on">Screen print</button><button>Embroidery</button><button>Laser</button></div></div>
      <div class="range-wrap"><label>Logo size <span class="muted" id="dsv"></span></label><input type="range" id="dsz" min="20" max="100" value="${size}"></div>
      <div class="d-summary" id="dsum"></div></div></div>
      <div class="demo-note">Drag the logo inside the print area. The real tool takes the client's uploaded artwork and writes this spec to the order.</div>`;
    const canvas = $('#dc', body);
    CW = Math.max(220, Math.min(340, canvas.clientWidth - 24));
    const scale = () => CW / 200;
    function areaPx() { const a = PROD[prod].area, s = scale(); return { x: a.x * s, y: a.y * s, w: a.w * s, h: a.h * s }; }
    function logoPx() { return areaPx().w * size / 100; }
    function clamp() { const a = areaPx(), l = logoPx(); pos.x = Math.max(a.x, Math.min(a.x + a.w - l, pos.x)); pos.y = Math.max(a.y, Math.min(a.y + a.h - l, pos.y)); }
    function centre() { const a = areaPx(), l = logoPx(); pos = { x: a.x + (a.w - l) / 2, y: a.y + (a.h - l) / 2 }; }
    function logoSvg(px) {
      const light = ['#F4F1EA', '#8B929C'].includes(color);
      const ink = mark === 'ink' ? (light ? '#17181C' : '#F4F1EA') : null;
      const a = ink || '#D97B2B', g = ink || '#F4F1EA', s = ink || (light ? '#17181C' : '#F4F1EA');
      return `<svg viewBox="0 0 100 100" width="${px}" height="${px}"><rect x="16" y="46" width="68" height="42" rx="6" fill="${a}"/><rect x="44" y="46" width="12" height="42" fill="${g}"/><g transform="rotate(-12 10 48)"><rect x="10" y="32" width="80" height="16" rx="5" fill="${a}"/><rect x="44" y="32" width="12" height="16" fill="${g}"/><path d="M50 31 C36 12 28 22 50 31 C64 12 72 22 50 31 Z" fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"/></g></svg>`;
    }
    function spec() {
      const a = areaPx(), s = scale();
      const cm = v => (v / s * 0.12).toFixed(1); /* 200 units ≈ 24 cm garment width, illustrative */
      $('#dsum', body).innerHTML = `product &nbsp;&nbsp;<b>${PROD[prod].name}</b> · ${COLORS.find(c => c[0] === color)[1]}<br>method &nbsp;&nbsp;&nbsp;<b>${method}</b><br>artwork &nbsp;&nbsp;<b>${mark === 'ink' ? '1 colour' : 'full colour'}</b> · ${cm(logoPx())} cm wide<br>offset &nbsp;&nbsp;&nbsp;<b>${cm(pos.x - a.x)} cm, ${cm(pos.y - a.y)} cm</b> from print area origin`;
      $('#dsv', body).textContent = size + '%'; $('#dcn', body).textContent = COLORS.find(c => c[0] === color)[1];
    }
    function render() {
      if (!pos) centre(); clamp();
      const a = areaPx(), l = logoPx();
      canvas.innerHTML = `<div class="stage" style="width:${CW}px;height:${CW}px">${SHAPES[prod](color)}<div class="parea" style="left:${a.x}px;top:${a.y}px;width:${a.w}px;height:${a.h}px"></div><div class="logo" id="dl" style="left:${pos.x}px;top:${pos.y}px;width:${l}px;height:${l}px">${logoSvg(l)}</div></div>`;
      spec();
      const el = $('#dl', body); let drag = null;
      el.onpointerdown = e => { drag = { dx: e.clientX - pos.x, dy: e.clientY - pos.y }; el.setPointerCapture(e.pointerId); el.classList.add('drag'); };
      el.onpointermove = e => { if (!drag) return; pos = { x: e.clientX - drag.dx, y: e.clientY - drag.dy }; clamp(); el.style.left = pos.x + 'px'; el.style.top = pos.y + 'px'; spec(); };
      el.onpointerup = () => { drag = null; el.classList.remove('drag'); };
    }
    const seg = (sel, fn) => $(sel, body).querySelectorAll('button').forEach(b => b.onclick = () => { $(sel, body).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); fn(b); render(); });
    seg('#dp', b => { prod = b.dataset.k; pos = null; });
    seg('#ds', b => { color = b.dataset.c; });
    seg('#dm', b => { mark = b.dataset.m; });
    seg('#dme', b => { method = b.textContent; });
    $('#dsz', body).oninput = e => { const c = { x: pos.x + logoPx() / 2, y: pos.y + logoPx() / 2 }; size = +e.target.value; pos = { x: c.x - logoPx() / 2, y: c.y - logoPx() / 2 }; render(); };
    render();
  }

  /* ---------- mount ---------- */
  const DEMOS = { redemption, board, quote, kit, designer };
  document.querySelectorAll('[data-demo]').forEach(n => { const f = DEMOS[n.dataset.demo]; if (f) f(n); });
})();
