(() => {
  const box = document.getElementById('api');
  if (!box) return;
  box.textContent = 'Skript geladen, hole API …';

  fetch('/api', { headers: { 'Accept': 'application/json' }, cache: 'no-store' })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(data => {
      box.textContent = JSON.stringify(data, null, 2);
    })
    .catch(e => {
      box.textContent = 'Fehler beim Laden: ' + e.message;
    });
})();
