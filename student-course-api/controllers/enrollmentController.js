const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

exports.enroll = async (req, res) => {
  const { studentId, courseId } = req.body;

  const student = await Student.findOne({ _id: studentId, isActive: true });
  const course = await Course.findOne({ _id: courseId, isActive: true });

  if (!student || !course) {
    return res.status(400).json({ message: 'Invalid or inactive student/course' });
  }

  const enrollment = await Enrollment.create({ studentId, courseId });
  res.status(201).json(enrollment);
};
