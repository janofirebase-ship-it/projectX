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
    const { id } = req.query;

    // Query the cardetails collection directly
    const carDetail = await mongoose.connection.db.collection('cardetails').findOne({ id });

    if (!carDetail) {
      return res.status(404).json({ error: 'Car details not found' });
    }

    // Remove MongoDB _id field
    const { _id, ...cleanData } = carDetail;
    res.status(200).json(cleanData);
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};