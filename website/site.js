/* Merchtech site: scroll reveal, hero word animation, five client-side demos.
   All demo data is illustrative and lives only in the page. Nothing is sent anywhere. */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const money = n => '$' + n.toFixed(2);

  /* product illustrations, drawn inline so nothing external loads */
  const ART = {
    tumbler: c => `<svg viewBox="0 0 100 100"><path d="M30 12h40l-4 76a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6z" fill="${c}"/><rect x="28" y="8" width="44" height="10" rx="3" fill="#E6E8EB"/><rect x="36" y="40" width="28" height="18" rx="2" fill="rgba(0,0,0,.25)"/></svg>`,
    blanket: c => `<svg viewBox="0 0 100 100"><rect x="14" y="30" width="72" height="50" rx="6" fill="${c}"/><path d="M14 44h72M14 58h72M14 72h72" stroke="rgba(0,0,0,.2)" stroke-width="3"/><rect x="20" y="22" width="60" height="14" rx="5" fill="#E6E8EB"/></svg>`,
    backpack: c => `<svg viewBox="0 0 100 100"><rect x="24" y="24" width="52" height="66" rx="14" fill="${c}"/><rect x="34" y="12" width="32" height="16" rx="8" fill="#8B929C"/><rect x="30" y="56" width="40" height="24" rx="6" fill="rgba(0,0,0,.25)"/><rect x="42" y="36" width="16" height="6" rx="3" fill="#E6E8EB"/></svg>`,
    notebook: c => `<svg viewBox="0 0 100 100"><rect x="24" y="14" width="56" height="72" rx="5" fill="${c}"/><rect x="20" y="20" width="8" height="60" rx="3" fill="#8B929C"/><path d="M40 34h28M40 46h28M40 58h20" stroke="rgba(0,0,0,.3)" stroke-width="3"/></svg>`,
    tee: c => `<svg viewBox="0 0 100 100"><path d="M34 16l16 6 16-6 18 12-8 14-8-4v48H32V38l-8 4-8-14z" fill="${c}"/></svg>`,
    cap: c => `<svg viewBox="0 0 100 100"><path d="M22 58a28 28 0 0 1 56 0z" fill="${c}"/><path d="M14 58h76a4 4 0 0 1 0 8H40q-20 0-26-8z" fill="rgba(0,0,0,.35)"/></svg>`,
    mug: c => `<svg viewBox="0 0 100 100"><rect x="22" y="28" width="46" height="52" rx="6" fill="${c}"/><path d="M68 40h8a10 10 0 0 1 0 22h-8" fill="none" stroke="${c}" stroke-width="8"/><rect x="30" y="44" width="30" height="16" rx="2" fill="rgba(0,0,0,.25)"/></svg>`,
    card: c => `<svg viewBox="0 0 100 100"><rect x="14" y="30" width="72" height="44" rx="6" fill="${c}"/><rect x="14" y="42" width="72" height="8" fill="rgba(0,0,0,.35)"/><rect x="22" y="58" width="30" height="6" rx="2" fill="#E6E8EB"/></svg>`
  };
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
    const PROD = {
      tee: c => `<svg class="prod" viewBox="0 0 100 120"><path d="M34 16l16 6 16-6 18 12-8 14-8-4v66H32V38l-8 4-8-14z" fill="${c}" stroke="rgba(255,255,255,.08)"/></svg>`,
      tumbler: c => `<svg class="prod" viewBox="0 0 100 120"><path d="M30 18h40l-4 88a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6z" fill="${c}"/><rect x="28" y="12" width="44" height="12" rx="4" fill="#E6E8EB"/></svg>`,
      cap: c => `<svg class="prod" viewBox="0 0 100 120"><path d="M20 70a30 30 0 0 1 60 0z" fill="${c}"/><path d="M10 70h80a5 5 0 0 1 0 10H40q-22 0-30-10z" fill="rgba(0,0,0,.35)"/></svg>`
    };
    const COLORS = ['#17181C', '#F4F1EA', '#1F4E79', '#D97B2B', '#4CAF7D', '#7A2E2E'];
    let prod = 'tee', color = COLORS[2], pos = { x: 0, y: 0 }, size = 60, mark = 'colour';
    const body = $('.device-body', root);
    body.innerHTML = `<div class="designer"><div class="canvas" id="dc"></div><div class="dz-panel">
      <label>Product</label><div class="seg" id="dp">${Object.keys(PROD).map(k => `<button data-k="${k}" class="${k === prod ? 'on' : ''}">${k}</button>`).join('')}</div>
      <label>Colour</label><div class="swatches" id="ds">${COLORS.map(c => `<button data-c="${c}" style="background:${c}" class="${c === color ? 'on' : ''}"></button>`).join('')}</div>
      <label>Logo</label><div class="seg" id="dm"><button data-m="colour" class="on">colour</button><button data-m="ink">one colour</button></div>
      <label>Logo size</label><input type="range" id="dsz" min="30" max="110" value="${size}">
      <div class="d-summary" id="dsum"></div></div></div>
      <div class="demo-note">Drag the logo. The real tool takes the client's uploaded artwork and writes the placement spec to the order.</div>`;
    const canvas = $('#dc', body);
    function logoSvg() {
      const ink = mark === 'ink' ? (color === '#F4F1EA' ? '#17181C' : '#F4F1EA') : null;
      const a = ink || '#D97B2B', g = ink || '#F4F1EA', s = ink || (color === '#17181C' ? '#F4F1EA' : '#17181C');
      return `<svg viewBox="0 0 100 100" width="${size}" height="${size}"><rect x="16" y="46" width="68" height="42" rx="6" fill="${a}"/><rect x="44" y="46" width="12" height="42" fill="${g}"/><g transform="rotate(-12 10 48)"><rect x="10" y="32" width="80" height="16" rx="5" fill="${a}"/><rect x="44" y="32" width="12" height="16" fill="${g}"/><path d="M50 31 C36 12 28 22 50 31 C64 12 72 22 50 31 Z" fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"/></g></svg>`;
    }
    function render() {
      canvas.innerHTML = PROD[prod](color) + `<div class="logo" id="dl" style="transform:translate(${pos.x}px,${pos.y}px)">${logoSvg()}</div>`;
      $('#dsum', body).innerHTML = `product &nbsp;<b>${prod}</b><br>colour &nbsp;&nbsp;<b>${color}</b><br>logo &nbsp;&nbsp;&nbsp;&nbsp;<b>${mark}</b> ${size}px<br>offset &nbsp;&nbsp;<b>${pos.x | 0}, ${pos.y | 0}</b>`;
      const l = $('#dl', body); let drag = null;
      l.onpointerdown = e => { drag = { sx: e.clientX - pos.x, sy: e.clientY - pos.y }; l.setPointerCapture(e.pointerId); };
      l.onpointermove = e => { if (!drag) return; pos = { x: e.clientX - drag.sx, y: e.clientY - drag.sy }; l.style.transform = `translate(${pos.x}px,${pos.y}px)`; $('#dsum', body).querySelectorAll('b')[3].textContent = `${pos.x | 0}, ${pos.y | 0}`; };
      l.onpointerup = () => { drag = null; };
    }
    $('#dp', body).querySelectorAll('button').forEach(b => b.onclick = () => { prod = b.dataset.k; $('#dp', body).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); render(); });
    $('#ds', body).querySelectorAll('button').forEach(b => b.onclick = () => { color = b.dataset.c; $('#ds', body).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); render(); });
    $('#dm', body).querySelectorAll('button').forEach(b => b.onclick = () => { mark = b.dataset.m; $('#dm', body).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); render(); });
    $('#dsz', body).oninput = e => { size = +e.target.value; render(); };
    render();
  }

  /* ---------- mount ---------- */
  const DEMOS = { redemption, board, quote, kit, designer };
  document.querySelectorAll('[data-demo]').forEach(n => { const f = DEMOS[n.dataset.demo]; if (f) f(n); });
})();
