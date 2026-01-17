const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/task.routes');

const app = express();
app.use(bodyParser.json());

// Connect DB
connectDB();

// Routes
app.use('/tasks', taskRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
