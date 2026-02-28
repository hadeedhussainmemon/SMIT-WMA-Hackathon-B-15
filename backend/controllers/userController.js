import User from '../models/User.js';

// @desc    Get all users (Doctors & Receptionists mostly)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
    try {
        // Find users who are not patients (so Admin can see Doctors, Receptionists, and other Admins)
        const users = await User.find({ role: { $ne: 'patient' } }).select('-password');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new user (Doctor/Receptionist/Admin)
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            if (user.role === 'admin' && user._id.toString() === req.user._id.toString()) {
                res.status(400);
                throw new Error('You cannot delete yourself');
            }
            await User.deleteOne({ _id: user._id });
            res.json({ message: 'User removed successfully' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

export { getUsers, createUser, deleteUser };
