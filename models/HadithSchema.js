const mongoose = require("mongoose");
const hadithSchema = new mongoose.Schema(
  {
    // Unique ID / reference
    hadithNumber: {
      type: String,
      required: true,
      index: true,
    },

    // 📖 Source (embedded instead of separate collection)
    source: {
      name: { type: String, required: true },        // Sahih Bukhari
      shortName: String,                             // Bukhari
      author: String,                                // Imam Bukhari
      bookNumber: Number,
      chapterNumber: Number,
    },

    // 🌍 Multi-language content (CORE FEATURE)
    content: [
      {
        language: {
          type: String, // 'en', 'hi', 'ar'
          required: true,
          index: true,
        },
        title: String, // Optional title per language
        text: {
          type: String,
          required: true,
        },
      },
    ],

    // 🕌 Arabic (kept separate for fast access)
    arabic: {
      type: String,
      required: true,
    },

    transliteration: String,

    // 👤 Narrator
    narrator: {
      type: String,
      index: true,
    },

    // 📚 Categories (embedded)
    categories: [
      {
        name: String,          // "Patience"
        slug: String,          // "patience"
        translations: [
          {
            language: String,
            name: String,
          },
        ],
      },
    ],

    // 🏷️ Tags (for flexible filtering)
    tags: [
      {
        type: String,
        index: true,
      },
    ],

    // 📅 Daily Hadith feature
    daily: {
      isDaily: {
        type: Boolean,
        default: false,
        index: true,
      },
      date: {
        type: Date,
        index: true,
      },
    },

    // ❤️ Engagement
    stats: {
      likes: { type: Number, default: 0 },
      bookmarks: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
    },

    // 🔊 Media
    media: {
      audioUrl: String,
      videoUrl: String,
    },

    // 🤖 Future AI features
    ai: {
      summary: String,
      explanation: String,
    },

    // ⚙️ Status control
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
  },
  { timestamps: true }
);
hadithSchema.index({ "daily.date": 1 });
hadithSchema.index({ "daily.isDaily": 1 });
hadithSchema.index({ "content.language": 1 });
hadithSchema.index({ narrator: 1 });
hadithSchema.index({ tags: 1 });
hadithSchema.index({ "categories.slug": 1 });

module.exports = mongoose.model("Hadith", hadithSchema);