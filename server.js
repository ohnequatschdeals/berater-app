const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Statische Dateien ausliefern (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// API-Route
app.get('/api', (req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'production',
    time: new Date().toISOString(),
    beraterName: "Nursel Demir",
    kundenAnzahl: 128,
    letzterDeal: {
      produkt: "Vodafone Cable 250",
      datum: "2025-08-10",
      status: "abgeschlossen"
    },
    offeneTickets: 3
  });
});

// Startseite ausliefern
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
