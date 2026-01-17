const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', rateLimiter, authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
