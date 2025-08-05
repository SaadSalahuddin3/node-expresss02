// routes/api.js
const express = require('express');

module.exports = (limiter) => {
  const router = express.Router();

  // Public endpoint (no rate limit)
  router.get('/public', (req, res) => {
    res.json({ message: "This is a public endpoint!" });
  });

  // Limited endpoint (apply rate limit)
  router.get('/limited', limiter, (req, res) => {
    res.json({ message: "You have access to this limited endpoint!" });
  });

  return router;
};
