const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { validateTaskData } = require('../middleware/task.middleware');

// POST /tasks - Create new task
router.post('/', validateTaskData, taskController.createTask);

// GET /tasks - Get all tasks (optionally filter by priority or status)
router.get('/', taskController.getTasks);

// PATCH /tasks/:id - Update a task
router.patch('/:id', validateTaskData, taskController.updateTask);

// DELETE /tasks - Bulk delete by priority
router.delete('/', taskController.deleteTasks);

module.exports = router;
