(() => {
  const $ = (id) => document.getElementById(id);

  const pre = $('api'); // Kasten mit Roh-JSON

  // Platzhalter (falls API mal nicht da ist)
  const placeholder = {
    ok: true,
    env: 'development',
    time: new Date().toISOString(),
    beraterName: 'Dein Name',
    kundenAnzahl: 0,
    letzterDeal: { produkt: 'Produktname', datum: null, status: '—' },
    offeneTickets: 0,
  };

  const fillUI = (data) => {
    $('beraterName').textContent = data.beraterName ?? placeholder.beraterName;
    $('kundenAnzahl').textContent = (data.kundenAnzahl ?? placeholder.kundenAnzahl).toString().padStart(3, '0');

    const deal = data.letzterDeal ?? placeholder.letzterDeal;
    $('letzterDeal').textContent = deal?.produkt ?? placeholder.letzterDeal.produkt;
    $('letzterDealDatum').textContent = deal?.datum
      ? new Date(deal.datum).toLocaleDateString('de-DE')
      : '';

    $('offeneTickets').textContent = (data.offeneTickets ?? placeholder.offeneTickets).toString();
  };

  const showJson = (obj) => {
    if (pre) pre.textContent = JSON.stringify(obj, null, 2);
  };

  const load = async () => {
    try {
      const res = await fetch('/api', { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      showJson(data);
      fillUI(data);
    } catch (e) {
      // Fallback: Platzhalter anzeigen
      showJson({ error: e.message, using: 'placeholder', ...placeholder });
      fillUI(placeholder);
    }
  };

  load();
})();
