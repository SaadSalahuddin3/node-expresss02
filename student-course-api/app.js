const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect DB
connectDB();

// Routes
app.use('/', require('./routes/studentRoutes'));
app.use('/', require('./routes/courseRoutes'));
app.use('/', require('./routes/enrollmentRoutes'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
