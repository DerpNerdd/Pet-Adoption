const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAllPets, createPet, getPet, updatePet, deletePet } = require('../controllers/petController');

// Route to get all pets or create a new pet
router.route('/')
    .get(getAllPets)
    .post(authMiddleware, createPet);

// Route to get and update a specific pet by ID
router.route('/:id')
    .get(getPet)
    .patch(authMiddleware, updatePet);

// Separate delete route for clarity
router.delete('/delete/:id', authMiddleware, deletePet);

module.exports = router;
