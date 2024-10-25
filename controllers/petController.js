const Pet = require('../models/pet');
const asyncWrapper = require('../middleware/async');

const getAllPets = asyncWrapper(async (req, res) => {
    const pets = await Pet.find({});
    res.status(200).json({ pets });
});

const createPet = asyncWrapper(async (req, res) => {
    const pet = await Pet.create(req.body);
    res.status(201).json({ pet });
});

const getPet = asyncWrapper(async (req, res) => {
    const { id: petID } = req.params;
    const pet = await Pet.findById(petID);
    if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ pet });
});

const updatePet = asyncWrapper(async (req, res) => {
    const { id: petID } = req.params;
    const updatedPet = await Pet.findByIdAndUpdate(petID, req.body, { new: true, runValidators: true });
    if (!updatedPet) {
        return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ updatedPet });
});

const deletePet = asyncWrapper(async (req, res) => {
    const { id: petID } = req.params;
    const deletedPet = await Pet.findByIdAndDelete(petID);
    if (!deletedPet) {
        return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
});

module.exports = { getAllPets, createPet, getPet, updatePet, deletePet };
