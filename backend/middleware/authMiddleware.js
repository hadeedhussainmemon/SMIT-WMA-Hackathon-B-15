import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

// Admin middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

// RBAC middleware to ensure user accesses only own data
export const checkOwnership = (req, res, next) => {
    // Assuming the resource has a `user` field or the route param matches req.user._id
    if (req.user.role === 'admin' || req.params.userId === req.user._id.toString()) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized to access this data');
    }
};
