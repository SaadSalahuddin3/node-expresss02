const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const vehicleRoutes = require('./routes/vehicleRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api', vehicleRoutes);

// Centralized error handler (must come after routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
