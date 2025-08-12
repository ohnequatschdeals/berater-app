(async () => {
  const box = document.getElementById('api'); // <- passt zu <pre id="api">
  try {
    const res = await fetch('/api', { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    box.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    box.textContent = 'Fehler beim Laden: ' + e.message;
  }
})();
