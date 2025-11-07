const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task_controller");

router.get("/", taskController.listTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
