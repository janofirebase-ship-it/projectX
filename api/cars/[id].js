import mongoose from 'mongoose';
import CarDetail from '../models/CarDetail.js';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    const { id } = req.query;

    const carDetail = await CarDetail.findOne({ id });

    if (!carDetail) {
      return res.status(404).json({ error: 'Car details not found' });
    }

    res.status(200).json(carDetail);
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ error: 'Server error' });
  }
}