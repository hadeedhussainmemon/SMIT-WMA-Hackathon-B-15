import PatientProfile from '../models/PatientProfile.js';
import User from '../models/User.js';

// @desc    Create a patient profile
// @route   POST /api/patients
// @access  Private (Patient/Receptionist)
const createPatientProfile = async (req, res, next) => {
    try {
        const { userId, dateOfBirth, gender, phoneNumber, address, bloodGroup, allergies, medicalHistorySummary } = req.body;

        const profileExists = await PatientProfile.findOne({ user: userId || req.user._id });

        if (profileExists) {
            res.status(400);
            throw new Error('Patient profile already exists');
        }

        const profile = await PatientProfile.create({
            user: userId || req.user._id,
            dateOfBirth,
            gender,
            phoneNumber,
            address,
            bloodGroup,
            allergies,
            medicalHistorySummary
        });

        res.status(201).json(profile);
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient profile by ID
// @route   GET /api/patients/:id
// @access  Private (Doctor, Admin, Receptionist, or the Patient themselves)
const getPatientProfile = async (req, res, next) => {
    try {
        const profile = await PatientProfile.findById(req.params.id).populate('user', 'name email');

        if (profile) {
            // RBAC check: Only allow if admin/doc/recept, or if the profile belongs to the logged-in patient
            if (req.user.role !== 'patient' || profile.user._id.toString() === req.user._id.toString()) {
                res.json(profile);
            } else {
                res.status(403);
                throw new Error('Not authorized to view this profile');
            }
        } else {
            res.status(404);
            throw new Error('Patient profile not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Admin, Doctor, Receptionist)
const getPatients = async (req, res, next) => {
    try {
        const profiles = await PatientProfile.find({}).populate('user', 'name email');
        res.json(profiles);
    } catch (error) {
        next(error);
    }
};

export { createPatientProfile, getPatientProfile, getPatients };
