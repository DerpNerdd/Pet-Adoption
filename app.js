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

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apply authMiddleware globally
app.use(authMiddleware);

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', getAllPets);
app.use('/pets', petRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/contact', contactRoutes);



// Additional pages
app.get('/logout', (req, res) => {res.clearCookie('token'); console.log("User logged out"); res.redirect('/');});
app.get('/login', (req, res) => res.render('login', { redirectTo: req.query.redirectTo || '/' }));
app.get('/signup', (req, res) => res.render('signup', { redirectTo: req.query.redirectTo || '/' }));
app.get('/create-pet', (req, res) => res.render('create-pet'));
app.get('/about-us', (req, res) => res.render('about-us'));
app.get('/testimonials', (req, res) => res.render('testimonials'));
app.get('/admin', async (req, res) => {
    if (!req.user?.admin) return res.status(403).send('Access denied');
    const User = require('./models/users');
    const Pet = require('./models/pet');
    const users = await User.find({ admin: false });
    const pets = await Pet.find();
    res.render('admin', { users, pets });
});


// Error handling
app.use(notFound);
app.use(errorHandlerMiddleware);

// Start server
const startServer = async () => {
    try {
        await connectDB(process.env.MONGOURI);
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
    } catch (error) {
        console.error(error);
    }
};

startServer();

/* ENV CODE
MONGOURI="YOUR CONNECTION STRING"
PORT = "5000"
JWT_SECRET= "YOUR SECRET PASSWORD"
CLOUDINARY_CLOUD_NAME="YOUR CLOUDINARY CLOUD NAME"
CLOUDINARY_API_KEY="YOUR CLOUDINARY API KEY"
CLOUDINARY_API_KEY_SECRET="YOUR CLOUDINARY API KEY SECRET"
EMAIL_USERNAME= "THE EMAIL YOU WANT TO SEND EMAILS"
EMAIL_PASSWORD= "YOUR SPECIAL APP PASSWORD FOR YOUR EMAIL (NOT NORMAL PASSWORD)" */