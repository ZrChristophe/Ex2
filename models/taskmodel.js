// models/taskModel.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', { encoding: 'utf8' });
}

function readData() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, { encoding: 'utf8' });
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // si corrompu, réinitialiser
    fs.writeFileSync(DATA_FILE, '[]', { encoding: 'utf8' });
    return [];
  }
}

function writeData(tasks) {
  // write to tmp then rename for atomicity
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(tasks, null, 2), { encoding: 'utf8' });
  fs.renameSync(tmp, DATA_FILE);
}

class TaskModel {
  getAll() {
    return readData();
  }

  getById(id) {
    const tasks = readData();
    return tasks.find(t => t.id === id) || null;
  }

  create({ title, description = '' }) {
    if (!title || typeof title !== 'string') {
      throw new Error('title is required and must be a string');
    }
    const tasks = readData();
    const task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.push(task);
    writeData(tasks);
    return task;
  }

  update(id, fields = {}) {
    const tasks = readData();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    const allowed = ['title', 'description', 'completed'];
    for (const k of allowed) {
      if (k in fields) tasks[idx][k] = fields[k];
    }
    writeData(tasks);
    return tasks[idx];
  }

  delete(id) {
    const tasks = readData();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    writeData(tasks);
    return true;
  }
}

module.exports = new TaskModel();
