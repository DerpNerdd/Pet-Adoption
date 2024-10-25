const express = require('express');
const router = express.Router();

const { createContactMessage } = require('../controllers/contactController');

router.post('/contact', createContactMessage);

module.exports = router;
