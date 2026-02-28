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

        const [
            totalPatients,
            totalDoctors,
            totalAppointments,
            totalPrescriptions,
            appointmentsByStatus,
            recentAppointments
        ] = await Promise.all([
            PatientProfile.countDocuments({}),
            User.countDocuments({ role: 'doctor' }),
            Appointment.countDocuments({}),
            Prescription.countDocuments({}),
            Appointment.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]),
            Appointment.find({}).sort({ createdAt: -1 }).limit(50)
        ]);

        // Logic: Project load by counting appointments in the next 7 days vs previous 7 days
        const now = new Date();
        const nextWeek = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
        const lastWeek = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

        const [upcomingCount, pastWeekCount] = await Promise.all([
            Appointment.countDocuments({ appointmentDate: { $gte: now, $lte: nextWeek } }),
            Appointment.countDocuments({ appointmentDate: { $gte: lastWeek, $lt: now } })
        ]);

        const loadTrend = upcomingCount > pastWeekCount ? 'Increasing' : 'Stable';
        const projectedLoad = upcomingCount;

        res.json({
            overview: {
                totalPatients,
                totalDoctors,
                totalAppointments,
                totalPrescriptions
            },
            trends: {
                loadTrend,
                projectedWeeklyLoad: projectedLoad,
                efficiencyIndex: totalAppointments > 0 ? (totalPrescriptions / totalAppointments).toFixed(2) : 0
            },
            appointmentBreakdown: appointmentsByStatus
        });
    } catch (error) {
        next(error);
    }
};

export { getClinicOverview };
