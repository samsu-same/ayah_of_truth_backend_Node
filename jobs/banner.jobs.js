// jobs/banner.job.js
const cron = require("node-cron");
const Banner = require("../models/Banner");

cron.schedule("0 * * * *", async () => {
  const now = new Date();

  await Banner.updateMany(
    { endDate: { $lt: now }, isActive: true },
    { isActive: false }
  );

  console.log("Expired banners disabled");
});