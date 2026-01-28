// services/article.service.js
const Article = require("./article.model");

exports.createArticle = (data) => {
  return Article.create(data);
};

exports.getArticles = (filter) => {
  return Article.find(filter).sort({ createdAt: -1 });
};

exports.getArticleBySlug = (category, slug) => {
  return Article.findOne({ category, slug, isActive: true });
};

exports.updateArticle = (id, data) => {
  return Article.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

exports.softDeleteArticle = (id) => {
  return Article.findByIdAndUpdate(id, { isActive: false }, { new: true });
};
