//⚡ 2. Service Layer Optimization (Critical)

//Avoid heavy Mongoose overhead for high scale:

const Dua = require("./dailydua.model");


exports.createDua = (data) => {
  return Dua.create(data);
}

exports.getAllDuas = async (query, page, limit) => {
  const skip = (page - 1) * limit;

  return await Dua.find(query)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 })
    .lean();
};

//Single Dua by ID
exports.getDuaById = async (id) => {
  return await Dua.findById(id).lean();
};
//Update Dua
exports.updateDua = async (id, data) => {
  return await Dua.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
};

//delete Dua
exports.deleteDua = async (id) => {
  return await Dua.findByIdAndDelete(id);
};
//Get featured Duas
exports.getDailyDua = async () => {
  return await Dua.findOne({ isFeatured: true }).lean();
};
//Get Duas by category
exports.getDuasByCategory = async (category) => {
  return await Dua.find({ category }).lean();
};