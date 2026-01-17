const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  rentedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

module.exports = mongoose.model('User', userSchema);
