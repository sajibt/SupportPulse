import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import { authenticate } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', authenticate, sendMessage);
router.get('/:departmentId', authenticate, getMessages);

export default router;

