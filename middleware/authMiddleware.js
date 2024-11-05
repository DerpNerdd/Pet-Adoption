const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.user = null; // No token, so no user logged in
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            req.user = null;
            return next();
        }

        req.user = user;  // Attach full user object to req.user
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        req.user = null;
        next();
    }
};

module.exports = authMiddleware;
