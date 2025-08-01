// server.js
const express = require('express');
const app = express();



// Dummy user data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  { id: 3, name: "Bob Smith", email: "bob@example.com" }
];

// Routes

// GET /users/get → Respond with a single dummy user
app.get('/users/get', (req, res) => {
  res.status(200).json(users[0]);
});

// GET /users/list → Respond with three dummy users
app.get('/users/list', (req, res) => {
  res.status(200).json(users);
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:`);
});
