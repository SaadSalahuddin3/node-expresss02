// Centralized error-handling middleware
module.exports = (err, req, res, next) => {
  console.error("Error:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message);
  }

  // Duplicate key error (e.g., unique fields like registrationNumber or email)
  else if (err.code && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `Duplicate value for field: ${field}`;
  }

  // Cast Error (Invalid ObjectId)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: Array.isArray(message) ? message.join(', ') : message
  });
};
