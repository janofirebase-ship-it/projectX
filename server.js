const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CarDetail = require('./models/CarDetail.js');

dotenv.config();
import CarDetail from './models/CarDetail.js';

dotenv.config();

const app = express();

// MongoDB connection with better error handling for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Don't exit process in serverless
  }
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remove static file serving for Vercel (use Vercel's static hosting instead)
// app.use(express.static('public'));

// Routes
app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!', status: 'Server is running' });
});

app.get('/api/cars/:id', async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const carDetail = await CarDetail.findOne({ id });

    if (!carDetail) {
      return res.status(404).json({ error: 'Car details not found' });
    }

    res.json(carDetail);
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/landing', async (_req, res) => {
  try {
    await connectDB();
    const landingData = await mongoose.connection.db.collection('cars').findOne({});

    if (!landingData) {
      return res.json({
        mainPics: [],
        cards: []
      });
    }

    const { _id, ...cleanData } = landingData;
    res.json(cleanData);
  } catch (error) {
    console.error('Error fetching landing data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export for Vercel serverless
module.exports = app;

// Remove server startup for Vercel
// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// };

// startServer();