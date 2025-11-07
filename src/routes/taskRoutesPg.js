const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/task_controller');
const TaskModelPg = require('../models/taskmodel');

router.get('/', (req, res) => ctrl.getAll(req, res, TaskModelPg));
router.get('/:id', (req, res) => ctrl.getOne(req, res, TaskModelPg));
router.post('/', (req, res) => ctrl.create(req, res, TaskModelPg));
router.put('/:id', (req, res) => ctrl.update(req, res, TaskModelPg));
router.delete('/:id', (req, res) => ctrl.delete(req, res, TaskModelPg));

module.exports = router;
