// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if token is not provided
    if (!token) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store the decoded user information in the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Token verification failed
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
};

module.exports = authMiddleware;
