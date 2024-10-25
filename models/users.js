const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You must provide a username'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'You must provide an email address'],
        unique: true,
        match: [/.+@.+\..+/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'You must provide a password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    admin: {
        type: Boolean,
        default: false 
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
