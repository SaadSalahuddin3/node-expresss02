module.exports = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message);
  } else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `Duplicate value for field: ${field}`;
  }

  res.status(statusCode).json({
    success: false,
    error: Array.isArray(message) ? message.join(', ') : message
  });
};
