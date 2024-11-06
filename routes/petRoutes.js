const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAllPets, createPet, getPet, updatePet, deletePet } = require('../controllers/petController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose'); // Import mongoose to generate ObjectId

// Generate a temporary ID middleware
const generateTempId = (req, res, next) => {
    const tempPetId = new mongoose.Types.ObjectId();
    req.tempPetId = tempPetId; // Assign to req.tempPetId
    next();
};

// Define the storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const petId = req.tempPetId || 'temp'; // Use req.tempPetId
        const petDir = path.join(__dirname, '../public/petimages', petId.toString());
        fs.mkdirSync(petDir, { recursive: true });
        cb(null, petDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

router.route('/')
    .post(
        authMiddleware,
        generateTempId, // Generate a temp ID before multer processes the files
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
