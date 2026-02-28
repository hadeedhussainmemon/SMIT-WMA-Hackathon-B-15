import { useState } from 'react';
import { useGetAppointmentsQuery, useUpdateAppointmentStatusMutation, useCreateAppointmentMutation } from '../../store/api/appointmentApiSlice';
import { useGetPatientsQuery } from '../../store/api/patientApiSlice';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock, Plus } from 'lucide-react';

const ReceptionistDashboard = () => {
    const { data: appointments, isLoading: appsLoading } = useGetAppointmentsQuery({});
    useGetPatientsQuery({}); // Just call it to cache if needed, but we don't need the return value here currently
    const [updateStatus] = useUpdateAppointmentStatusMutation();
    const [createAppointment] = useCreateAppointmentMutation();

    const [isBooking, setIsBooking] = useState(false);
    const [bookingData, setBookingData] = useState({ patientId: '', doctorId: '', date: '', time: '', reason: '' });

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await updateStatus({ id, status: newStatus });
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    const handleBook = async () => {
        try {
            await createAppointment({
                patientId: bookingData.patientId,
                doctorId: bookingData.doctorId, // Expects standard doctor selection
                appointmentDate: new Date(`${bookingData.date}T${bookingData.time}`),
                reasonForVisit: bookingData.reason
            });
            setIsBooking(false);
        } catch (error) {
            console.error('Booking failed', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            <div className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Front Desk</h1>
                        <p className="text-gray-500 mt-1">Manage patient flow and scheduling.</p>
                    </div>
                    <button
                        onClick={() => setIsBooking(!isBooking)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" /> Book Walk-In
                    </button>
                </div>

                {isBooking && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 grid grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        {/* simplified booking form for UI representation */}
                        <div><label className="text-xs font-semibold mb-1 block">Patient ID</label><input className="w-full border rounded-lg p-2" onChange={(e) => setBookingData({ ...bookingData, patientId: e.target.value })} placeholder="Patient ID" /></div>
                        <div><label className="text-xs font-semibold mb-1 block">Doctor ID</label><input className="w-full border rounded-lg p-2" onChange={(e) => setBookingData({ ...bookingData, doctorId: e.target.value })} placeholder="Doctor ID" /></div>
                        <div><label className="text-xs font-semibold mb-1 block">Date</label><input type="date" className="w-full border rounded-lg p-2" onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })} /></div>
                        <div><label className="text-xs font-semibold mb-1 block">Time</label><input type="time" className="w-full border rounded-lg p-2" onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })} /></div>
                        <div className="col-span-3"><label className="text-xs font-semibold mb-1 block">Reason</label><input className="w-full border rounded-lg p-2" onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })} placeholder="Reason for visit" /></div>
                        <button onClick={handleBook} className="bg-emerald-600 text-white p-2 rounded-lg font-medium hover:bg-emerald-700">Confirm Booking</button>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100/80">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Patient</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Doctor</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Time</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Reason</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {appsLoading ? (
                                <tr><td colSpan={6} className="p-8 text-center text-gray-500 animate-pulse">Loading schedule...</td></tr>
                            ) : appointments?.map((app: { _id: string; patient?: { name: string }; doctor?: { name: string }; appointmentDate: string; reasonForVisit: string; status: string }) => (
                                <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-medium">{app.patient?.name || 'Unknown'}</td>
                                    <td className="p-4 text-gray-600">{app.doctor?.name || 'Unassigned'}</td>
                                    <td className="p-4 text-gray-600 flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" />{format(new Date(app.appointmentDate), 'p')}</td>
                                    <td className="p-4 text-gray-600 truncate max-w-[200px]">{app.reasonForVisit}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${app.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                            app.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                app.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>{app.status}</span>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        {app.status === 'Pending' && (
                                            <button onClick={() => handleStatusUpdate(app._id, 'Confirmed')} className="p-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200" title="Confirm"><CheckCircle className="w-4 h-4" /></button>
                                        )}
                                        {app.status !== 'Cancelled' && app.status !== 'Completed' && (
                                            <button onClick={() => handleStatusUpdate(app._id, 'Cancelled')} className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200" title="Cancel"><XCircle className="w-4 h-4" /></button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReceptionistDashboard;
