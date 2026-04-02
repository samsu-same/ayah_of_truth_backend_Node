// controllers/banner.controller.js
const Banner = require("../models/Banner");

// get Active Banner
exports.getBanners = async (req, res) => {
  try {
    const now = new Date();

    const banners = await Banner.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).sort({ priority: -1, createdAt: -1 });
    if(!banners.length){
      return res.status(404).json({
        success: false,
        message: "No active banners found",
      });
    }

    res.json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching banners",
    });
  }
};


// ✅ Create Banner (POST)
exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
console.log("Banner created:", banner);
    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating banner",
      error: error.message,
    });
  }
};




// ✅ Update Banner
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Banner updated",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

// ✅ Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Banner deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};