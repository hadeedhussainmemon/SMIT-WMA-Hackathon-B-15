import express from 'express';
import { createPatientProfile, registerPatientWithUser, updatePatientProfile, getPatientProfile, getPatients } from '../controllers/patientController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createPatientProfile)
    .get(protect, getPatients);

router.post('/register', protect, registerPatientWithUser);

router.route('/:id')
    .get(protect, getPatientProfile)
    .put(protect, updatePatientProfile);

export default router;
