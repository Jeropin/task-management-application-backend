const router = require("express").Router();

const Task = require("../controllers/task");

// GET /tasks
router.get("/", Task.getTask);

module.exports = router;