const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// In-memory storage
let latestData = [];

// POST route to receive data
app.post('/api/data', (req, res) => {
  const { temperature, humidity } = req.body;

  if (temperature && humidity) {
    const timestamp = new Date();
    latestData.unshift({ temperature, humidity, timestamp });

    // Keep only latest 10 readings
    if (latestData.length > 10) {
      latestData.pop();
    }

    console.log(`[📥 RECEIVED] Temp: ${temperature}, Humidity: ${humidity}`);
    res.status(200).json({ message: 'Data received successfully' });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// GET route to return data
app.get('/api/data', (req, res) => {
  res.json(latestData);
});

// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
