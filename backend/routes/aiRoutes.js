import express from 'express';
import { analyzeSymptoms, suggestPrescription } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/symptom-checker', protect, analyzeSymptoms);
router.post('/prescription-suggestion', protect, suggestPrescription);

export default router;
