import bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'node:crypto';
import User from '../models/User.js';
import Department from '../models/Department.js';
import { generateToken } from '../utils/tokenUtils.js';
import { appError, appSuccess } from '../utils/responseHelper.js';
import sendPasswordResetEmail from '../utils/sendPasswordResetEmail.js';

// Register User
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return appError(res, 400, 'User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with default role 'user' or the provided role
        const isFirstUser = (await User.countDocuments({})) === 0; // Check if it's the first user
        const userRole = isFirstUser ? 'admin' : 'user'; // Set 'admin' for the first user, otherwise 'user'

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || userRole // Default to 'user' unless specified
        });

        // Generate token
        const token = generateToken(user);

        return appSuccess(res, 201, 'User registered successfully', {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        return appError(res, 500, 'Error registering user', error.message);
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return appError(res, 401, 'Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return appError(res, 401, 'Invalid credentials');
        }

        // Generate token 
        const token = generateToken(user);

        return appSuccess(res, 200, 'Login successful', {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return appError(res, 500, 'Login failed', error.message);
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return appError(res, 404, 'User not found');
        }

        // Generate a random token for password reset using randomBytes
        const resetToken = randomBytes(20).toString('hex');  // Generate a 20-byte token
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password/${resetToken}`;

        // Compose and send the reset password email
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please click the following link to reset your password:</p>
            <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        `;

        try {
            await sendPasswordResetEmail({
                to: email,
                subject: 'Password Reset Request',
                text: message,
            });

            return appSuccess(res, 200, 'Password reset instructions sent to email');
        } catch (emailError) {
            console.error(emailError);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return appError(res, 500, 'Error sending email');
        }

    } catch (error) {
        console.error(error);
        return appError(res, 500, 'Error processing request', error.message);
    }
};


// Reset Password
// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params;

        // Log the received token for debugging
        console.log("Received reset token:", resetToken);

        // Check if resetToken is provided in the URL
        if (!resetToken) {
            return res.status(400).json({ error: "Reset token is required" });
        }

        // Find the user using the raw token (no hashing)
        const user = await User.findOne({
            resetPasswordToken: resetToken,  // Direct comparison of raw tokens
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired reset token" });
        }

        // Proceed to update the password as per the original logic
        const newPassword = req.body.newPassword;
        if (!newPassword) {
            return res.status(400).json({ error: "New password is required" });
        }

        // Hash the new password
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return appSuccess(res, 200, 'Password reset successful');
    } catch (error) {
        return appError(res, 500, 'Internal server error', error.message);

    }
};

// Get Profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
        return appSuccess(res, 200, 'Profile fetched successfully', { user });
    } catch (error) {
        return appError(res, 500, 'Error fetching profile', error.message);
    }
};

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name: req.body.name, email: req.body.email },
            { new: true, runValidators: true }
        ).select('-password -resetPasswordToken -resetPasswordExpires');
        return appSuccess(res, 200, 'Profile updated successfully', { user });
    } catch (error) {
        return appError(res, 500, 'Error updating profile', error.message);
    }
};

// Change Password
export const changePassword = async (req, res) => {
    try {
        // Find the user by ID and select the password field
        const user = await User.findById(req.user.id).select('+password');

        // Compare the current password with the stored hash
        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch) {
            return appError(res, 401, 'Current password is incorrect');
        }

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashedPassword;
        await user.save();

        return appSuccess(res, 200, 'Password updated successfully');
    } catch (error) {
        return appError(res, 500, 'Error changing password', error.message);
    }
};


// Get all departments available for users to choose from
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return appSuccess(res, 200, 'Departments fetched successfully', departments);
    } catch (err) {
        return appError(res, 500, 'Error fetching departments', err.message);
    }
};

