const mongoose = require("mongoose");

const duaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "morning",
        "evening",
        "sleep",
        "wakeup",
        "food",
        "travel",
        "general",
      ],
      required: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    content: {
      arabic: {
        type: String,
        required: true,
      },
      transliteration: {
        type: String,
      },
      translations: [
        {
          language: {
            type: String, // e.g. "en", "ur", "bn"
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
    },

    reference: {
      source: String, // e.g. Hadith book
      book: String,
      hadithNumber: String,
    },

    timing: {
      type: String,
      enum: ["morning", "evening", "anytime", "specific"],
      default: "anytime",
    },

    repeat: {
      count: {
        type: Number,
        default: 1,
      },
      note: String, // e.g. "Repeat 3 times"
    },

    audio: {
      url: String,
      duration: Number, // seconds
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
// Indexing for fast queries under heavy load
duaSchema.index({ category: 1 });
duaSchema.index({ isFeatured: 1 });
duaSchema.index({ createdAt: -1 });
module.exports = mongoose.model("Dua", duaSchema);