const mongoose = require('mongoose');

const surahSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  englishName: {
    type: String,
    required: true,
  },
  arabicName: {
    type: String,
    required: true,
  },
  revelationType: {
    type: String,
    enum: ['Meccan', 'Medinan'],
    required: true,
  },
  ayahs: {
    type: Number,
    required: true,
  },
  juz: [{
    type: Number,
  }],
  page: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Surah', surahSchema);