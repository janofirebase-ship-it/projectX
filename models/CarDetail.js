const mongoose = require('mongoose');

const carDetailSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  priceGel: {
    type: Number,
    required: true
  },
  priceUsd: {
    type: Number,
    required: true
  },
  oldPriceGel: {
    type: Number
  },
  oldPriceUsd: {
    type: Number
  },
  mainPic: {
    type: String,
    required: true
  },
  additionalPics: [{
    type: String
  }],
  horsePower: {
    type: Number,
    required: true
  },
  gasolineType: {
    type: String,
    required: true
  },
  doors: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const CarDetail = mongoose.model('CarDetail', carDetailSchema);

module.exports = CarDetail;