import { useGetAppointmentsQuery } from '../../store/api/appointmentApiSlice';
import { useGetPrescriptionsQuery } from '../../store/api/prescriptionApiSlice';
import { format } from 'date-fns';
import { Calendar, Download, Pill } from 'lucide-react';

const PatientDashboard = () => {
    // Redux automatically filters these to only the logged-in patient's data because of our backend token Auth
    const { data: appointments, isLoading: appsLoading } = useGetAppointmentsQuery({});
    const { data: prescriptions, isLoading: pxLoading } = useGetPrescriptionsQuery({});

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900 font-sans p-8">
            <div className="max-w-5xl mx-auto space-y-12">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Health Portal</h1>
                    <p className="text-gray-500 mt-2">View your upcoming appointments and medical documents here.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Appointments Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            My Appointments
                        </h2>

                        {appsLoading ? (
                            <div className="animate-pulse flex flex-col gap-3"><div className="h-16 bg-gray-100 rounded-xl"></div><div className="h-16 bg-gray-100 rounded-xl"></div></div>
                        ) : (
                            <div className="space-y-4">
                                {appointments?.map((app: { _id: string; appointmentDate: string; reasonForVisit: string; status: string }) => (
                                    <div key={app._id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-900">{format(new Date(app.appointmentDate), 'EEEE, MMM do yyyy')}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">{format(new Date(app.appointmentDate), 'p')} - {app.reasonForVisit}</p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${app.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                ))}
                                {appointments?.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No appointments found.</p>}
                            </div>
                        )}
                    </div>

                    {/* Prescriptions Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                            <Pill className="w-5 h-5 text-emerald-500" />
                            Digital Prescriptions
                        </h2>

                        {pxLoading ? (
                            <div className="animate-pulse flex flex-col gap-3"><div className="h-16 bg-gray-100 rounded-xl"></div><div className="h-16 bg-gray-100 rounded-xl"></div></div>
                        ) : (
                            <div className="space-y-4">
                                {prescriptions?.map((px: { _id: string; diagnosis: string; doctor?: { name: string }; createdAt: string }) => (
                                    <div key={px._id} className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 flex justify-between items-center group">
                                        <div>
                                            <p className="font-semibold text-gray-900 capitalize">{px.diagnosis}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">Dr. {px.doctor?.name} • {format(new Date(px.createdAt), 'MMM do, yyyy')}</p>
                                        </div>
                                        <button className="p-2 bg-white text-emerald-600 rounded-lg shadow-sm border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors" title="Download PDF">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                {prescriptions?.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No prescriptions found.</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
