const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const sanitizedPassword = password.trim();  // Trim any whitespace
    const redirectTo = req.body.redirectTo || '/';

    try {
        const newUser = await User.create({ username, email, password: sanitizedPassword });  // Save without explicit hashing

        // Log the user in by issuing a token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect(redirectTo);  // Redirect to the original page
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(400).json({ message: 'Error registering user', error });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const sanitizedPassword = password.trim();
    const redirectTo = req.body.redirectTo || '/';

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: 'User not found' });
        }

        console.log("Password input:", sanitizedPassword);
        console.log("Stored hash:", user.password);

        const isMatch = await bcrypt.compare(sanitizedPassword, user.password);
        console.log("Password Match Result:", isMatch);  // Log comparison result

        if (!isMatch) {
            console.log("Password does not match");
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect(redirectTo);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};


module.exports = { registerUser, loginUser };
