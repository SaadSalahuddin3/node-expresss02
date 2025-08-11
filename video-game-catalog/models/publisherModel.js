const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String
  },
  yearEstablished: {
    type: Number,
    min: 1950
  }
});

module.exports = mongoose.model('Publisher', publisherSchema);
