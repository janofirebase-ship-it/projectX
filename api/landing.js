const mongoose = require('mongoose');

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

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    // Query the cars collection directly for landing data
    const landingData = await mongoose.connection.db.collection('cars').findOne({});

    if (!landingData) {
      return res.status(200).json({
        mainPics: [],
        cards: []
      });
    }

    // Remove MongoDB _id field
    const { _id, ...cleanData } = landingData;
    res.status(200).json(cleanData);
  } catch (error) {
    console.error('Error fetching landing data:', error);
    res.status(500).json({ error: 'Server error' });
  }
};