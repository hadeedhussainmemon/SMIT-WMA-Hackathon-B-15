import express from 'express';
import { analyzeSymptoms, suggestPrescription, explainPrescription } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/symptom-checker', protect, analyzeSymptoms);
router.post('/suggest-prescription', protect, suggestPrescription);
router.post('/explain-prescription', protect, explainPrescription);

export default router;
