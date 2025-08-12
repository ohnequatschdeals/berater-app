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

// 🔒 Statische Dateien (HTML/CSS/JS/Bilder) aus dem Repo‑Ordner bereitstellen
// (deine Dateien liegen im Root: index.html, dashboard.html, …)
app.use(express.static(__dirname));

// 🔧 Routen für Seiten
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

// Kleine Test‑API (wird im Dashboard angezeigt)
app.get('/api', (_req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

// Fallback: unbekannte Pfade → Startseite oder 404
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
