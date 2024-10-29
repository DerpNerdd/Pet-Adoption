const Pet = require('../models/pet');

const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.render('index', { pets });
    } catch (error) {
        res.status(500).send('Error loading pets');
    }
};

const createPet = async (req, res) => {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error creating pet');
    }
};

const getPet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).send('Pet not found');
        res.render('pet-details', { pet });
    } catch (error) {
        res.status(500).send('Error loading pet details');
    }
};

const updatePet = async (req, res) => {
    try {
        await Pet.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/pets/${req.params.id}`);
    } catch (error) {
        res.status(500).send('Error updating pet');
    }
};

const deletePet = async (req, res) => {
    if (!req.user.admin) {
        return res.status(403).send('Access denied');
    }

    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Error deleting pet');
    }
};

module.exports = { getAllPets, createPet, getPet, updatePet, deletePet };
