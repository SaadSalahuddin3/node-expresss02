const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/add-user', userCtrl.addUser);
router.post('/add-profile', userCtrl.addProfile);
router.get('/profiles', userCtrl.getAllProfiles);

module.exports = router;
