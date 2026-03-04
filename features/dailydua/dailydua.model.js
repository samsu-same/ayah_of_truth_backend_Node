const mongoose = require("mongoose");

const duaSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    arabic: {
      type: String,
      required: true,
    },
    transliteration: String,
    translation: String,
    reference: String,
    when: String,
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Dua", duaSchema);