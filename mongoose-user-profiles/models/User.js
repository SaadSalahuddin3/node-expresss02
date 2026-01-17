const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
  profileName: {
    type: String,
    enum: ['fb', 'twitter', 'github', 'instagram'],
    required: [true, 'Profile name is required']
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Invalid URL format'
    }
  }
});

const userSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  profiles: [profileSchema]
});

module.exports = mongoose.model('User', userSchema);
