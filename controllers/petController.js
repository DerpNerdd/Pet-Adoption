const Pet = require('../models/pet');
const asyncWrapper = require('../middleware/async');
const authMiddleware = require('../middleware/authMiddleware');  


const getAllPets = asyncWrapper(async (req, res) => {
    const pets = await Pet.find({});
    res.render('index', { pets });  // Render the pet listing page
});

const renderCreatePetForm = [authMiddleware, asyncWrapper(async (req, res) => {
    res.render('create-pet');  // Render the create pet form if authenticated
})];


const createPet = [authMiddleware, asyncWrapper(async (req, res) => {
    const petData = {
        ...req.body,
        owner: req.user.userId  // Use authenticated user's ID as the owner
    };
    const pet = await Pet.create(petData);
    res.status(201).redirect('/');  // Redirect to homepage after creating the pet
})];

const getPet = asyncWrapper(async (req, res) => {
    const petId = req.params.id;
    console.log("Requested Pet ID:", petId);  // Log the requested ID for debugging

    if (!mongoose.Types.ObjectId.isValid(petId)) {
        return res.status(400).send('Invalid Pet ID');
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
        return res.status(404).send('Pet not found');
    }

    console.log("Retrieved Pet Data:", pet);  // Log the retrieved pet data
    res.render('pet-details', { pet });
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
