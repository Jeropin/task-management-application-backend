const router = require('express').Router();

const User = require('../controllers/user');

// GET /users
router.get("/", User.getUser);

// GET /users/:id
router.get("/:id", User.getUserById);

// POST /users
router.post("/", User.createUser);

// PUT /users
router.put("/:id", User.updateUserById);

module.exports = router;