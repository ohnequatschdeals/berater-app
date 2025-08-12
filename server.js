// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Statische Dateien aus dem Repo-Root (index.html, dashboard.html, style.css, …)
app.use(express.static(__dirname));

// Seitenrouten
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (_req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/links', (_req, res) => res.sendFile(path.join(__dirname, 'links.html')));
app.get('/profile', (_req, res) => res.sendFile(path.join(__dirname, 'profile.html')));

// ✨ Erweiterte Test‑API fürs Dashboard
app.get('/api', (_req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),

    // -> Beispielwerte – später aus DB/API ersetzen
    beraterName: 'Nursel Demir',
    kundenAnzahl: 128,
    letzterDeal: {
      produkt: 'Vodafone Cable 250',
      datum: '2025-08-10',
      status: 'abgeschlossen'
    },
    offeneTickets: 3
  });
});

// Fallback
app.use((_req, res) => res.status(404).sendFile(path.join(__dirname, 'index.html')));

// Start
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
