import express from 'express';
import { analyzeSymptoms, suggestPrescription, explainPrescription, analyzeReport } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/symptom-checker', protect, analyzeSymptoms);
router.post('/suggest-prescription', protect, suggestPrescription);
router.post('/explain-prescription', protect, explainPrescription);
router.post('/analyze-report', protect, analyzeReport);

export default router;
