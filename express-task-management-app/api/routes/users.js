const router = require('express').Router();

const User = require('../controllers/user');

// GET /users
router.get('/', User.getUser);

module.exports = router;