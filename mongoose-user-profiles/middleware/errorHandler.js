module.exports = (err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ error: messages });
  }
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  res.status(500).json({ error: 'Server error' });
};
