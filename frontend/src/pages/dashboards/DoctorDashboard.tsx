import { useState } from 'react';
import { useGetAppointmentsQuery, useUpdateAppointmentStatusMutation } from '../../store/api/appointmentApiSlice';
import { useGetPrescriptionsQuery, useCreatePrescriptionMutation } from '../../store/api/prescriptionApiSlice';
import { useGetMySubscriptionQuery } from '../../store/api/subscriptionApiSlice';
import { useAnalyzeSymptomsMutation, useSuggestPrescriptionMutation } from '../../store/api/aiApiSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import { format } from 'date-fns';
import {
    Calendar,
    Stethoscope,
    Pill,
    FileText,
    CheckCircle,
    Lock,
    ChevronRight,
    Loader2,
    Activity
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const DoctorDashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [activeTab, setActiveTab] = useState('appointments');
    const [selectedPatient, setSelectedPatient] = useState<{ _id: string; appointmentId: string; name: string; patientId: string } | null>(null);

    // RTK Queries & Mutations
    const { data: appointments, isLoading: appsLoading } = useGetAppointmentsQuery({});
    const [updateStatus] = useUpdateAppointmentStatusMutation();
    const [analyzeSymptoms, { isLoading: analyzing }] = useAnalyzeSymptomsMutation();
    const [suggestPrescription, { isLoading: suggesting }] = useSuggestPrescriptionMutation();
    const [createPrescription] = useCreatePrescriptionMutation();
    const { data: subscription } = useGetMySubscriptionQuery({});
    const isPro = subscription?.planTier === 'Pro';

    const { data: patientAppointments } = useGetAppointmentsQuery(
        selectedPatient?.patientId ? { patientId: selectedPatient.patientId } : skipToken,
        { skip: !selectedPatient?.patientId }
    );

    const { data: patientPrescriptions } = useGetPrescriptionsQuery(
        selectedPatient?.patientId ? { patientId: selectedPatient.patientId } : skipToken,
        { skip: !selectedPatient?.patientId }
    );

    const timelineItems = [
        ...(patientAppointments || []).map((a: any) => ({ ...a, type: 'appointment' })),
        ...(patientPrescriptions || []).map((p: any) => ({ ...p, type: 'prescription' }))
    ].sort((a, b) => new Date(b.createdAt || b.appointmentDate).getTime() - new Date(a.createdAt || a.appointmentDate).getTime());

    // AI Form States
    const [symptoms, setSymptoms] = useState('');
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [aiPrescription, setAiPrescription] = useState('');

    const handlePatientSelect = (apt: any) => {
        if (!apt.patient) return;
        setSelectedPatient({
            _id: apt.patient._id,
            name: apt.patient.name,
            appointmentId: apt._id,
            patientId: apt.patient._id
        });
        // Clear previous patient's AI states
        setSymptoms('');
        setAiAnalysis('');
        setDiagnosis('');
        setAiPrescription('');
        setActiveTab('symptom-checker');
    };

    const handleAnalyze = async () => {
        if (!symptoms || !selectedPatient) return;
        try {
            const res = await analyzeSymptoms({
                symptoms,
                patientAge: 30,
                patientGender: 'Male'
            }).unwrap();
            setAiAnalysis(res.analysis);
            if (res.riskLevel === 'High') {
                alert('⚠️ HIGH RISK DETECTED: ' + res.advice);
            }
        } catch (error) {
            console.error('Failed to analyze', error);
        }
    };

    const handleSuggestPrescription = async () => {
        if (!diagnosis || !selectedPatient) return;
        try {
            const res = await suggestPrescription({
                diagnosis,
                patientAge: 30,
                patientGender: 'Male'
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

        try {
            await createPrescription({
                patientId: selectedPatient._id,
                appointmentId: selectedPatient.appointmentId,
                diagnosis,
                medicines: [{ name: 'See PDF', dosage: 'See PDF', duration: 'See PDF' }],
                notes: aiPrescription,
                pdfUrl: 'local-downloaded'
            });
            await updateStatus({ id: selectedPatient.appointmentId, status: 'Completed' });
            alert('Prescription Saved and Appointment Completed!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-1 text-slate-900 flex flex-col h-full space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Medical Center</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Manage patients and run AI-assisted diagnostics</p>
                </div>
                <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1.5 border border-slate-200/50 shadow-inner">
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={`px-6 py-2.5 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest ${activeTab === 'appointments' ? 'bg-white text-emerald-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Patient Queue
                    </button>
                    <button
                        onClick={() => setActiveTab('symptom-checker')}
                        disabled={!selectedPatient || !isPro}
                        className={`px-6 py-2.5 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest relative ${(!selectedPatient || !isPro) ? 'opacity-30 cursor-not-allowed' : activeTab === 'symptom-checker' ? 'bg-white text-emerald-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Diagnose
                        {!isPro && <Lock className="w-3 h-3 absolute -top-1 -right-1 text-slate-400" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('prescription')}
                        disabled={!selectedPatient || !isPro}
                        className={`px-6 py-2.5 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest relative ${(!selectedPatient || !isPro) ? 'opacity-30 cursor-not-allowed' : activeTab === 'prescription' ? 'bg-white text-emerald-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Prescribe
                        {!isPro && <Lock className="w-3 h-3 absolute -top-1 -right-1 text-slate-400" />}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pb-10">
                {activeTab === 'appointments' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-wider flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-emerald-500" />
                                Today's Schedule
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                                    <p className="text-xs font-bold text-slate-700">{format(new Date(), 'MMM do, yyyy')}</p>
                                </div>
                            </div>
                        </div>

                        {appsLoading ? (
                            <div className="flex flex-col items-center justify-center py-32 gap-4">
                                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                                <p className="text-slate-400 font-black text-[11px] uppercase tracking-widest animate-pulse">Synchronizing Patient Data...</p>
                            </div>
                        ) : appointments?.length === 0 ? (
                            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                                <CheckCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No Appointments Today</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Appointment Time</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Visit Reason</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 text-sm">
                                        {appointments?.map((apt: any) => (
                                            <tr
                                                key={apt._id}
                                                className={`group hover:bg-emerald-50/30 transition-all cursor-pointer ${selectedPatient?.appointmentId === apt._id ? 'bg-emerald-50/50' : ''}`}
                                                onClick={() => handlePatientSelect(apt)}
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-sm transition-all ${selectedPatient?.appointmentId === apt._id ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-emerald-500'}`}>
                                                            {apt.patient?.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{apt.patient?.name}</h4>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Verified Patient</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg text-xs group-hover:bg-white transition-colors">
                                                        {format(new Date(apt.appointmentDate), 'hh:mm a')}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-slate-500 font-medium truncate max-w-[200px]">{apt.reasonForVisit}</p>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedPatient?.appointmentId === apt._id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-white hover:bg-emerald-500'}`}>
                                                        Start Session
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {(activeTab === 'symptom-checker' || activeTab === 'prescription') && selectedPatient && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Clinical Timeline Column */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                                    <Activity className="w-24 h-24 text-slate-900" />
                                </div>
                                <h3 className="text-base font-black text-slate-800 mb-8 flex items-center gap-3 uppercase tracking-wider">
                                    <FileText className="w-4.5 h-4.5 text-emerald-500" />
                                    Medical History
                                </h3>

                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Selected Patient</p>
                                    <h4 className="font-extrabold text-slate-900 text-xl tracking-tight">{selectedPatient.name}</h4>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-full border border-emerald-100 uppercase">Pro Access Active</span>
                                        <span className="px-3 py-1 bg-white text-slate-500 text-[9px] font-black rounded-full border border-slate-200 uppercase tracking-tighter">Patient-ID: {selectedPatient.patientId.slice(-4).toUpperCase()}</span>
                                    </div>
                                </div>

                                <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                                    {timelineItems.length === 0 ? (
                                        <p className="text-xs text-slate-400 italic">No historical records found for this user.</p>
                                    ) : (
                                        timelineItems.slice(0, 5).map((item: any, idx: number) => (
                                            <div key={idx} className="relative group/item">
                                                <div className={`absolute -left-[1.62rem] top-1.5 w-2 h-2 rounded-full ring-4 transition-transform group-hover/item:scale-150 ${item.type === 'prescription' ? 'bg-emerald-500 ring-emerald-50' : 'bg-slate-300 ring-slate-50'}`}></div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                                    {format(new Date(item.createdAt || item.appointmentDate), 'MMM d, yyyy')} • {item.type}
                                                </p>
                                                <h4 className="text-sm font-bold text-slate-800 group-hover/item:text-emerald-600 transition-colors leading-snug">
                                                    {item.diagnosis || item.reasonForVisit}
                                                </h4>
                                                {item.medicines && <p className="text-[9px] text-emerald-600 font-black mt-2 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 w-fit">PRX ISSUED</p>}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Functional Column */}
                        <div className="lg:col-span-8 space-y-8">
                            {activeTab === 'symptom-checker' && (
                                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm min-h-[500px] flex flex-col">
                                    <div className="mb-10 flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Diagnostic Core</h3>
                                            <p className="text-slate-500 font-bold italic mt-1">Smart medical differential analysis engine</p>
                                        </div>
                                        <Sparkles className="w-8 h-8 text-emerald-500 opacity-20" />
                                    </div>

                                    <div className="space-y-8 flex-1">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                                Clinical Observations
                                                <div className="h-0.5 w-12 bg-slate-100"></div>
                                            </label>
                                            <textarea
                                                className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all min-h-[180px] resize-none font-bold text-slate-900 placeholder:text-slate-300 placeholder:italic leading-relaxed shadow-inner"
                                                placeholder="Enter detailed symptoms, patient history notes, or clinical signs observed during the visit..."
                                                value={symptoms}
                                                onChange={(e) => setSymptoms(e.target.value)}
                                            />
                                        </div>

                                        <button
                                            onClick={handleAnalyze}
                                            disabled={analyzing || !symptoms}
                                            className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-500 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-30 disabled:hover:bg-slate-900 flex items-center justify-center gap-4 group"
                                        >
                                            {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Stethoscope className="w-5 h-5 group-hover:animate-pulse" />}
                                            Process Differential Diagnosis
                                        </button>

                                        {aiAnalysis && (
                                            <div className="mt-12 p-10 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                                    <Cpu className="w-32 h-32 text-white" />
                                                </div>
                                                <header className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-white">
                                                    <h4 className="font-black text-xs uppercase tracking-[0.25em] flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                        Grok AI Output
                                                    </h4>
                                                    <span className="text-[9px] font-black text-white/40 tracking-widest">v2.4 BETA</span>
                                                </header>
                                                <div className="text-emerald-50/90 text-sm leading-[1.8] whitespace-pre-wrap font-bold selection:bg-emerald-500 selection:text-white">
                                                    {aiAnalysis}
                                                </div>
                                                <div className="mt-10 pt-8 border-t border-white/10">
                                                    <button
                                                        onClick={() => setActiveTab('prescription')}
                                                        className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-3 shadow-lg shadow-emerald-500/20"
                                                    >
                                                        Proceed to Prescription <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'prescription' && (
                                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm min-h-[500px] flex flex-col">
                                    <div className="mb-10 flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Prescription Terminal</h3>
                                            <p className="text-slate-500 font-bold italic mt-1">Generate authenticated digital prescriptions</p>
                                        </div>
                                        <Pill className="w-8 h-8 text-emerald-500 opacity-20" />
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Confirmed Clinical Diagnosis</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-black text-slate-900 placeholder:text-slate-300 shadow-inner pr-12"
                                                    placeholder="E.g., Acute Rhinosinusitis"
                                                    value={diagnosis}
                                                    onChange={(e) => setDiagnosis(e.target.value)}
                                                />
                                                <CheckCircle className={`w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 transition-all ${diagnosis ? 'text-emerald-500 scale-100' : 'text-slate-200 scale-0'}`} />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSuggestPrescription}
                                            disabled={suggesting || !diagnosis}
                                            className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-500 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-30 flex items-center justify-center gap-4 group"
                                        >
                                            {suggesting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Pill className="w-5 h-5" />}
                                            Suggest Therapeutic Regimen
                                        </button>

                                        {aiPrescription && (
                                            <div className="mt-10 p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 shadow-sm animate-in slide-in-from-top-6 duration-700">
                                                <h4 className="font-black text-xs text-emerald-800 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                                    Suggested Medication Regimen
                                                </h4>
                                                <textarea
                                                    className="w-full p-8 bg-white border border-emerald-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all min-h-[220px] resize-none font-bold text-slate-900 leading-[1.8] shadow-sm"
                                                    value={aiPrescription}
                                                    onChange={(e) => setAiPrescription(e.target.value)}
                                                />
                                                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                                    <button
                                                        onClick={generatePdf}
                                                        className="flex-1 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-4 group"
                                                    >
                                                        <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" /> Sign & Issue Prescription
                                                    </button>
                                                    <button
                                                        onClick={() => setAiPrescription('')}
                                                        className="px-8 py-5 bg-white text-slate-500 border border-slate-200 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Placeholder icons
const Sparkles = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>;
const Cpu = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>;

export default DoctorDashboard;
