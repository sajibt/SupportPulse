import { Router } from 'express';
import { createNotification, getNotifications, getNotificationById, deleteNotification } from '../controllers/notificationController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = Router();

// Apply authentication middleware to all notification routes
router.use(authenticate);

// Route to create a notification
router.post('/', createNotification);

// Route to get all notifications for the authenticated user
router.get('/', getNotifications);

// Route to get a specific notification by ID
router.get('/:id', getNotificationById);

// Route to delete a notification by ID
router.delete('/:id', deleteNotification);

export default router;

