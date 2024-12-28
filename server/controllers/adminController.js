import User from '../models/User.js';
import { appError, appSuccess } from '../utils/responseHelper.js';

// Controller to update user roles (admin can promote to manager or user)
export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { newRole } = req.body;

        if (!newRole) {
            return appError(res, 400, 'New role is required');
        }

        if (!['manager', 'user'].includes(newRole)) {
            return appError(res, 400, 'Invalid role. Can only set to manager or user.');
        }

        const user = await User.findById(userId);
        if (!user) {
            return appError(res, 404, 'User not found');
        }

        if (user.role === 'admin') {
            return appError(res, 403, 'Cannot modify admin role');
        }

        if (newRole === 'admin') {
            return appError(res, 403, 'Cannot assign the admin role manually');
        }

        const existingAdmins = await User.countDocuments({ role: 'admin' });
        if (existingAdmins > 0 && newRole === 'admin') {
            return appError(res, 400, 'Only the first user can be assigned the admin role');
        }

        user.role = newRole;
        await user.save();

        return appSuccess(res, 200, `User role updated to ${newRole}`, {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        return appError(res, 500, 'Error updating user role', error.message);
    }
};

// Controller to get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password -resetPasswordToken -resetPasswordExpire'); // Excluding sensitive fields
        return appSuccess(res, 200, 'Users fetched successfully', users);
    } catch (error) {
        return appError(res, 500, 'Error fetching users', error.message);
    }
};

// Controller to delete a user (admin only)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return appError(res, 404, 'User not found');
        }
        return appSuccess(res, 200, 'User deleted successfully');
    } catch (error) {
        return appError(res, 500, 'Error deleting user', error.message);
    }
};

// Controller to get a user by ID (admin only)
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password -resetPasswordToken -resetPasswordExpire'); // Excluding sensitive fields
        if (!user) {
            return appError(res, 404, 'User not found');
        }
        return appSuccess(res, 200, 'User fetched successfully', user);
    } catch (error) {
        return appError(res, 500, 'Error fetching user', error.message);
    }
};

