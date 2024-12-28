import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { errorHandler } from './utils/responseHelper.js';
import connectDB from './config/database.js';
import { authenticate, authorize } from './middleware/authMiddleware.js'; // Import your middleware

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: './config/config.dev.env' });
} else if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: './config/config.env' });
} else {
    console.error("NODE_ENV is not set. Please specify either 'development' or 'production'.");
    process.exit(1);
}

// Routes
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messages.js';
import notificationRoutes from './routes/notifications.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use('/api', limiter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);

// Admin routes with authentication and authorization (e.g., only admin users can access)
app.use('/api/admin', authenticate, authorize('admin'), adminRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

export default app;

