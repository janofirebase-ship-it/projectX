import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';
import CarDetail from './models/CarDetail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!', status: 'Server is running' });
});

app.get('/api/cars/:id', async (req, res) => {
  try {
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

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();