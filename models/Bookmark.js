const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: String, // Could be user ID or session ID
    required: true,
  },
  verse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Verse',
    required: true,
  },
  note: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for user-specific bookmarks
bookmarkSchema.index({ user: 1, verse: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);