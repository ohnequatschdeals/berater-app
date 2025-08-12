// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // <-- Render gibt PORT vor!

// Basis‑Middleware
app.use(cors());
app.use(bodyParser.json());

// Statische Dateien aus dem Repo-Root ausliefern
// (index.html, dashboard.html, links.html, profile.html, style.css, dashboard.js, …)
app.use(express.static(__dirname, { extensions: ['html'] }));

// Seitenrouten (optional – durch express.static ginge es auch direkt per Datei)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/dashboard', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});
app.get('/links', (_req, res) => {
  res.sendFile(path.join(__dirname, 'links.html'));
});
app.get('/profile', (_req, res) => {
  res.sendFile(path.join(__dirname, 'profile.html'));
});

// Test‑API fürs Dashboard
app.get('/api', (_req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
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

// Healthcheck (Render pingen lassen ist praktisch)
app.get('/healthz', (_req, res) => {
  res.status(200).send('ok');
});

// Fallback: Unbekannte Pfade -> Startseite (Single-Page-Feeling)
// oder nutze res.status(404).send('Not found') wenn du echtes 404 willst.
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
