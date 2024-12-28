// Response helper functions
export const appError = (res, status, message, details = null) => {
    const response = {
        success: false,
        error: message,
    };

    if (details) response.details = details;

    return res.status(status).json(response);
};

// Response for successful operations
export const appSuccess = (res, status, message, data = null) => {
    const response = {
        success: true,
        message,
    };

    if (data) response.data = data;
    return res.status(status).json(response);
};

// Custom error classes for specific error types
export class AppError extends Error {
    constructor(message = 'An error occurred', status = 500) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

export class AuthError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

// Main error handler middleware
export const errorHandler = (err, req, res, next) => {
    // Log the error details for debugging
    console.error(`[Error] ${err.name}: ${err.message}`);
    if (err.stack) console.error('Stack:', err.stack);

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        return appError(res, 400, 'Duplicate value entered', err.keyValue);
    }

    // Handle Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((error) => error.message);
        return appError(res, 400, 'Validation failed', errors);
    }

    // Handle JWT errors (invalid token or expired token)
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return appError(res, 401, 'Invalid or expired token');
    }

    // Handle custom errors like authentication failure or not found
    if (err instanceof AppError) {
        return appError(res, err.status, err.message);
    }

    // Default error handler
    const statusCode = err.status || 500;
    const message =
        process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message;

    return appError(res, statusCode, message);
};

