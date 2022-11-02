const router = require("express").Router();

const Project = require("../controllers/project");

// GET /projects
router.get("/", Project.getProject);

// GET /projects/:id
router.get("/:id", Project.getProjectById);

// POST projects
router.post("/", Project.createProject);

// PUT projects/:id
router.put("/:id", Project.updateProjectById)

module.exports = router;