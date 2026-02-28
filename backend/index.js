import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';

dotenv.config();

// Unified Database Connection Middleware
let cachedDb = null;
const connectMiddleware = async (req, res, next) => {
    try {
        if (!cachedDb || mongoose.connection.readyState !== 1) {
            console.log('🔄 Establishing fresh clinical data connection...');
            cachedDb = await connectDB();

            // Auto-provision Admin on first successful connection
            if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
                const adminExists = await User.findOne({ role: 'admin' });
                if (!adminExists) {
                    await User.create({
                        name: 'Super Admin',
                        email: process.env.ADMIN_EMAIL,
                        password: process.env.ADMIN_PASSWORD,
                        role: 'admin'
                    });
                    console.log('✅ Default Super Admin provisioned.');
                }
            }
        }
        next();
    } catch (error) {
        console.error('🚨 Connection Guard Failure:', error);
        res.status(503).json({ success: false, message: 'Clinical data cluster temporarily unavailable' });
    }
};

const app = express();

// Middleware
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(connectMiddleware); // Protect all routes with connection guard

// Routes
app.get('/', (req, res) => {
    res.json({
        status: 'CuraAI Enterprise Node is Active',
        environment: process.env.NODE_ENV || 'production',
        db: mongoose.connection.readyState === 1 ? 'Connected (Cluster Stable)' : 'Disconnected (Standby)'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Crucial: Set CORS headers even for errors
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");

    console.error(`Status ${statusCode}: ${err.message}`);

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

// Only listen to port if not running in production/Vercel serverless
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in development mode on port ${PORT}`);
    });
}

// Export for Vercel Serverless
export default app;
