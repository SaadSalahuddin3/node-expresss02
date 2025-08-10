const express = require('express');
const router = express.Router();
const { enroll } = require('../controllers/enrollmentController');

router.post('/enroll', enroll);

module.exports = router;
