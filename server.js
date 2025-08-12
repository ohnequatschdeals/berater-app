const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS & JSON
app.use(cors());
app.use(express.json());

// Preferiere /public, fallback auf Projekt-Root
const PUBLIC_DIR = path.join(__dirname, 'public');
const FALLBACK_DIR = __dirname;
const STATIC_DIR = fs.existsSync(PUBLIC_DIR) ? PUBLIC_DIR : FALLBACK_DIR;

// Statische Dateien serven
app.use(express.static(STATIC_DIR));

// Helfer: HTML-Datei ausliefern (erst /public, sonst Root)
function sendHtml(res, fileName) {
  const fromPublic = path.join(PUBLIC_DIR, fileName);
  const fromRoot = path.join(FALLBACK_DIR, fileName);
  const file = fs.existsSync(fromPublic) ? fromPublic : fromRoot;
  res.sendFile(file);
}

// Routen für Seiten
app.get('/', (_req, res) => sendHtml(res, 'index.html'));
app.get('/dashboard', (_req, res) => sendHtml(res, 'dashboard.html'));
app.get('/links', (_req, res) => sendHtml(res, 'links.html'));
app.get('/profile', (_req, res) => sendHtml(res, 'profile.html'));

// Health/Status
app.get('/api/status', (_req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'production',
    time: new Date().toISOString()
  });
});

// 404 für unbekannte API-Calls (Seiten werden oben schon abgefangen)
app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT} – statische Dateien: ${STATIC_DIR}`);
});
