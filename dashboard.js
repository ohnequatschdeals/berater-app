(() => {
  const pre = document.getElementById('api');          // vorhandenes <pre id="api">
  const card = pre?.closest('.card') || document.body; // wohin rendern
  const errBox = document.getElementById('api-error'); // optionaler Fehler-<p>

  // Mini-Loader im <pre>, bis Daten da sind
  if (pre) pre.textContent = 'Skript geladen – hole API …';

  // Hilfsfunktionen
  const fmtTime = iso =>
    new Date(iso).toLocaleString('de-DE', { dateStyle:'medium', timeStyle:'medium' });

  const buildUI = (data) => {
    // vorhandenes <pre> ausblenden
    if (pre) pre.style.display = 'none';
    // Fehlerbox verstecken
    if (errBox) { errBox.hidden = true; errBox.textContent = ''; }

    // UI-Container bauen
    const box = document.createElement('div');
    box.className = 'api-ui';

    box.innerHTML = `
      <div class="row">
        <span class="label">Status</span>
        <span class="badge ${data.ok ? 'ok' : 'bad'}">${data.ok ? 'OK' : 'Fehler'}</span>
      </div>
      <div class="row">
        <span class="label">Umgebung</span>
        <span class="value">${data.env || '–'}</span>
      </div>
      <div class="row">
        <span class="label">Zeit</span>
        <span class="value">${data.time ? fmtTime(data.time) : '–'}</span>
      </div>
    `;

    // in die Karte einsetzen (unter die Überschrift)
    if (card.querySelector('h2')) {
      card.querySelector('h2').after(box);
    } else {
      card.appendChild(box);
    }
  };

  const showError = (msg) => {
    if (pre) { pre.style.display = 'block'; pre.textContent = ''; }
    if (errBox) { errBox.hidden = false; errBox.textContent = 'Fehler: ' + msg; }
    else alert('Fehler: ' + msg);
  };

  // API holen
  fetch('/api', { headers: { 'Accept': 'application/json' } })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(buildUI)
    .catch(e => showError(e.message));
})();
