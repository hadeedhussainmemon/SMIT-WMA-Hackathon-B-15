import { useState } from 'react';
import { useGetAppointmentsQuery } from '../../store/api/appointmentApiSlice';
import { useGetPrescriptionsQuery } from '../../store/api/prescriptionApiSlice';
import { useExplainPrescriptionMutation } from '../../store/api/aiApiSlice';
import { format } from 'date-fns';
import {
    Calendar,
    Download,
    Pill,
    Sparkles,
    X,
    Brain,
    Loader2,
    Stethoscope
} from 'lucide-react';

const PatientDashboard = () => {
    // Redux automatically filters these to only the logged-in patient's data because of our backend token Auth
    const { data: appointments, isLoading: appsLoading } = useGetAppointmentsQuery({});
    const { data: prescriptions, isLoading: pxLoading } = useGetPrescriptionsQuery({});
    const [explainPrescription, { isLoading: explaining }] = useExplainPrescriptionMutation();

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [selectedPx, setSelectedPx] = useState<any>(null);

    const handleExplain = async (px: any) => {
        setSelectedPx(px);
        setShowModal(true);
        setExplanation('');
        try {
            const res = await explainPrescription({
                medicines: px.medicines,
                diagnosis: px.diagnosis
            }).unwrap();
            setExplanation(res.explanation);
        } catch (error) {
            console.error(error);
            setExplanation('Sorry, I failed to explain this prescription. Please consult your doctor.');
        }
    };

    return (
        <div className="text-gray-900 font-sans p-2 animate-in fade-in duration-700">
            <div className="max-w-5xl space-y-8">
                <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">My Health Portal</h1>
                    <p className="text-slate-500 mt-2 font-bold italic">Secure access to your medical timeline and digital records</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Appointments Card */}
                    <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white flex flex-col h-full">
                        <h2 className="text-xl font-black flex items-center gap-3 mb-8 border-b border-indigo-50 pb-6 text-slate-900 uppercase tracking-widest">
                            <Calendar className="w-6 h-6 text-indigo-600" />
                            Appointments
                        </h2>

                        {appsLoading ? (
                            <div className="flex flex-col gap-4">
                                <div className="h-20 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                                <div className="h-20 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                            </div>
                        ) : (
                            <div className="space-y-4 flex-1">
                                {appointments?.map((app: any) => (
                                    <div key={app._id} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex justify-between items-center group hover:border-indigo-200 transition-all">
                                        <div>
                                            <p className="font-black text-slate-900">{format(new Date(app.appointmentDate), 'EEEE, MMM do yyyy')}</p>
                                            <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-tighter">{format(new Date(app.appointmentDate), 'p')} • {app.reasonForVisit}</p>
                                        </div>
                                        <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${app.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                ))}
                                {appointments?.length === 0 && (
                                    <div className="text-center py-12">
                                        <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold">No appointments found.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Prescriptions Card */}
                    <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white flex flex-col h-full">
                        <h2 className="text-xl font-black flex items-center gap-3 mb-8 border-b border-emerald-50 pb-6 text-slate-900 uppercase tracking-widest">
                            <Pill className="w-6 h-6 text-emerald-600" />
                            Digital Records
                        </h2>

                        {pxLoading ? (
                            <div className="flex flex-col gap-4">
                                <div className="h-20 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                                <div className="h-20 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                            </div>
                        ) : (
                            <div className="space-y-4 flex-1">
                                {prescriptions?.map((px: any) => (
                                    <div key={px._id} className="p-5 rounded-2xl border border-emerald-100 bg-white shadow-sm flex justify-between items-center group hover:border-emerald-300 transition-all">
                                        <div>
                                            <p className="font-black text-slate-900 capitalize text-lg leading-tight">{px.diagnosis}</p>
                                            <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-widest">
                                                Dr. {px.doctor?.name} • {format(new Date(px.createdAt), 'MMM do, yyyy')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleExplain(px)}
                                                className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all group/ai"
                                                title="Explain with AI"
                                            >
                                                <Sparkles className="w-5 h-5 group-hover/ai:animate-pulse" />
                                            </button>
                                            <button
                                                onClick={() => alert('Digital PDF download is initializing...')}
                                                className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shadow-sm border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all"
                                                title="Download PDF"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {prescriptions?.length === 0 && (
                                    <div className="text-center py-12">
                                        <Pill className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold">No digital records found.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* AI Explanation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <Brain className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mb-1">AI Assistant</p>
                                    <h3 className="text-2xl font-black capitalize leading-none">{selectedPx?.diagnosis}</h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 overflow-y-auto flex-1 space-y-8">
                            {explaining ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                                    <div className="relative">
                                        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
                                        <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <p className="text-slate-500 font-black italic">Decoding medical insights...</p>
                                </div>
                            ) : (
                                <div className="animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-8">
                                        <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                            <Stethoscope className="w-4 h-4 text-indigo-600" />
                                            Prescribed Medication
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedPx?.medicines?.map((m: any, idx: number) => (
                                                <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm ring-1 ring-slate-100">
                                                    <p className="font-bold text-slate-900">{m.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase mt-1">{m.dosage} • {m.duration}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-black text-indigo-600 uppercase tracking-widest text-[10px] flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Simple English Translation
                                        </h4>
                                        <div className="text-slate-700 leading-relaxed text-lg font-medium whitespace-pre-wrap pl-8 border-l-4 border-indigo-100">
                                            {explanation}
                                        </div>
                                    </div>

                                    <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                        <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            ⚠️ Medical Disclaimer
                                        </p>
                                        <p className="text-xs text-amber-600 font-bold leading-relaxed italic">
                                            This AI translation provides general information only. Never modify your treatment plan without talking to Dr. {selectedPx?.doctor?.name} first.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 pt-0">
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-4.5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95"
                            >
                                Close Translation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;
