import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CarDetail from './models/CarDetail.js';

dotenv.config();

const addCarDetail = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Your exact car detail JSON
    const carDetailData = {
      id: "car123",
      name: "Toyota Corolla",
      year: 2022,
      priceGel: 42000,
      priceUsd: 13500,
      oldPriceGel: 45000,
      oldPriceUsd: 14500,
      mainPic: "https://drive.google.com/drive/folder/car123_main.jpg",
      additionalPics: [
        "https://drive.google.com/drive/folder/car123_pic1.jpg",
        "https://drive.google.com/drive/folder/car123_pic2.jpg",
        "https://drive.google.com/drive/folder/car123_pic3.jpg",
        "https://drive.google.com/drive/folder/car123_pic4.jpg"
      ],
      horsePower: 150,
      gasolineType: "Petrol",
      doors: "4/5",
      description: "Full description of the car, features, condition, etc."
    };

    // Check if car detail already exists
    const existingDetail = await CarDetail.findOne({ id: carDetailData.id });
    if (existingDetail) {
      console.log(`⏭️  Car detail for ${carDetailData.name} already exists, updating...`);
      await CarDetail.findOneAndReplace({ id: carDetailData.id }, carDetailData);
      console.log('✅ Updated existing car detail');
    } else {
      const carDetail = new CarDetail(carDetailData);
      await carDetail.save();
      console.log('✅ Added new car detail');
    }

    console.log('📄 Car Detail ID:', carDetailData.id);
    console.log('\n🔍 Test it:');
    console.log('curl http://localhost:3000/api/cars/car123');

    mongoose.connection.close();
    console.log('✅ Database connection closed');

  } catch (error) {
    console.error('❌ Error:', error.message);
    mongoose.connection.close();
  }
};

addCarDetail();