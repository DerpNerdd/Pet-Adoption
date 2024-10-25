const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();
const port = process.env.PORT | 3000;

const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static('public'));  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startServer = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

app.get('/', (req, res) => {
    // Fetch pets from the database (you would use your Pet model here)
    // Example: const pets = await Pet.find({});
    const pets = []; // Placeholder, replace with actual database query
    res.render('index', { pets });  // Render 'index.ejs' with pet data
});

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/pets', petRoutes);

app.use('/api/v1/contact', contactRoutes);

app.get('/pets/:id', (req, res) => {
    // Fetch the pet details from the database based on ID
    const pet = {}; // Placeholder, replace with actual query like Pet.findById(req.params.id);
    res.render('pet-details', { pet });  // Render 'pet-details.ejs'
});

app.get('/create-pet', (req, res) => {
    res.render('create-pet'); 
});

app.get('/contact/:id', (req, res) => {
    // Fetch the pet and its owner based on ID
    const pet = {};  // Placeholder for pet data
    res.render('contact', { pet });  // Render 'contact.ejs' with the pet data
});

app.get('/admin', (req, res) => {
    if (!req.user || !req.user.admin) {  // Ensure user is admin
        return res.status(403).send('Access denied');
    }
    // Fetch users and pets for admin dashboard
    const users = [];  // Placeholder, replace with actual User.find({});
    const pets = [];   // Placeholder, replace with actual Pet.find({});
    res.render('admin', { users, pets });  // Render 'admin.ejs'
});

app.use(notFound);
app.use(errorHandlerMiddleware);

startServer();
