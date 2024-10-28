const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const asyncWrapper = require('../middleware/async');

router.post('/register', asyncWrapper(registerUser));
router.post('/login', asyncWrapper(loginUser));

module.exports = router;
