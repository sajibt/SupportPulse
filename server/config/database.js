import mongoose from 'mongoose';

const connectDB = async () => {
    const MAX_RETRIES = 5;
    const BASE_RETRY_DELAY = 5000; // Base delay in ms (5 seconds)

    for (let attempts = 1; attempts <= MAX_RETRIES; attempts++) {
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000, // Timeout for MongoDB connection attempt
            });

            const { host, port } = conn.connection;
            console.log(`MongoDB Connected: ${host}:${port}`);
            return conn; // Connection successful, return the connection object
        } catch (error) {
            const delay = BASE_RETRY_DELAY * Math.pow(2, attempts - 1); // Exponential backoff
            console.error(`MongoDB connection failed (attempt ${attempts}/${MAX_RETRIES}): ${error.message}`);

            if (attempts < MAX_RETRIES) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                console.error('Max retries reached. MongoDB connection failed.');
                console.error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts. Exiting application.`);
                process.exit(1);
            }
        }
    }
};

export default connectDB;

