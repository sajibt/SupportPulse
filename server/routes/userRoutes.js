import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateUser } from '../middleware/validation.js';

import {
    register,
    login,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile,
    changePassword,
    getAllDepartments,
} from '../controllers/userController.js';

const router = express.Router();

// User authentication routes
router.post('/register', validateUser, register); // User registration
router.post('/login', login); // User login
router.post('/forgot-password', forgotPassword); // Forgot password
router.post('/reset-password/:resetToken', resetPassword); // Reset password with token

// User profile and password management routes (authentication required)
router.get('/profile', authenticate, getProfile); // Get authenticated user's profile
router.put('/profile', authenticate, updateProfile); // Update user's profile
router.put('/change-password', authenticate, changePassword); // Change password


// Get all departments (users can see available departments to seek help)
router.get('/departments', authenticate, getAllDepartments);


export default router;

