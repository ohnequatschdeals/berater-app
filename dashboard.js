(() => {
  const pre = document.getElementById('api');
  if (!pre) return;
  pre.textContent = 'Skript geladen – hole API …';

  fetch('/api', { headers: { 'Accept': 'application/json' } })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(data => {
      // API-Antwort als JSON anzeigen
      pre.textContent = JSON.stringify(data, null, 2);

      // UI-Bereich erstellen
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
          <div class="stat-value">${data.letzterDeal.produkt}</div>
          <div class="stat-sub">${new Date(data.letzterDeal.datum).toLocaleDateString('de-DE')}</div>
        </div>
        <div class="stat">
          <div class="stat-icon">✉️</div>
          <div class="stat-label">Offene Tickets</div>
          <div class="stat-value">${data.offeneTickets}</div>
        </div>
      `;
      pre.insertAdjacentElement('afterend', box);
    })
    .catch(e => {
      pre.textContent = 'Fehler beim Laden: ' + e.message;
    });
})();
