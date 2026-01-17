const Game = require('../models/gameModel');
const Publisher = require('../models/publisherModel');

exports.createGame = async (req, res) => {
  try {
    const { publisher, title, genre, releaseDate } = req.body;
    const game = new Game({ publisher, title, genre, releaseDate });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find().populate('publisher', 'name location');
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('publisher', 'name location');
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.status(200).json({ message: 'Game deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
