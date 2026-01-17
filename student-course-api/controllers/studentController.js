const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');

exports.createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

exports.deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, { isActive: false });
  await Enrollment.updateMany({ studentId: req.params.id }, { isActive: false });
  res.json({ message: 'Student deactivated' });
};

exports.getStudentCourses = async (req, res) => {
  const enrollments = await Enrollment.find({
    studentId: req.params.id,
    isActive: true,
  }).populate({
    path: 'courseId',
    match: { isActive: true },
  });

  const courses = enrollments.map(e => e.courseId).filter(Boolean);
  res.json(courses);
};
