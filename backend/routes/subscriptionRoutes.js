import express from 'express';
import { getMySubscription, toggleSubscription } from '../controllers/subscriptionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/mine')
    .get(protect, getMySubscription);

router.route('/toggle')
    .put(protect, admin, toggleSubscription);

export default router;
