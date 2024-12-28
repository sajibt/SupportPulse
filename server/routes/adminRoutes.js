import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import {
    updateUserRole,
    getAllUsers,
    deleteUser,
    getUserById
} from '../controllers/adminController.js';

const router = express.Router();

// Update user role (only admins can perform this action)
router.put('/users/:userId/role', authenticate, authorize('admin'), updateUserRole);

// Get all users (only admins can access this)
router.get('/users', authenticate, authorize('admin'), getAllUsers);

// Delete a user (only admins can delete users)
router.delete('/users/:userId', authenticate, authorize('admin'), deleteUser);

// Get a user by ID (only admins can view full user info)
router.get('/users/:userId', authenticate, authorize('admin'), getUserById);

export default router;

