const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/login'); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).redirect('/login');
        }

        req.user = user;  // Set the full user object, including admin status, on req.user
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).redirect('/login');
    }
};

module.exports = authMiddleware;
