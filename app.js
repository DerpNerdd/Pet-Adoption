const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');
const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { getAllPets } = require('./controllers/petController');
require('dotenv').config();
const port = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', getAllPets);  // Main landing page to display all pets
app.use('/pets', petRoutes);  // Use petRoutes for individual pet pages
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/contact', contactRoutes);

// Explicit Routes for Specific Pages
app.get('/login', (req, res) => {
    const redirectTo = req.query.redirectTo || '/';
    res.render('login', { redirectTo });
});

app.get('/signup', (req, res) => {
    const redirectTo = req.query.redirectTo || '/';
    res.render('signup', { redirectTo });
});

app.get('/create-pet', authMiddleware, (req, res) => {
    res.render('create-pet');
});

app.get('/admin', authMiddleware, async (req, res) => {
    if (!req.user.admin) {
        return res.status(403).send('Access denied');
    }

    try {
        const users = await require('./models/users').find({ admin: false });
        const pets = await require('./models/pet').find();
        res.render('admin', { users, pets });
    } catch (error) {
        console.error("Error fetching data for admin page:", error);
        res.status(500).send('Error loading admin data');
    }
});

// Error Handling and 404
app.use(notFound);
app.use(errorHandlerMiddleware);

// Start the server and connect to the database
const startServer = async () => {
    try {
        await connectDB(process.env.MONGOURI);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
