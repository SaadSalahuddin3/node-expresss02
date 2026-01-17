const express = require('express');
const router = express.Router();
const {
  createStudent,
  deleteStudent,
  getStudentCourses,
} = require('../controllers/studentController');

router.post('/students', createStudent);
router.delete('/students/:id', deleteStudent);
router.get('/students/:id/courses', getStudentCourses);

module.exports = router;
