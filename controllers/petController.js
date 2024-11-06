const Pet = require('../models/pet');
const fs = require('fs');
const path = require('path');

const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.render('index', { pets, user: req.user || null }); // Pass user to template
    } catch (error) {
        res.status(500).send('Error loading pets');
    }
};

const createPet = async (req, res) => {
    try {
        const petData = {
            _id: req.tempPetId, // Use the ID generated earlier
            name: req.body.name,
            age: req.body.age,
            price: req.body.price,
            location: req.body.location,
            breed: req.body.breed,
            description: req.body.description,
            behavior: req.body.behavior,
            history: req.body.history,
            owner: req.user._id
        };

        // Process images if provided
        if (req.files && req.files.profileImage) {
            const profileImage = req.files.profileImage[0].filename;
            petData.profileImage = `/petimages/${petData._id}/${profileImage}`;
            console.log(`Profile image path set for pet: ${petData.profileImage}`);
        } else {
            console.log("No profile image provided in request.");
        }

        // Create and save the pet
        const pet = new Pet(petData);
        await pet.save();
        console.log("Pet created successfully:", pet);
        res.redirect('/');
    } catch (error) {
        console.error("Error creating pet:", error);
        res.status(500).send("An error occurred while creating the pet.");
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
