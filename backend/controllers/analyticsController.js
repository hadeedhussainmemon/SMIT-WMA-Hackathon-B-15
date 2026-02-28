import User from '../models/User.js';
import PatientProfile from '../models/PatientProfile.js';
import Appointment from '../models/Appointment.js';
import Prescription from '../models/Prescription.js';

// @desc    Get clinic overview analytics
// @route   GET /api/analytics/overview
// @access  Private (Admin)
const getClinicOverview = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            res.status(403);
            throw new Error('Not authorized as an admin');
        }

        // Parallel data fetching for performance
        const [
            totalPatients,
            totalDoctors,
            totalAppointments,
            totalPrescriptions,
            appointmentsByStatus
        ] = await Promise.all([
            PatientProfile.countDocuments({}),
            User.countDocuments({ role: 'doctor' }),
            Appointment.countDocuments({}),
            Prescription.countDocuments({}),
            Appointment.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ])
        ]);

        res.json({
            overview: {
                totalPatients,
                totalDoctors,
                totalAppointments,
                totalPrescriptions
            },
            appointmentBreakdown: appointmentsByStatus
        });
    } catch (error) {
        next(error);
    }
};

export { getClinicOverview };
