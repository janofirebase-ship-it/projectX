import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Simple schema for the landing page data
const landingSchema = new mongoose.Schema({
  mainPics: [String],
  cards: [{
    id: String,
    name: String,
    year: Number,
    priceGel: Number,
    priceUsd: Number,
    oldPriceGel: Number,
    oldPriceUsd: Number,
    mainPic: String,
    isForLanding: Boolean
  }]
}, {
  collection: 'cars' // Store in cars collection
});

const LandingData = mongoose.model('LandingData', landingSchema);

const addLandingData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Your exact JSON structure
    const landingData = {
      mainPics: [
        "https://drive.google.com/drive/folder/main_pic1.jpg",
        "https://drive.google.com/drive/folder/main_pic2.jpg"
      ],
      cards: [
        {
          id: "car123",
          name: "Toyota Corolla",
          year: 2022,
          priceGel: 42000,
          priceUsd: 13500,
          oldPriceGel: 45000,
          oldPriceUsd: 14500,
          mainPic: "https://drive.google.com/drive/folder/car123_main.jpg",
          isForLanding: true
        },
        {
          id: "car124",
          name: "Honda Civic",
          year: 2021,
          priceGel: 39000,
          priceUsd: 12500,
          mainPic: "https://drive.google.com/drive/folder/car124_main.jpg",
          isForLanding: true
        }
      ]
    };

    // Clear existing data first
    await LandingData.deleteMany({});
    console.log('🧹 Cleared existing data from cars collection');

    // Add the new data
    const data = new LandingData(landingData);
    await data.save();

    console.log('✅ Added your exact JSON structure to cars collection!');
    console.log('📄 Document ID:', data._id);
    console.log('\n� Test it:');
    console.log('curl http://localhost:3000/api/landing');

    mongoose.connection.close();
    console.log('✅ Database connection closed');

  } catch (error) {
    console.error('❌ Error:', error.message);
    mongoose.connection.close();
  }
};

addLandingData();