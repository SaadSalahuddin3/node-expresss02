const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};

exports.deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, { isActive: false });
  await Enrollment.updateMany({ courseId: req.params.id }, { isActive: false });
  res.json({ message: 'Course deactivated' });
};

exports.getCourseStudents = async (req, res) => {
  const enrollments = await Enrollment.find({
    courseId: req.params.id,
    isActive: true,
  }).populate({
    path: 'studentId',
    match: { isActive: true },
  });

  const students = enrollments.map(e => e.studentId).filter(Boolean);
  res.json(students);
};
