// server/index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

const DATA_FILE = path.join(__dirname, 'data', 'db.json');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Helpers to read/write JSON db
async function readDB() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    const init = { bookings: [], alerts: [], settings: { festivals: [] } };
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(init, null, 2));
    return init;
  }
}
async function writeDB(db) {
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}

// Simple festival check (date string YYYY-MM-DD)
function isFestival(dateStr, db) {
  return (db.settings && db.settings.festivals || []).includes(dateStr);
}

// Simple prediction endpoint
app.get('/api/predict', async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const db = await readDB();
  const bookingsForDate = db.bookings.filter(b => b.date === date);
  let score = bookingsForDate.length * 0.5; // base influence
  if (isFestival(date, db)) score += 3;
  // add small randomness and scale
  score += Math.random() * 2;
  const level = score < 3 ? 'Low' : score < 6 ? 'Medium' : 'High';
  res.json({ date, level, score: Number(score.toFixed(2)), bookingsCount: bookingsForDate.length });
});

// Create booking and QR generation
app.post('/api/book', async (req, res) => {
  const { name, date, time, temple = 'Temple', priority = false, lang = 'en' } = req.body;
  if (!name || !date || !time) return res.status(400).json({ error: 'name, date, time required' });

  const db = await readDB();
  const id = uuidv4();
  const slotNumber = db.bookings.length + 1;
  const booking = {
    id,
    name,
    date,
    time,
    temple,
    priority: !!priority,
    slotNumber,
    createdAt: new Date().toISOString()
  };

  db.bookings.push(booking);
  await writeDB(db);

  const qrText = `booking|${id}|${temple}|${date}|${time}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(qrText);
    return res.json({ booking, qrDataUrl });
  } catch (err) {
    return res.json({ booking, qrDataUrl: null });
  }
});

// Get queue/bookings for a date
app.get('/api/queue', async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const db = await readDB();
  // priority first, then by createdAt
  const list = db.bookings
    .filter(b => b.date === date)
    .sort((a, b) => (b.priority - a.priority) || (new Date(a.createdAt) - new Date(b.createdAt)));
  res.json({ date, count: list.length, bookings: list });
});

// Alerts
app.get('/api/alerts', async (req, res) => {
  const db = await readDB();
  res.json({ alerts: db.alerts || [] });
});

app.post('/api/admin/alert', async (req, res) => {
  const { type = 'info', message = '', date = new Date().toISOString() } = req.body;
  const db = await readDB();
  const alert = { id: uuidv4(), type, message, date };
  db.alerts.push(alert);
  await writeDB(db);
  res.json({ ok: true, alert });
});

// Admin: add festival date (for prediction tuning)
app.post('/api/admin/festival', async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ error: 'date required' });
  const db = await readDB();
  db.settings = db.settings || {};
  db.settings.festivals = db.settings.festivals || [];
  if (!db.settings.festivals.includes(date)) db.settings.festivals.push(date);
  await writeDB(db);
  res.json({ ok: true, festivals: db.settings.festivals });
});

// server/index.js
app.post("/api/sos", (req, res) => {
  console.log("🚨 SOS ALERT from user:", req.body);
  // Later: notify admin/volunteer in DB or socket
  res.json({ success: true, message: "SOS received" });
});

// health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Get predicted crowd for next 7 days for a temple
app.get('/api/predict-history', async (req, res) => {
  const temple = req.query.temple || 'Somnath';
  const db = await readDB();

  const today = new Date();
  const history = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().slice(0, 10);

    // Simple prediction logic (similar to /api/predict)
    const bookingsForDate = db.bookings.filter(b => b.date === dateStr && b.temple === temple);
    let score = bookingsForDate.length * 0.5;
    if (isFestival(dateStr, db)) score += 3;
    score += Math.random() * 2;

    const level = score < 3 ? 'Low' : score < 6 ? 'Medium' : 'High';
    return {
      date: dateStr,
      score: Number(score.toFixed(2)),
      level
    };
  });

  res.json(history);
});

// Absolute path to dist folder (Render builds in the same repo root)
const clientPath = path.join(__dirname, 'client', 'dist'); 
app.use(express.static(clientPath));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(clientPath, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
