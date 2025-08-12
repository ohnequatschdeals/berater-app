// dashboard.js
(() => {
  const $ = (sel) => document.querySelector(sel);

  const fmtDate = (iso) => {
    if (!iso) return '-';
    try {
      return new Date(iso).toLocaleDateString('de-DE', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
    } catch { return '-'; }
  };

  const setText = (sel, value) => {
    const el = $(sel);
    if (el) el.textContent = value ?? '-';
  };

  const load = async () => {
    const pre = $('#api');
    try {
      if (pre) pre.textContent = 'Lade…';

      const res = await fetch('/api', { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      const data = await res.json();

      // JSON hübsch in <pre> anzeigen
      if (pre) pre.textContent = JSON.stringify(data, null, 2);

      // Kacheln befüllen (per data-Attribut)
      setText('[data-berater]', data.beraterName);
      setText('[data-kunden]', data.kundenAnzahl);
      setText('[data-deal]', data.letzterDeal?.produkt);
      setText('[data-deal-date]', fmtDate(data.letzterDeal?.datum));
      setText('[data-tickets]', data.offeneTickets);
    } catch (e) {
      if (pre) pre.textContent = 'Fehler beim Laden: ' + e.message;
    }
  };

  load();
})();
