import { verifyToken } from '../utils/tokenUtils.js';
import User from '../models/User.js';

// Authentication middleware to check if the user is authenticated
export const authenticate = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        // Use the verifyToken utility to verify and decode the token
        const decoded = verifyToken(token);

        // Fetch user from the database using the decoded ID
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found or invalid token' });
        }

        req.user = user; // Attach the user info to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};


// Authorization middleware to check if the user has the required role(s)
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Not authorized to access this resource',
            });
        }
        next();  // Proceed if the user has the required role
    };
};

