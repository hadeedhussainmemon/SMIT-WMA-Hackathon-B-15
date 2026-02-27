import mongoose from 'mongoose';

let cachedDb = null;

const connectDB = async () => {
    if (cachedDb) {
        console.log("Using cached MongoDB connection");
        return cachedDb;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/boilerplate');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        cachedDb = conn;
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Remove process.exit(1) for serverless
        throw error;
    }
};

export default connectDB;
