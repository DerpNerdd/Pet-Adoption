const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const sanitizedPassword = password.trim();
    const redirectTo = req.body.redirectTo || '/';

    try {
        const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        
        console.log("User registered:", newUser);

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        
        console.log("Registration token generated and cookie set:", token);

        res.redirect(redirectTo);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(400).json({ message: 'Error registering user', error });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const sanitizedPassword = password.trim();
    const redirectTo = req.body.redirectTo || '/';

    console.log("Login attempt with email:", email);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Login failed: user not found");
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(sanitizedPassword, user.password);
        console.log("Password match status:", isMatch);

        if (!isMatch) {
            console.log("Login failed: invalid password");
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        console.log("Login successful. Token generated:", token);
        console.log("User details after login:", user);

        res.redirect(redirectTo);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = { registerUser, loginUser, deleteUser };
