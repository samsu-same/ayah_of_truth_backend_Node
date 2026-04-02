
// models/banner.model.js
const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, default: "/" },

    isActive: { type: Boolean, default: true },

    priority: { type: Number, default: 0 },

    // ✅ Scheduling fields
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔒 Validation: endDate must be after startDate
bannerSchema.pre("save", function () {
  if (this.endDate <= this.startDate) {
    throw new Error("End date must be greater than start date");
  }
});

module.exports = mongoose.model("Banner", bannerSchema);