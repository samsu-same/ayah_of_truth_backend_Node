const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, required: true },
    category: {
      type: String,
      enum: ["faith", "charity", "prayer", "finance", "lifestyle", "education","culture","business"],
      required: true
    },
    blocks: [
      {
        type: {
          type: String,
          enum: [
            "headerTable",
            "infoTable",
            "vacancyTable",
            "linkTable",
            "markdown",
            "image",
            "youtube",
            "gallery",
            "customHTML"
          ]
        },
        data: mongoose.Schema.Types.Mixed,
        order: Number
      }
    ],
    seo: {
      metaTitle: String,
      metaDescription: String
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// 🔥 Indexes
ArticleSchema.index({ slug: 1, category: 1 }, { unique: true });
ArticleSchema.index({ category: 1, isActive: 1, createdAt: -1 });
ArticleSchema.index({ isActive: 1, updatedAt: -1 });

module.exports = mongoose.model("Article", ArticleSchema);