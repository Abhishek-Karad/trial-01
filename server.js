const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const Reading = require('./models/reading');

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'Data received successfully' });
});


app.get('/api/data', async (req, res) => {
    const data = await Reading.find().sort({ createdAt: -1 }).limit(10);
    res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
