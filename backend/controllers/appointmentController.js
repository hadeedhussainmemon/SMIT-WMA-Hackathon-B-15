import Appointment from '../models/Appointment.js';

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Patient, Receptionist)
const createAppointment = async (req, res, next) => {
    try {
        const { doctorId, appointmentDate, reasonForVisit, patientId } = req.body;

        // If patient books themselves, use their ID. If receptionist books, use provided patientId
        const bookedPatientId = req.user.role === 'patient' ? req.user._id : patientId;

        const appointment = await Appointment.create({
            patient: bookedPatientId,
            doctor: doctorId,
            appointmentDate,
            reasonForVisit
        });

        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
};

// @desc    Get appointments (filtered by user role)
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
    try {
        let query = {};

        // Role-based filtering
        if (req.user.role === 'patient') {
            query.patient = req.user._id; // Patients see only their own
        } else {
            // Doctors/Receptionists/Admins can filter by patientId if provided for history views
            if (req.query.patientId) {
                query.patient = req.query.patientId;
            } else if (req.user.role === 'doctor') {
                query.doctor = req.user._id; // Default doctor view: their own appointments
            }
        }

        const appointments = await Appointment.find(query)
            .populate('patient', 'name email')
            .populate('doctor', 'name email')
            .sort({ appointmentDate: 1 }); // Chronological sort

        res.json(appointments);
    } catch (error) {
        next(error);
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Receptionist, Doctor, Admin)
const updateAppointmentStatus = async (req, res, next) => {
    try {
        const { status } = req.body; // e.g., 'Confirmed', 'Completed', 'Cancelled'

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            res.status(404);
            throw new Error('Appointment not found');
        }

        appointment.status = status;
        const updatedAppointment = await appointment.save();

        res.json(updatedAppointment);
    } catch (error) {
        next(error);
    }
};

export { createAppointment, getAppointments, updateAppointmentStatus };
