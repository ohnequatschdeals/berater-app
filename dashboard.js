(() => {
  const pre = document.getElementById('api');
  const card = pre?.closest('.card') || document.body;
  const errBox = document.getElementById('api-error');

  // Mini‑Loader
  if (pre) pre.textContent = 'Lade…';
  if (errBox) errBox.hidden = true;

  const fmtTime = iso =>
    new Date(iso).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' });

  const buildUI = (data) => {
    if (pre) pre.style.display = 'none';
    if (errBox) { errBox.hidden = true; errBox.textContent = ''; }

    const box = document.createElement('div');
    box.className = 'api-ui';
    box.innerHTML = `
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
        <div class="stat-value">${data.letzterDeal?.produkt ?? '-'}</div>
        <div class="stat-sub">${data.letzterDeal?.datum ?? ''}</div>
      </div>
      <div class="stat">
        <div class="stat-icon">📨</div>
        <div class="stat-label">Offene Tickets</div>
        <div class="stat-value">${data.offeneTickets}</div>
      </div>
    `;
    card.parentNode.insertBefore(box, card.nextSibling);
  };

  fetch('/api', { headers: { Accept: 'application/json' } })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(data => {
      if (pre) pre.textContent = JSON.stringify(data, null, 2);
      buildUI(data);
    })
    .catch(e => {
      if (pre) pre.textContent = '';
      if (errBox) { errBox.hidden = false; errBox.textContent = 'Fehler beim Laden: ' + e.message; }
    });
})();
