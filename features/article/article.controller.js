// controllers/article.controller.js
const articleService = require("./article.service");

exports.createArticle = async (req, res) => {
  try {
    const article = await articleService.createArticle(req.body);
    res.status(201).json({ success: true, data: article });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists in this category"
      });
    }

    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

//List articles
exports.getArticles = async (req, res) => {
  try {
    const { category, isActive } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const articles = await articleService.getArticles(filter);

    res.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

//Single article
exports.getArticle = async (req, res) => {
  try {
    const { category, slug } = req.params;

    const article = await articleService.getArticleBySlug(category, slug);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    res.json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

//Update article
exports.updateArticle = async (req, res) => {
  try {
    const article = await articleService.updateArticle(
      req.params.id,
      req.body
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    res.json({ success: true, data: article });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

//Soft delete article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await articleService.softDeleteArticle(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    res.json({
      success: true,
      message: "Article deactivated"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
