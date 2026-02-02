const mongoose = require('mongoose');

const dailyVerseSchema = new mongoose.Schema({
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true,
  },
  verse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Verse',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  bookmarks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for date-based queries
dailyVerseSchema.index({ date: 1 });

module.exports = mongoose.model('DailyVerse', dailyVerseSchema);