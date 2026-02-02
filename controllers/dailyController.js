const DailyVerse = require('../models/DailyVerse');
const Verse = require('../models/Verse');
const Tafsir = require('../models/Tafsir');

class DailyController {
  // Get today's verse
  async getTodaysVerse(req, res) {
    try {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      
      let dailyVerse = await DailyVerse.findOne({ date: today })
        .populate({
          path: 'verse',
          populate: {
            path: 'surah',
            select: 'name englishName revelationType',
          },
        });

      // If no daily verse for today, create one
      if (!dailyVerse) {
        dailyVerse = await this.createDailyVerse();
      }

      // Increment views
      await DailyVerse.findByIdAndUpdate(dailyVerse._id, {
        $inc: { views: 1 },
      });

      // Get tafsir for the verse
      const tafsir = await Tafsir.findOne({ verse: dailyVerse.verse._id });

      res.json({
        success: true,
        data: {
          date: dailyVerse.date,
          verse: dailyVerse.verse,
          tafsir: tafsir ? tafsir.text : null,
          author: tafsir ? tafsir.author : null,
          stats: {
            views: dailyVerse.views + 1,
            bookmarks: dailyVerse.bookmarks,
          },
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

  // Create new daily verse
  async createDailyVerse() {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Count total verses
      const totalVerses = await Verse.countDocuments();
      
      // Get a random verse
      const randomSkip = Math.floor(Math.random() * totalVerses);
      const randomVerse = await Verse.findOne().skip(randomSkip);

      // Create daily verse entry
      const dailyVerse = await DailyVerse.create({
        date: today,
        verse: randomVerse._id,
      });

      // Populate the verse data
      return await DailyVerse.findById(dailyVerse._id)
        .populate({
          path: 'verse',
          populate: {
            path: 'surah',
            select: 'name englishName revelationType',
          },
        });
    } catch (error) {
      throw new Error(`Error creating daily verse: ${error.message}`);
    }
  }

  // Get verse for specific date
  async getVerseByDate(req, res) {
    try {
      const { date } = req.params;
      
      const dailyVerse = await DailyVerse.findOne({ date })
        .populate({
          path: 'verse',
          populate: {
            path: 'surah',
            select: 'name englishName revelationType',
          },
        });

      if (!dailyVerse) {
        return res.status(404).json({
          success: false,
          message: 'No verse found for this date',
        });
      }

      // Get tafsir
      const tafsir = await Tafsir.findOne({ verse: dailyVerse.verse._id });

      res.json({
        success: true,
        data: {
          date: dailyVerse.date,
          verse: dailyVerse.verse,
          tafsir: tafsir ? tafsir.text : null,
          author: tafsir ? tafsir.author : null,
          stats: {
            views: dailyVerse.views,
            bookmarks: dailyVerse.bookmarks,
          },
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

  // Get this week's verses
  async getWeeklyVerses(req, res) {
    try {
      const today = new Date();
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);

      const startDate = weekAgo.toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];

      const weeklyVerses = await DailyVerse.find({
        date: { $gte: startDate, $lte: endDate },
      })
        .populate({
          path: 'verse',
          populate: {
            path: 'surah',
            select: 'name englishName',
          },
        })
        .sort({ date: -1 });

      res.json({
        success: true,
        data: weeklyVerses,
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

module.exports = new DailyController();