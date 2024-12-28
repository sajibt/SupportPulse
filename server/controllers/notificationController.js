import Notification from '../models/Notification.js';

import { appError, appSuccess } from '../utils/errorHandler.js';

export const createNotification = async (req, res) => {
    // Creates a new notification for the authenticated user
    try {
        const notification = await Notification.create({
            user: req.user.id,
            ...req.body,
        });
        appSuccess(res, 201, 'Notification created successfully', notification);
    } catch (err) {
        appError(res, 400, 'Failed to create notification', err.message);
    }
};

export const getNotifications = async (req, res) => {
    // Retrieves all notifications for the authenticated user
    try {
        const notifications = await Notification.find({ user: req.user.id });
        if (!notifications || notifications.length === 0) {
            appError(res, 404, 'No notifications found for this user');
        } else {
            appSuccess(res, 200, 'Notifications retrieved successfully', notifications);
        }
    } catch (err) {
        appError(res, 500, 'Failed to retrieve notifications', err.message);
    }
};

export const getNotificationById = async (req, res) => {
    // Retrieves a specific notification by ID
    const { id } = req.params;
    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            appError(res, 404, 'Notification not found');
        } else {
            appSuccess(res, 200, 'Notification retrieved successfully', notification);
        }
    } catch (err) {
        appError(res, 400, 'Invalid notification ID', err.message);
    }
};

export const deleteNotification = async (req, res) => {
    // Deletes a specific notification by ID
    const { id } = req.params;
    try {
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            appError(res, 404, 'Notification not found');
        } else {
            appSuccess(res, 200, 'Notification deleted successfully');
        }
    } catch (err) {
        appError(res, 500, 'Failed to delete notification', err.message);
    }
};

