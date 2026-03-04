const express = require("express");
const router = express.Router();

const controller = require("./dailydua.controller");

router.post("/", controller.createDua);

module.exports = router;