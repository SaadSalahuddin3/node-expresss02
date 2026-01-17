require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const publisherRoutes = require('./routes/publisherRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.requestTimestamp = new Date().toISOString();
  next();
});

app.use('/api/publishers', publisherRoutes);
app.use('/api/games', gameRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
