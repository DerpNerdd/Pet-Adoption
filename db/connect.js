require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(process.env.MONGOURI, {
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = connectDB;