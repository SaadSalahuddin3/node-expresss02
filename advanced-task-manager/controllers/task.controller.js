const Task = require('../models/task.model');

// Create Task
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Task title must be unique' });
    }
    res.status(500).json({ message: err.message });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  const { priority, isCompleted } = req.query;
  const filter = {};
  if (priority) filter.priority = priority.toLowerCase();
  if (isCompleted) filter.isCompleted = isCompleted === 'true';

  try {
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const updateFields = {};

  ['title', 'priority', 'description', 'isCompleted'].forEach(field => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  // Auto-set completion date if isCompleted becomes true
  if (req.body.isCompleted === true) {
    updateFields.completionDate = new Date();
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Tasks by Priority
const deleteTasks = async (req, res) => {
  const { priority } = req.query;
  if (!priority || !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
    return res.status(400).json({ message: 'Provide valid priority (low, medium, high)' });
  }

  try {
    const result = await Task.deleteMany({ priority: priority.toLowerCase() });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTasks
};
