const express = require('express');
const router = express.Router();
const verseController = require('../controllers/verseController');

// GET /api/verses/random - Get random verse
router.get('/random', verseController.getRandomVerse);

// GET /api/verses/:id - Get verse by ID
router.get('/:id', verseController.getVerseById);

// GET /api/verses/surah/:surahNumber/:ayahNumber - Get verse by surah and ayah
router.get('/surah/:surahNumber/:ayahNumber', verseController.getVerseBySurahAndAyah);

// GET /api/verses/search - Search verses
router.get('/search', verseController.searchVerses);

// GET /api/verses/surah/:surahNumber - Get all verses of a surah
router.get('/surah/:surahNumber', verseController.getVersesBySurah);

module.exports = router;