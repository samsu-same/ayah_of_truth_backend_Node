const Verse = require('../models/Verse');
const Surah = require('../models/Surah');
const Tafsir = require('../models/Tafsir');

class VerseController {
  // Get random verse
  async getRandomVerse(req, res) {
    try {
      const count = await Verse.countDocuments();
      const random = Math.floor(Math.random() * count);
      
      const verse = await Verse.findOne()
        .skip(random)
        .populate('surah', 'name englishName revelationType')
        .lean();

      if (!verse) {
        return res.status(404).json({
          success: false,
          message: 'No verse found',
        });
      }

      // Get tafsir for this verse
      const tafsir = await Tafsir.findOne({ verse: verse._id });

      res.json({
        success: true,
        data: {
          ...verse,
          tafsir: tafsir ? tafsir.text : null,
          author: tafsir ? tafsir.author : null,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }

  // Get verse by ID
  async getVerseById(req, res) {
    try {
      const { id } = req.params;
      
      const verse = await Verse.findById(id)
        .populate('surah', 'name englishName revelationType')
        .lean();

      if (!verse) {
        return res.status(404).json({
          success: false,
          message: 'Verse not found',
        });
      }

      const tafsir = await Tafsir.findOne({ verse: verse._id });

      res.json({
        success: true,
        data: {
          ...verse,
          tafsir: tafsir ? tafsir.text : null,
          author: tafsir ? tafsir.author : null,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }

  // Get verse by Surah and Ayah number
  async getVerseBySurahAndAyah(req, res) {
    try {
      const { surahNumber, ayahNumber } = req.params;
      
      const verse = await Verse.findOne({
        surahNumber: parseInt(surahNumber),
        numberInSurah: parseInt(ayahNumber),
      })
        .populate('surah', 'name englishName revelationType')
        .lean();

      if (!verse) {
        return res.status(404).json({
          success: false,
          message: 'Verse not found',
        });
      }

      const tafsir = await Tafsir.findOne({ verse: verse._id });

      res.json({
        success: true,
        data: {
          ...verse,
          tafsir: tafsir ? tafsir.text : null,
          author: tafsir ? tafsir.author : null,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }

  // Search verses
  async searchVerses(req, res) {
    try {
      const { query, page = 1, limit = 20 } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
      }

      const searchQuery = {
        $or: [
          { arabic: { $regex: query, $options: 'i' } },
          { translation: { $regex: query, $options: 'i' } },
          { transliteration: { $regex: query, $options: 'i' } },
        ],
      };

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const [verses, total] = await Promise.all([
        Verse.find(searchQuery)
          .skip(skip)
          .limit(parseInt(limit))
          .populate('surah', 'name englishName')
          .lean(),
        Verse.countDocuments(searchQuery),
      ]);

      res.json({
        success: true,
        data: verses,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }

  // Get verses by surah
  async getVersesBySurah(req, res) {
    try {
      const { surahNumber } = req.params;
      const { page = 1, limit = 50 } = req.query;
      
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const [verses, total] = await Promise.all([
        Verse.find({ surahNumber: parseInt(surahNumber) })
          .skip(skip)
          .limit(parseInt(limit))
          .sort('numberInSurah')
          .populate('surah', 'name englishName')
          .lean(),
        Verse.countDocuments({ surahNumber: parseInt(surahNumber) }),
      ]);

      res.json({
        success: true,
        data: verses,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }
}

module.exports = new VerseController();