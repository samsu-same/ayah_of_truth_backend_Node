const Dua = require("./dailydua.model");


exports.createDua = (data) => {
  return Dua.create(data);
}