// controllers/taskController.js
const taskModel = require('../models/taskModel');

exports.listTasks = (req, res) => {
  const tasks = taskModel.getAll();
  res.json(tasks);
};

exports.getTask = (req, res) => {
  const { id } = req.params;
  const task = taskModel.getById(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};

exports.createTask = (req, res) => {
  try {
    const { title, description } = req.body;
    const task = taskModel.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  // optional: validate completed type if present
  if ('completed' in fields && typeof fields.completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be a boolean' });
  }
  const updated = taskModel.update(id, fields);
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json(updated);
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const ok = taskModel.delete(id);
  if (!ok) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
};
