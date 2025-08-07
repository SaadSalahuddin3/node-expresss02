module.exports = (err, req, res, next) => {
  console.error(err);

  let status = 500;
  let message = 'Internal Server Error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  } else if (err.code === 11000) {
    status = 400;
    message = `Duplicate key for: ${Object.keys(err.keyValue).join(', ')}`;
  }

  res.status(status).json({ error: message });
};
