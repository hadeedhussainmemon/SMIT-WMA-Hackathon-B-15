import express from 'express';
import { createPatientProfile, getPatientProfile, getPatients } from '../controllers/patientController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createPatientProfile)
    .get(protect, getPatients);

router.route('/:id')
    .get(protect, getPatientProfile);

export default router;
