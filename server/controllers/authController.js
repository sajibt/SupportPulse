import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { appError, appSuccess } from '../utils/errorHandler.js';

export const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        appSuccess(res, 201, 'User registered successfully', { user, token });
    } catch (err) {
        appError(res, 400, 'Registration failed', err.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !await bcrypt.compare(password, user.password)) {
            return appError(res, 401, 'Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        appSuccess(res, 200, 'Login successful', { user, token });
    } catch (err) {
        appError(res, 400, 'Login failed', err.message);
    }
};

