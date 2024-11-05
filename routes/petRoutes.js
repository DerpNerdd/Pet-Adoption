const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAllPets, createPet, getPet, updatePet, deletePet } = require('../controllers/petController');

// Route to get all pets or create a new pet
router.route('/')
    .get(getAllPets)
    .post(authMiddleware, (req, res, next) => {
        req.body.owner = req.user._id; // Set the owner as the logged-in user
        console.log("Setting owner in request body:", req.body.owner);
        next();
    }, createPet);


// Route to get, update, or delete a specific pet by ID
router.route('/:id')
    .get((req, res, next) => {
        console.log(`GET /pets/${req.params.id} -> getPet`);
        next();
    }, getPet)
    .patch(authMiddleware, (req, res, next) => {
        console.log(`PATCH /pets/${req.params.id} -> updatePet`);
        next();
    }, updatePet)
    .delete(authMiddleware, (req, res, next) => {
        console.log(`DELETE /pets/delete/${req.params.id} -> deletePet`);
        next();
    }, deletePet);

router.post('/delete/:id', authMiddleware, deletePet);

module.exports = router;
