// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { showContactForm, sendEmail } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

// Display the contact form
router.get('/:petId', authMiddleware, showContactForm);

// Handle form submission
router.post('/:petId', authMiddleware, sendEmail);

module.exports = router;
