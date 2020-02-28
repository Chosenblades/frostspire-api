const express = require('express');
const router = express.Router();
const { getHighscores, getHighscore, createHighscore, updateHighscore, deleteHighscore } = require('../controllers/highscores');

router.route('/').get(getHighscores).post(createHighscore);

router.route('/:id').get(getHighscore).put(updateHighscore).delete(deleteHighscore);

module.exports = router;