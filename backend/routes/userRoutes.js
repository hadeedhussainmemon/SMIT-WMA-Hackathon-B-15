import express from 'express';
import { getUsers, createUser, deleteUser, getDoctors } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getUsers)
    .post(protect, admin, createUser);

router.route('/:id')
    .delete(protect, admin, deleteUser);

router.route('/doctors')
    .get(protect, getDoctors);

export default router;
