const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
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
  isForLanding: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;