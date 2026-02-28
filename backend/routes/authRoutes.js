import express from 'express';
import { authUser, registerUser, logoutUser, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

router.route('/profile').put(protect, updateUserProfile);

export default router;
