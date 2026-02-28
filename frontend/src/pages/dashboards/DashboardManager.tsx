import { useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import type { RootState } from '../../store';

import DashboardLayout from '../../components/DashboardLayout';
import ProfileEditor from '../../components/ProfileEditor';

import AdminDashboard from './AdminDashboard';
import DoctorDashboard from './DoctorDashboard';
import ReceptionistDashboard from './ReceptionistDashboard';
import ReceptionistPatients from './ReceptionistPatients';
import PatientDashboard from './PatientDashboard';
import AdminStaffManager from './AdminStaffManager';
import AdminSaaSPlans from './AdminSaaSPlans';
import AdminAnalytics from './AdminAnalytics';

import NeuralLab from './NeuralLab.tsx';

const DashboardManager = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const renderRoleDashboard = () => {
        switch (user.role) {
            case 'admin':
                return (
                    <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/staff" element={<AdminStaffManager />} />
                        <Route path="/plans" element={<AdminSaaSPlans />} />
                        <Route path="/analytics" element={<AdminAnalytics />} />
                        <Route path="/lab" element={<NeuralLab />} />
                    </Routes>
                );
            case 'doctor':
                // Dr Dashboard currently handles its own tabs (AI, Schedule) in one file. We can split it later or keep it unified.
                // We'll leave it as is for now, maybe mapping /ai and / to the same component since it uses state.
                return (
                    <Routes>
                        <Route path="/*" element={<DoctorDashboard />} />
                        <Route path="/lab" element={<NeuralLab />} />
                    </Routes>
                );
            case 'receptionist':
                return (
                    <Routes>
                        <Route path="/" element={<ReceptionistDashboard />} />
                        <Route path="/patients" element={<ReceptionistPatients />} />
                    </Routes>
                );
            case 'patient':
                return (
                    <Routes>
                        <Route path="/" element={<PatientDashboard />} />
                        <Route path="/prescriptions" element={<PatientDashboard />} />
                        <Route path="/lab" element={<NeuralLab />} />
                    </Routes>
                );
            default:
                return <Navigate to="/login" replace />;
        }
    };

    return (
        <DashboardLayout>
            <Routes>
                <Route path="/profile" element={
                    <div className="p-4 sm:p-8">
                        <ProfileEditor />
                    </div>
                } />
                <Route path="/*" element={renderRoleDashboard()} />
            </Routes>
        </DashboardLayout>
    );
};

export default DashboardManager;
