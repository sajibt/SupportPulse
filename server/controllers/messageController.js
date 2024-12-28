import Message from '../models/Message.js';
import { sendPushNotification } from '../services/pushNotificationService.js';
import { appError, appSuccess } from '../utils/responseHelper.js';

export const sendMessage = async (req, res) => {
    try {
        const message = await Message.create({
            sender: req.user.id,
            ...req.body
        });
        await sendPushNotification(message);
        appSuccess(res, 201, 'Message sent successfully', message);
    } catch (err) {
        appError(res, 400, 'Failed to send message', err.message);
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ department: req.params.departmentId })
            .populate('sender');
        appSuccess(res, 200, 'Messages retrieved successfully', messages);
    } catch (err) {
        appError(res, 500, 'Failed to retrieve messages', err.message);
    }
};

