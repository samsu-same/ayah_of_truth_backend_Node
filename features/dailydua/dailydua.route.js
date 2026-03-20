const express = require("express");
const router = express.Router();

const controller = require("./dailydua.controller");

router.post("/", controller.createDua);
router.get("/allduas", controller.getAllDuas);
router.get("/daily", controller.getDailyDua);
router.get("/category/:category", controller.getDuasByCategory);
router.get("/:id", controller.getDuaById);
router.put("/:id", controller.updateDua);
router.delete("/:id", controller.deleteDua);
module.exports = router;