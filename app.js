const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const cookieParser = require('cookie-parser');  // Import cookie-parser
const authMiddleware = require('./middleware/authMiddleware');  // Import the auth middleware
const router = express.Router();
const { getPet } = require('./controllers/petController');
require('dotenv').config();
const port = process.env.PORT || 3000;

// Import route files
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cookieParser());  // Use cookie-parser middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
router.get('/:id', getPet); 
app.use('/', petRoutes); 


// Start Server and Connect to Database
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

// Routes
app.get('/', (req, res) => {
    const pets = [];  // Placeholder, replace with actual database query
    res.render('index', { pets });  // Render 'index.ejs' with pet data
});

app.get('/login', (req, res) => {
    const redirectTo = req.query.redirectTo || '/';
    res.render('login', { redirectTo });
});

app.get('/signup', (req, res) => {
    const redirectTo = req.query.redirectTo || '/';
    res.render('signup', { redirectTo });
});

// Handle Login and Signup Form Submission
app.use('/api/v1/users', userRoutes);  // Handles POST for login and signup

app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/contact', contactRoutes);

// Pet Details Page
app.get('/pets/:id', async (req, res) => {
    const pet = {};  // Placeholder for pet data (e.g., Pet.findById(req.params.id))
    res.render('pet-details', { pet });
});

app.get('/create-pet', authMiddleware, (req, res) => {
    res.render('create-pet');
});

// Contact Form Page
app.get('/contact/:id', (req, res) => {
    const pet = {};  // Placeholder for pet data
    res.render('contact', { pet });
});

// Admin Dashboard (Protected Route)
app.get('/admin', authMiddleware, (req, res) => {
    if (!req.user.admin) {  // Ensure user is admin
        return res.status(403).send('Access denied');
    }
    const users = [];  // Placeholder for user data
    const pets = [];   // Placeholder for pet data
    res.render('admin', { users, pets });
});

// Error Handling and 404
app.use(notFound);
app.use(errorHandlerMiddleware);

// Start the server
startServer();
