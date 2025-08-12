(() => {
  // Ziel-Elemente aus dashboard.html
  const pre = document.getElementById('api');              // <pre id="api">
  const card = pre?.closest('.card') || document.body;     // Karte, in die wir UI einsetzen

  // Mini-Utils
  const fmtDate = (iso) => new Date(iso).toLocaleDateString('de-DE', { dateStyle: 'medium' });

  // Ein bisschen CSS für die kleinen Statistik-Kacheln nachladen
  const style = document.createElement('style');
  style.textContent = `
    .stats { display:grid; gap:14px; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); margin-top:14px; }
    .stat { padding:14px; border-radius:10px; background: rgba(255,255,255,.08); color:#111; backdrop-filter: blur(6px); }
    .stat h3 { margin:0 0 6px; font-size:14px; opacity:.75; }
    .stat .v { font-size:20px; font-weight:700; }
    .stat .i { margin-right:8px; }
    .api-raw { margin-top:16px; font-size:12px; opacity:.8; }
    @media (prefers-color-scheme: dark){
      .stat{ color:#fff; }
    }
  `;
  document.head.appendChild(style);

  // UI-Container direkt UNTER dem <pre> anlegen
  const ui = document.createElement('div');
  card.appendChild(ui);

  // Laden-Hinweis
  if (pre) pre.textContent = 'Skript geladen – hole API …';

  // API abrufen
  fetch('/api', { headers: { 'Accept': 'application/json' } })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(data => {
      // Roh-JSON schön formatiert anzeigen (lassen wir unterhalb stehen)
      if (pre) {
        pre.textContent = JSON.stringify(data, null, 2);
        pre.classList.add('api-raw');
      }

      // Schöne Stats bauen
      const stats = document.createElement('div');
      stats.className = 'stats';

      stats.innerHTML = `
        <div class="stat">
          <h3><span class="i">👤</span>Berater</h3>
          <div class="v">${data.beraterName ?? '—'}</div>
        </div>
        <div class="stat">
          <h3><span class="i">👥</span>Kunden</h3>
          <div class="v">${Number.isFinite(data.kundenAnzahl) ? data.kundenAnzahl : '—'}</div>
        </div>
        <div class="stat">
          <h3><span class="i">✅</span>Letzter Deal</h3>
          <div class="v">${data.letzterDeal?.produkt ?? '—'}</div>
          <div style="opacity:.7;font-size:12px">${data.letzterDeal?.datum ? fmtDate(data.letzterDeal.datum) : ''}</div>
        </div>
        <div class="stat">
          <h3><span class="i">📨</span>Offene Tickets</h3>
          <div class="v">${Number.isFinite(data.offeneTickets) ? data.offeneTickets : 0}</div>
        </div>
      `;

      ui.replaceChildren(stats);
    })
    .catch(e => {
      if (pre) pre.textContent = 'Fehler beim Laden: ' + e.message;
    });
})();
