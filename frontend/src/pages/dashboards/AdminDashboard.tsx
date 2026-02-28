import { useGetClinicOverviewQuery } from '../../store/api/analyticsApiSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, UserPlus, Calendar, FileText } from 'lucide-react';

const AdminDashboard = () => {
    const { data, isLoading } = useGetClinicOverviewQuery({});

    if (isLoading) {
        return <div className="p-8 flex items-center justify-center h-screen"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
    }

    const overview = data?.overview;
    const chartData = data?.appointmentBreakdown?.map((item: { _id: string; count: number }) => ({
        name: item._id,
        count: item.count
    })) || [];

    return (
        <div className="p-2 text-gray-900">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Clinic Overview</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Patients</p>
                        <h3 className="text-2xl font-bold">{overview?.totalPatients || 0}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl"><UserPlus className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Doctors</p>
                        <h3 className="text-2xl font-bold">{overview?.totalDoctors || 0}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-purple-100 text-purple-600 rounded-xl"><Calendar className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Appointments</p>
                        <h3 className="text-2xl font-bold">{overview?.totalAppointments || 0}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-orange-100 text-orange-600 rounded-xl"><FileText className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Prescriptions</p>
                        <h3 className="text-2xl font-bold">{overview?.totalPrescriptions || 0}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Appointment Status Distribution</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={60} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
