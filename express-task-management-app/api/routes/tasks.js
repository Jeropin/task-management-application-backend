const router = require("express").Router();

const Task = require("../controllers/task");

// GET /tasks/:id
router.get("/:id", Task.getTaskById);

// POST /tasks

// PUT /tasks/:id

// DELETE /tasks/:id


module.exports = router;