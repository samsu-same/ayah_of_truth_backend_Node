const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  numberInSurah: {
    type: Number,
    required: true,
  },
  surah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Surah',
    required: true,
  },
  surahNumber: {
    type: Number,
    required: true,
  },
  arabic: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
  },
  transliteration: {
    type: String,
  },
  audio: {
    type: String,
  },
  juz: {
    type: Number,
  },
  page: {
    type: Number,
  },
  tags: [{
    type: String,
  }],
  metadata: {
    ruku: Number,
    hizbQuarter: Number,
    sajda: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for efficient querying
verseSchema.index({ surahNumber: 1, numberInSurah: 1 });
verseSchema.index({ number: 1 });

module.exports = mongoose.model('Verse', verseSchema);