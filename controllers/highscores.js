const Highscore = require('../models/Highscore');

exports.getHighscores = async (req, res, next) => {
    try {
        const highscores = await Highscore.find();

        res.status(200).json({ success: true, data: highscores});
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
};

exports.getHighscore = async (req, res, next) => {
    try {
        const username = req.params.id;
        const highscore = await Highscore.findOne({username: username});

        if(!highscore) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: highscore});
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
};

exports.createHighscore = async (req, res, next) => {
    return res.status(400);
};

exports.updateHighscore = async (req, res, next) => {
    return res.status(400);
};

exports.deleteHighscore = (req, res, next) => {
    return res.status(400);
};