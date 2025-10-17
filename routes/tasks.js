// routes/tasks.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/task_controller');

router.get('/', controller.listTasks);        // GET /tasks
router.get('/:id', controller.getTask);       // GET /tasks/:id
router.post('/', controller.createTask);      // POST /tasks
router.patch('/:id', controller.updateTask);  // PATCH /tasks/:id
router.delete('/:id', controller.deleteTask); // DELETE /tasks/:id

module.exports = router;
