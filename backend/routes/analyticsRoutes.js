import express from 'express';
import { getClinicOverview } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/overview').get(protect, getClinicOverview);

export default router;
