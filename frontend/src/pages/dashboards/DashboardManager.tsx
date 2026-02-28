import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../../store';

import AdminDashboard from './AdminDashboard.tsx';
import DoctorDashboard from './DoctorDashboard.tsx';
import ReceptionistDashboard from './ReceptionistDashboard.tsx';
import PatientDashboard from './PatientDashboard.tsx';

const DashboardManager = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    switch (user.role) {
        case 'admin':
            return <AdminDashboard />;
        case 'doctor':
            return <DoctorDashboard />;
        case 'receptionist':
            return <ReceptionistDashboard />;
        case 'patient':
            return <PatientDashboard />;
        default:
            return <Navigate to="/login" replace />;
    }
};

export default DashboardManager;
