const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/rentalRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

connectDB();
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
