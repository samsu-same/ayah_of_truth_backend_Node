const mongoose = require('mongoose');

const tafsirSchema = new mongoose.Schema({
  verse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Verse',
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'en',
  },
  source: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
tafsirSchema.index({ verse: 1, author: 1 });

module.exports = mongoose.model('Tafsir', tafsirSchema);