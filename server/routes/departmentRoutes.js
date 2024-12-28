import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from '../controllers/departmentController.js';

const router = express.Router();

// Create a new department (only admins can do this)
router.post('/departments', authenticate, authorize('admin'), createDepartment);

// Get all departments (only admins can access this)
router.get('/departments', authenticate, authorize('admin'), getAllDepartments);

// Get a department by ID (only admins can access this)
router.get('/departments/:departmentId', authenticate, authorize('admin'), getDepartmentById);

// Update a department's details (only admins can do this)
router.put('/departments/:departmentId', authenticate, authorize('admin'), updateDepartment);

// Delete a department (only admins can do this)
router.delete('/departments/:departmentId', authenticate, authorize('admin'), deleteDepartment);

export default router;

