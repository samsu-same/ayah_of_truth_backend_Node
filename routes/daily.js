const express = require('express');
const router = express.Router();
const dailyController = require('../controllers/dailyController');

// GET /api/daily - Get today's verse
router.get('/', dailyController.getTodaysVerse);

// GET /api/daily/:date - Get verse for specific date (YYYY-MM-DD)
router.get('/:date', dailyController.getVerseByDate);

// GET /api/daily/week - Get this week's verses
router.get('/week', dailyController.getWeeklyVerses);

module.exports = router;