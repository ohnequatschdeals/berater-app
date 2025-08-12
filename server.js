// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Render gibt den Port über process.env.PORT vor
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Statische Dateien (HTML, CSS, JS, Bilder)
app.use(express.static(__dirname));

// Routen für Seiten
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

// Kleine Test-API
app.get('/api', (_req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

// Fallback für unbekannte Routen
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
