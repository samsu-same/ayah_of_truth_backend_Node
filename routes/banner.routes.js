// routes/banner.routes.js
const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.js");

router.post("/", bannerController.createBanner);
router.get("/", bannerController.getBanners);
router.put("/:id", bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;