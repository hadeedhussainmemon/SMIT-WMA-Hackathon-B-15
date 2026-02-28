import { useState } from 'react';
import { useGetAppointmentsQuery, useUpdateAppointmentStatusMutation } from '../../store/api/appointmentApiSlice';
import { useAnalyzeSymptomsMutation, useSuggestPrescriptionMutation } from '../../store/api/aiApiSlice';
import { useCreatePrescriptionMutation } from '../../store/api/prescriptionApiSlice';
import { format } from 'date-fns';
import { Calendar, Stethoscope, Pill, FileText, CheckCircle, Clock } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const DoctorDashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [activeTab, setActiveTab] = useState('appointments');
    const [selectedPatient, setSelectedPatient] = useState<{ _id: string; appointmentId: string; name: string; age?: number; gender?: string } | null>(null);

    // RTK Queries & Mutations
    const { data: appointments, isLoading: appsLoading } = useGetAppointmentsQuery({});
    const [updateStatus] = useUpdateAppointmentStatusMutation();
    const [analyzeSymptoms, { isLoading: analyzing }] = useAnalyzeSymptomsMutation();
    const [suggestPrescription, { isLoading: suggesting }] = useSuggestPrescriptionMutation();
    const [createPrescription] = useCreatePrescriptionMutation();

    // AI Form States
    const [symptoms, setSymptoms] = useState('');
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [aiPrescription, setAiPrescription] = useState('');

    const handlePatientSelect = (patient: { _id: string; name: string } | undefined, appointment: { _id: string }) => {
        if (!patient) return;
        setSelectedPatient({ _id: patient._id, name: patient.name, appointmentId: appointment._id });
        setActiveTab('symptom-checker');
    };

    const handleAnalyze = async () => {
        if (!symptoms || !selectedPatient) return;
        try {
            const res = await analyzeSymptoms({
                symptoms,
                patientAge: 30, // Mocked for simplicity
                patientGender: 'Male' // Mocked for simplicity
            }).unwrap();
            setAiAnalysis(res.analysis);
        } catch (error) {
            console.error('Failed to analyze', error);
        }
    };

    const handleSuggestPrescription = async () => {
        if (!diagnosis || !selectedPatient) return;
        try {
            const res = await suggestPrescription({
                diagnosis,
                patientAge: 30, // Mocked
                patientGender: 'Male' // Mocked
            }).unwrap();
            setAiPrescription(res.prescription);
        } catch (error) {
            console.error('Failed to suggest', error);
        }
    };

    const generatePdf = async () => {
        if (!selectedPatient) return;

        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text('Smart Clinic - Digital Prescription', 20, 20);

        doc.setFontSize(14);
        doc.text(`Doctor: ${user?.name}`, 20, 40);
        doc.text(`Patient: ${selectedPatient.name}`, 20, 50);
        doc.text(`Date: ${format(new Date(), 'PPp')}`, 20, 60);

        doc.setFontSize(16);
        doc.text(`Diagnosis:`, 20, 80);
        doc.setFontSize(12);
        doc.text(diagnosis, 20, 90, { maxWidth: 170 });

        doc.setFontSize(16);
        doc.text(`Prescribed Medicines:`, 20, 110);
        doc.setFontSize(12);
        doc.text(aiPrescription, 20, 120, { maxWidth: 170 });

        doc.save(`${selectedPatient.name}_Prescription.pdf`);

        // Update Backend
        try {
            await createPrescription({
                patientId: selectedPatient._id,
                appointmentId: selectedPatient.appointmentId,
                diagnosis,
                medicines: [{ name: 'See PDF', dosage: 'See PDF', duration: 'See PDF' }], // In real app, parse the AI text to objects
                notes: aiPrescription,
                pdfUrl: 'local-downloaded' // In real app, upload Blob to Cloudinary and get URL
            });
            await updateStatus({ id: selectedPatient.appointmentId, status: 'Completed' });
            alert('Prescription Saved and Appointment Completed!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                        <Stethoscope className="w-6 h-6" />
                        Doctor Panel
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appointments' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        <Calendar className="w-5 h-5" />
                        Appointments Queue
                    </button>
                    <button
                        onClick={() => setActiveTab('symptom-checker')}
                        disabled={!selectedPatient}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${!selectedPatient ? 'opacity-50 cursor-not-allowed' : activeTab === 'symptom-checker' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        <Stethoscope className="w-5 h-5" />
                        AI Symptom Checker
                    </button>
                    <button
                        onClick={() => setActiveTab('prescription')}
                        disabled={!selectedPatient}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${!selectedPatient ? 'opacity-50 cursor-not-allowed' : activeTab === 'prescription' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        <Pill className="w-5 h-5" />
                        AI Prescription
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {activeTab === 'appointments' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Today's Appointments</h3>
                            <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-500 border border-gray-100 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-500" />
                                {format(new Date(), 'EEEE, MMMM do')}
                            </div>
                        </div>

                        {appsLoading ? (
                            <div className="grid gap-4"><div className="h-24 bg-gray-200 animate-pulse rounded-2xl"></div></div>
                        ) : appointments?.length === 0 ? (
                            <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                                <p className="text-gray-500">No appointments scheduled for today.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {appointments?.map((app: { _id: string; patient?: { _id: string; name: string }; appointmentDate: string; reasonForVisit: string; status: string }) => (
                                    <div key={app._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow group">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{app.patient?.name || 'Unknown Patient'}</h4>
                                            <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                                                <Clock className="w-4 h-4" />
                                                {format(new Date(app.appointmentDate), 'p')} • {app.reasonForVisit}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {app.status}
                                            </span>
                                            {app.status !== 'Completed' && (
                                                <button
                                                    onClick={() => handlePatientSelect(app.patient, app)}
                                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md active:transform active:scale-95"
                                                >
                                                    Examine Patient
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'symptom-checker' && selectedPatient && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                                    {selectedPatient.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Examining: {selectedPatient.name}</h3>
                                    <p className="text-gray-500 text-sm">Age: 30 • Gender: Male</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Patient Symptoms</label>
                                <textarea
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-none"
                                    placeholder="Enter physical symptoms observed..."
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                />
                                <button
                                    onClick={handleAnalyze}
                                    disabled={analyzing || !symptoms}
                                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {analyzing ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <><Stethoscope className="w-5 h-5" /> Ask AI For Diagnosis</>
                                    )}
                                </button>
                            </div>

                            {aiAnalysis && (
                                <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
                                    <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                        AI Differential Diagnosis
                                    </h4>
                                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-indigo-200">
                                        {aiAnalysis}
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('prescription')}
                                        className="mt-6 px-6 py-2.5 bg-white border border-indigo-200 text-indigo-700 rounded-xl font-medium hover:bg-indigo-50 transition-colors shadow-sm"
                                    >
                                        Proceed to Prescription →
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'prescription' && selectedPatient && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Create Prescription</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmed Diagnosis</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="E.g., Acute Viral Pharyngitis"
                                        value={diagnosis}
                                        onChange={(e) => setDiagnosis(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handleSuggestPrescription}
                                    disabled={suggesting || !diagnosis}
                                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {suggesting ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <><Pill className="w-5 h-5" /> Auto-Suggest Medicines with AI</>
                                    )}
                                </button>

                                {aiPrescription && (
                                    <div className="pt-6 border-t border-gray-100">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Prescription Notes (Editable)</label>
                                        <textarea
                                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[150px] resize-none"
                                            value={aiPrescription}
                                            onChange={(e) => setAiPrescription(e.target.value)}
                                        />

                                        <button
                                            onClick={generatePdf}
                                            className="mt-6 w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <FileText className="w-5 h-5" /> Ensure & Generate PDF
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
