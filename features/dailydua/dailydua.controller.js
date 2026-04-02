const duaService = require("./dailydua.service");
const redisClient = require("../../config/redisClient");

exports.createDua = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.title || !payload.category || !payload.content?.arabic) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const dua = await duaService.createDua(payload);

    return res.status(201).json({
      success: true,
      data: dua,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Get All Duas (with pagination + filters)
exports.getAllDuas = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const query = {};

    if (category) query.category = category;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const duas = await duaService.getAllDuas(query, page, limit);

    res.json({
      success: true,
      data: duas,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


//2. Get Single Dua
exports.getDuaById = async (req, res) => {
  try {
    const { id } = req.params;

    const dua = await duaService.getDuaById(id);

    if (!dua) {
      return res.status(404).json({
        success: false,
        message: "Dua not found",
      });
    }

    res.json({
      success: true,
      data: dua,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Update Dua
exports.updateDua = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await duaService.updateDua(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Dua not found",
      });
    }

    res.json({
      success: true,
      data: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//4. Delete Dua
exports.deleteDua = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await duaService.deleteDua(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Dua not found",
      });
    }

    res.json({
      success: true,
      message: "Dua deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//Get Daily Dua (Featured)
exports.getDailyDua = async (req, res) => {
  try {
        const cacheKey = "daily_dua";
            // 1. Check Redis first
    const cachedDua = await redisClient.get(cacheKey);
    if (cachedDua) {
      return res.json({
        success: true,
        data: JSON.parse(cachedDua),
        cached: true // optional flag for debugging
      });
    }
  // 2. Fetch from MongoDB if not in cache
    const dua = await duaService.getDailyDua();
        if (!dua) {
      return res.status(404).json({
        success: false,
        message: "Daily dua not found"
      });
    }
        // 3. Store in Redis with expiry (e.g., 1 hour)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(dua));

    res.json({
      success: true,
      data: dua,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//Get Duas by Category
exports.getDuasByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const cacheKey = `duas_category_${category}`;
    // 1. Check Redis first
    const cachedDuas = await redisClient.get(cacheKey);
    if (cachedDuas) {
      return res.json({
        success: true,    
        count: cachedDuas.length,
        cached: true, // optional flag for debugging
        data: JSON.parse(cachedDuas)
      });
    }
    // 2. Fetch from MongoDB if not in cache
    const duas = await duaService.getDuasByCategory(category);
    if (!duas || duas.length === 0) {
      return res.status(404).json({
        success: false,   
        message: "No duas found for this category"  
      });
    }
    // 3. Store in Redis with expiry (e.g., 1 hour)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(duas));

    res.json({
      success: true,
      count: duas.length,
      data: duas,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};