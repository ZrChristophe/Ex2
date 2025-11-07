const Task = require("../models/taskmodel");

// GET /tasks
exports.listTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// GET /tasks/:id
exports.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

// POST /tasks
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /tasks/:id
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
};
