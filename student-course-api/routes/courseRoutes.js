const express = require('express');
const router = express.Router();
const {
  createCourse,
  deleteCourse,
  getCourseStudents,
} = require('../controllers/courseController');

router.post('/courses', createCourse);
router.delete('/courses/:id', deleteCourse);
router.get('/courses/:id/students', getCourseStudents);

module.exports = router;
