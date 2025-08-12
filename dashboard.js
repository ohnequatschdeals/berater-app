(() => {
  // Hilfsformatierer
  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Kachel-UI bauen
  const buildUI = (data) => {
    const main = document.querySelector('main.container');
    if (!main) return;

    // Vorhandene Box entfernen (bei Reload)
    const old = main.querySelector('.api-ui');
    if (old) old.remove();

    const ui = document.createElement('div');
    ui.className = 'api-ui';
    ui.innerHTML = `
      <div class="stat">
        <div class="stat-icon">👤</div>
        <div class="stat-label">Berater</div>
        <div class="stat-value">${data.beraterName}</div>
      </div>

      <div class="stat">
        <div class="stat-icon">👥</div>
        <div class="stat-label">Kunden</div>
        <div class="stat-value">${data.kundenAnzahl}</div>
      </div>

      <div class="stat">
        <div class="stat-icon">✅</div>
        <div class="stat-label">Letzter Deal</div>
        <div class="stat-value">${data.letzterDeal?.produkt || '—'}</div>
        <div class="stat-sub">${data.letzterDeal?.datum ? fmtDate(data.letzterDeal.datum) : ''}</div>
      </div>

      <div class="stat">
        <div class="stat-icon">📩</div>
        <div class="stat-label">Offene Tickets</div>
        <div class="stat-value">${data.offeneTickets ?? 0}</div>
      </div>
    `;
    main.appendChild(ui);
  };

  // API laden
  fetch('/api', { headers: { Accept: 'application/json' } })
    .then((res) => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(buildUI)
    .catch((e) => {
      console.error('API-Fehler:', e);
    });
})();
