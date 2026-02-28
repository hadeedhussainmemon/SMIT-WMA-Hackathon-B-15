import Prescription from '../models/Prescription.js';

// @desc    Create a new digital prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor Only)
const createPrescription = async (req, res, next) => {
    try {
        if (req.user.role !== 'doctor') {
            res.status(403);
            throw new Error('Only doctors can generate prescriptions');
        }

        const { patientId, appointmentId, diagnosis, medicines, notes, pdfUrl } = req.body;

        const prescription = await Prescription.create({
            patient: patientId,
            doctor: req.user._id,
            appointment: appointmentId,
            diagnosis,
            medicines,
            notes,
            pdfUrl
        });

        res.status(201).json(prescription);
    } catch (error) {
        next(error);
    }
};

// @desc    Get prescriptions by patient or doctor
// @route   GET /api/prescriptions
// @access  Private
const getPrescriptions = async (req, res, next) => {
    try {
        let query = {};

        if (req.user.role === 'patient') {
            query.patient = req.user._id;
        } else if (req.user.role === 'doctor') {
            query.doctor = req.user._id;
        }

        const prescriptions = await Prescription.find(query)
            .populate('patient', 'name email')
            .populate('doctor', 'name email')
            .populate('appointment', 'appointmentDate')
            .sort({ createdAt: -1 });

        res.json(prescriptions);
    } catch (error) {
        next(error);
    }
};

export { createPrescription, getPrescriptions };
