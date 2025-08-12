// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Statische Dateien aus dem Repo-Root ausliefern
app.use(express.static(__dirname));

// Seiten-Routen
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (_req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/links', (_req, res) => res.sendFile(path.join(__dirname, 'links.html')));
app.get('/profile', (_req, res) => res.sendFile(path.join(__dirname, 'profile.html')));

// Beispiel‑API (Dashboard nutzt sie)
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
      status: 'abgeschlossen',
    },
    offeneTickets: 3,
  });
});

// Fallback: unbekannte Pfade -> Startseite
app.use((_req, res) => res.status(404).sendFile(path.join(__dirname, 'index.html')));

// Start
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
