const express = require('express');
const router = express.Router();

const {
    getAllPets,
    createPet,
    getPet,
    updatePet,
    deletePet
} = require('../controllers/petController');

router.route('/')
    .get(getAllPets)
    .post(createPet);

router.route('/:id')
    .get(getPet)
    .patch(updatePet)
    .delete(deletePet);

module.exports = router;
