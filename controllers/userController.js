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

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect(redirectTo);
    } catch (error) {
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
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(sanitizedPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect(redirectTo);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const deleteUser = async (req, res) => {
    if (!req.user.admin) {
        return res.status(403).send('Access denied');
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};

module.exports = { registerUser, loginUser, deleteUser };
