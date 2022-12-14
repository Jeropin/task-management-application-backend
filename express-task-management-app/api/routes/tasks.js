const router = require("express").Router();

const Task = require("../controllers/task");

// GET /tasks/:id
router.get("/", Task.getAllTask);

// GET /tasks/:id
router.get("/:id", Task.getTaskById);

// POST /tasks
router.post("/", Task.createTask);

// PUT /tasks/:id
router.put("/:id", Task.updateTaskById);

// DELETE /tasks/:id
router.delete("/:id", Task.deleteTaskById);

module.exports = router;