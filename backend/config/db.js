import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false); // Ensure compatibility
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

export default connectDB;
