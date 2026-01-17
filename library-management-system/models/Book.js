const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available',
    required: true
  },
  borrowers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre hook: prevent borrowing if status is not available
bookSchema.pre('save', function (next) {
  if (this.isModified('borrowers') && this.status === 'available' && this.borrowers.length > 0) {
    this.status = 'borrowed';
  }
  next();
});

// Post hook: when all borrowers removed, set status to available
bookSchema.post('save', async function (doc) {
  if (doc.borrowers.length === 0 && doc.status !== 'available') {
    doc.status = 'available';
    await doc.save();
  }
});

module.exports = mongoose.model('Book', bookSchema);
