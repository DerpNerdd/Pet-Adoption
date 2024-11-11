const Pet = require('../models/pet');
const { cloudinary } = require('../config/cloudinaryConfig');

const getAllPets = async (req, res) => {
    try {
        // Extract query parameters
        const { searchTerm, breed, minAge, maxAge, state, city, sortPrice } = req.query;

        // Build the query object
        let queryObject = {};

        // Add search functionality
        if (searchTerm) {
            // Use a regex to search in multiple fields
            const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive

            queryObject.$or = [
                { name: searchRegex },
                { breed: searchRegex },
                { description: searchRegex },
                { behavior: searchRegex },
                { history: searchRegex },
                { 'location.city': searchRegex },
                { 'location.state': searchRegex }
            ];
        }

        // Add breed filter
        if (breed) {
            queryObject.breed = { $regex: breed, $options: 'i' }; // Case-insensitive regex search
        }

        // Add age filter
        if (minAge || maxAge) {
            queryObject.age = {};
            if (minAge) queryObject.age.$gte = Number(minAge);
            if (maxAge) queryObject.age.$lte = Number(maxAge);
        }

        // Add location filter
        if (state) {
            queryObject['location.state'] = state;
        }
        if (city) {
            queryObject['location.city'] = { $regex: city, $options: 'i' };
        }

        // Initialize query
        let query = Pet.find(queryObject);

        // Add sorting
        if (sortPrice) {
            const sortOrder = sortPrice === 'lowToHigh' ? 1 : -1;
            query = query.sort({ price: sortOrder });
        }

        // Execute query
        const pets = await query.exec();

        // Pass query parameters to the view
        res.render('index', {
            pets,
            user: req.user || null,
            searchTerm,
            breed,
            minAge,
            maxAge,
            state,
            city,
            sortPrice
        });
    } catch (error) {
        console.error("Error loading pets:", error);
        res.status(500).send('Error loading pets');
    }
};


const createPet = async (req, res) => {
    try {
        const petData = {
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

        // Process profile image if provided
        if (req.files && req.files.profileImage) {
            const profileImage = req.files.profileImage[0];
            // Set profileImage as an object with url and public_id
            petData.profileImage = {
                url: profileImage.path,
                public_id: profileImage.filename
            };
            console.log(`Profile image URL set for pet: ${petData.profileImage.url}`);
        } else {
            console.log("No profile image provided in request.");
        }

        // Handle additional images
        if (req.files && req.files.images) {
            petData.images = req.files.images.map(file => ({
                url: file.path,
                public_id: file.filename
            }));
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
        const pet = await Pet.findById(req.params.id);
        if (pet) {
            // Delete profile image from Cloudinary
            await cloudinary.uploader.destroy(pet.profileImage.public_id);

            // Delete additional images
            for (let image of pet.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }

            // Delete pet from database
            await Pet.findByIdAndDelete(req.params.id);
            console.log("Pet deleted successfully:", req.params.id);
            res.redirect('/admin');
        } else {
            res.status(404).send('Pet not found');
        }
    } catch (error) {
        console.error("Error deleting pet:", error);
        res.status(500).send('Error deleting pet');
    }
};

module.exports = { getAllPets, createPet, getPet, updatePet, deletePet };
