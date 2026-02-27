import express from 'express';
import { authUser, registerUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

// NOTE: use protect middleware on other routes
// e.g. router.route('/profile').get(protect, getUserProfile) 

export default router;
