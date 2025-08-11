const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: ['RPG', 'Action', 'Adventure', 'Strategy', 'Sports'],
    required: true
  },
  releaseDate: {
    type: Date
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true
  }
});

module.exports = mongoose.model('Game', gameSchema);
