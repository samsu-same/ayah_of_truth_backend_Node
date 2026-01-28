// routes/article.routes.js
const express = require("express");
const router = express.Router();
const controller = require("./article.controller");

router.post("/", controller.createArticle);
router.get("/", controller.getArticles);
router.get("/:category/:slug", controller.getArticle);
// router.put("/:id", controller.updateArticle);
// router.delete("/:id", controller.deleteArticle);

module.exports = router;
