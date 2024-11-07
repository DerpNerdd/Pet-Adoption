const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createPet, getPet, updatePet, deletePet } = require('../controllers/petController');
const multer = require('multer');
const { cloudinary, storage } = require('../config/cloudinaryConfig'); 

// Initialize multer with the Cloudinary storage configuration
const upload = multer({ storage });

router.route('/')
  .post(
    authMiddleware,
    upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'images', maxCount: 5 }]),
    createPet
  );

// Route to get, update, or delete a specific pet by ID
router.route('/:id')
  .get(getPet)
  .patch(authMiddleware, updatePet)
  .delete(authMiddleware, deletePet);

router.post('/delete/:id', authMiddleware, deletePet);

module.exports = router;
