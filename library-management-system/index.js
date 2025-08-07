require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const libraryRoutes = require('./routes/libraryRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// API Routes
app.use('/api', libraryRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
