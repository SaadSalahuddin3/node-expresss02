module.exports = (err, req, res, next) => {
  console.error(err);

  let message = 'Internal Server Error';
  let status = 500;

  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  } else if (err.code === 11000) {
    status = 400;
    message = `Duplicate key for field: ${Object.keys(err.keyValue)}`;
  }

  res.status(status).json({ error: message });
};
