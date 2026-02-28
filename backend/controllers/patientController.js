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

// @desc    Register a new user AND create their patient profile (Receptionist flow)
// @route   POST /api/patients/register
// @access  Private (Receptionist/Admin)
const registerPatientWithUser = async (req, res, next) => {
    try {
        const { name, email, password, dateOfBirth, gender, phoneNumber, address } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            role: 'patient'
        });

        const profile = await PatientProfile.create({
            user: user._id,
            dateOfBirth,
            gender,
            phoneNumber,
            address
        });

        res.status(201).json({
            user: { _id: user._id, name: user.name, email: user.email },
            profile
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update patient profile
// @route   PUT /api/patients/:id
// @access  Private (Receptionist/Admin/Doctor or own Patient)
const updatePatientProfile = async (req, res, next) => {
    try {
        const profile = await PatientProfile.findById(req.params.id);

        if (profile) {
            profile.dateOfBirth = req.body.dateOfBirth || profile.dateOfBirth;
            profile.gender = req.body.gender || profile.gender;
            profile.phoneNumber = req.body.phoneNumber || profile.phoneNumber;
            profile.address = req.body.address || profile.address;
            profile.bloodGroup = req.body.bloodGroup || profile.bloodGroup;
            profile.allergies = req.body.allergies || profile.allergies;
            profile.medicalHistorySummary = req.body.medicalHistorySummary || profile.medicalHistorySummary;

            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        } else {
            res.status(404);
            throw new Error('Patient profile not found');
        }
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

export { createPatientProfile, registerPatientWithUser, updatePatientProfile, getPatientProfile, getPatients };
