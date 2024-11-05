const Pet = require('../models/pet');

const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.render('index', { pets, user: req.user || null }); // Pass user to template
    } catch (error) {
        res.status(500).send('Error loading pets');
    }
};

const createPet = async (req, res) => {
    console.log("Incoming request body for pet creation:", req.body);
    
    try {
        const pet = new Pet(req.body);
        await pet.save();
        console.log("Pet created successfully:", pet);
        res.redirect('/');
    } catch (error) {
        console.error("Error creating pet:", error);

        // Send a more detailed error message for debugging
        res.status(500).send(`Error creating pet: ${error.message}`);
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
        console.log("Access denied for non-admin user attempting to delete pet.");
        return res.status(403).send('Access denied');
    }

    try {
        await Pet.findByIdAndDelete(req.params.id);
        console.log("Pet deleted successfully:", req.params.id);
        res.redirect('/admin');
    } catch (error) {
        console.error("Error deleting pet:", error);
        res.status(500).send('Error deleting pet');
    }
};

module.exports = { getAllPets, createPet, getPet, updatePet, deletePet };
