import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) throw new Error('User not found');

        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(`[Authentication Error]: ${err.message}`);

        // Handle token expiration specifically
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Authentication required', message: 'Token expired' });
        }

        res.status(401).json({ error: 'Authentication required' });
    }
};

