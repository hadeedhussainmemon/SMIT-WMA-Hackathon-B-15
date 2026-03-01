import { useState } from 'react';
import { useGetAppointmentsQuery, useCreateAppointmentMutation } from '../../store/api/appointmentApiSlice';
import { useGetPrescriptionsQuery } from '../../store/api/prescriptionApiSlice';
import { useExplainPrescriptionMutation } from '../../store/api/aiApiSlice';
import { useGetDoctorsQuery } from '../../store/api/userApiSlice';
import { format, addDays, setHours, setMinutes, isSameDay } from 'date-fns';
import {
    Calendar,
    Download,
    Pill,
    Sparkles,
    X,
    Brain,
    Loader2,
    Stethoscope,
    ChevronRight,
    User,
    Clock,
    CheckCircle2
} from 'lucide-react';

const PatientDashboard = () => {
    const { data: appointments, isLoading: appsLoading } = useGetAppointmentsQuery({});
    const { data: prescriptions, isLoading: pxLoading } = useGetPrescriptionsQuery({});
    const { data: doctors } = useGetDoctorsQuery({});
    const [createAppointment, { isLoading: booking }] = useCreateAppointmentMutation();
    const [explainPrescription, { isLoading: explaining }] = useExplainPrescriptionMutation();

    // Modal & Step State
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // AI Explanation State
    const [showAiModal, setShowAiModal] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [selectedPx, setSelectedPx] = useState<any>(null);

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const handleExplain = async (px: any) => {
        setSelectedPx(px);
        setShowAiModal(true);
        setExplanation('');
        try {
            const res = await explainPrescription({
                medicines: px.medicines,
                diagnosis: px.diagnosis
            }).unwrap();
            setExplanation(res.explanation);
        } catch (error) {
            console.error(error);
            setExplanation('Sorry, I failed to explain this prescription.');
        }
    };

    const handleBookAppointment = async () => {
        if (!selectedDoctor || !selectedTime) return;

        // Combine date and time
        const [time, modifier] = selectedTime.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        const appointmentDate = setMinutes(setHours(selectedDate, hours), minutes);

        try {
            await createAppointment({
                doctorId: selectedDoctor._id,
                appointmentDate: appointmentDate.toISOString(),
                reasonForVisit: 'General Checkup'
            }).unwrap();
            setBookingSuccess(true);
            setBookingStep(4);
        } catch (error) {
            console.error('Booking failed', error);
        }
    };

    const resetBooking = () => {
        setIsBookingModalOpen(false);
        setBookingStep(1);
        setSelectedDoctor(null);
        setSelectedTime('');
        setBookingSuccess(false);
    };

    return (
        <div className="text-gray-900 font-sans p-2 animate-in fade-in duration-700 max-w-7xl mx-auto">
            <div className="space-y-10">
                {/* Header Section */}
                <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-4 block">Patient Portal v2.0</span>
                            <h1 className="text-5xl font-black tracking-tight leading-tight">Welcome to <span className="text-emerald-400">CuraAI</span></h1>
                            <p className="text-slate-400 mt-4 text-lg font-bold italic max-w-xl">Experience the future of healthcare with neural-assisted diagnostics and seamless scheduling.</p>
                        </div>
                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 flex items-center gap-4 transition-all hover:scale-105 active:scale-95 group/btn"
                        >
                            <Calendar className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                            Book Appointment
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Appointments Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-xl font-black flex items-center gap-3 mb-6 text-slate-800 uppercase tracking-widest px-2">
                                <Clock className="w-5 h-5 text-emerald-500" />
                                Upcoming Visits
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {appsLoading ? (
                                    [1, 2].map(i => <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-[2.5rem]"></div>)
                                ) : (
                                    appointments?.map((app: any) => (
                                        <div key={app._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="bg-slate-50 p-4 rounded-2xl">
                                                    <Calendar className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                                </div>
                                                <span className={`px-4 py-1.5 text-[9px] font-black rounded-full uppercase tracking-widest ${app.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                            <h4 className="font-black text-slate-900 text-lg">{format(new Date(app.appointmentDate), 'EEEE, MMM do')}</h4>
                                            <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5" /> {format(new Date(app.appointmentDate), 'p')}
                                            </p>
                                            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-3">
                                                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-black text-[10px]">
                                                    Dr
                                                </div>
                                                <p className="text-[11px] font-black text-slate-600 uppercase">Dr. {app.doctor?.name}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {appointments?.length === 0 && (
                                    <div className="col-span-full py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 text-center">
                                        <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No Scheduled Visits</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Prescriptions Section */}
                        <section>
                            <h2 className="text-xl font-black flex items-center gap-3 mb-6 text-slate-800 uppercase tracking-widest px-2">
                                <Pill className="w-5 h-5 text-emerald-500" />
                                Clinical Prescriptions
                            </h2>
                            <div className="space-y-4">
                                {pxLoading ? (
                                    <div className="h-20 bg-slate-100 animate-pulse rounded-3xl"></div>
                                ) : (
                                    prescriptions?.map((px: any) => (
                                        <div key={px._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                                                    <Pill className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-slate-900 text-lg leading-none">{px.diagnosis}</h4>
                                                    <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-[0.2em]">
                                                        Verified by Dr. {px.doctor?.name} • {format(new Date(px.createdAt), 'MMM do')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleExplain(px)}
                                                    className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-emerald-500 transition-all shadow-lg active:scale-95 flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"
                                                >
                                                    <Brain className="w-4 h-4" />
                                                    Explain Insights
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {prescriptions?.length === 0 && (
                                    <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No Records Found</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: AI Health Node */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden h-full">
                            <Brain className="w-20 h-20 absolute -bottom-4 -right-4 opacity-10 rotate-12" />
                            <h3 className="text-2xl font-black uppercase tracking-widest mb-6">Neural Status</h3>
                            <div className="space-y-6 relative z-10">
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Sync Profile</p>
                                    <p className="text-xl font-bold italic">Healthy & Verified</p>
                                </div>
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Health Quotient</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-5xl font-black">94</p>
                                        <p className="text-sm font-bold opacity-60">OPTIMAL</p>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <p className="text-xs font-bold leading-relaxed opacity-80">
                                        "Integrate daily neuro-cognitive exercises for improved focus."
                                    </p>
                                    <p className="text-[9px] font-black uppercase mt-3 tracking-widest text-emerald-200">— AI Wellness Tip</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* APPOINTMENT BOOKING MODAL */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-500">
                    <div className="bg-white rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-white flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-slate-50 p-10 flex justify-between items-center border-b border-slate-100">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight text-slate-900">Clinical Booking</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    {[1, 2, 3].map(s => (
                                        <div key={s} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${bookingStep >= s ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                    ))}
                                </div>
                            </div>
                            <button onClick={resetBooking} className="p-3 bg-white hover:bg-slate-100 rounded-2xl transition-all shadow-sm border border-slate-100"><X /></button>
                        </div>

                        <div className="p-10 overflow-y-auto flex-1">
                            {/* Step 1: Doctor Selection */}
                            {bookingStep === 1 && (
                                <div className="space-y-8 animate-in slide-in-from-right-10">
                                    <p className="font-black text-xs text-slate-400 uppercase tracking-widest">Select Your Physician</p>
                                    <div className="grid grid-cols-1 gap-4">
                                        {doctors?.map((doc: any) => (
                                            <button
                                                key={doc._id}
                                                onClick={() => { setSelectedDoctor(doc); setBookingStep(2); }}
                                                className="group p-6 rounded-[2.5rem] border border-slate-100 bg-white hover:border-emerald-500 hover:ring-4 hover:ring-emerald-500/5 transition-all flex items-center gap-6 text-left shadow-sm"
                                            >
                                                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                                                    <User className="w-8 h-8" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-black text-slate-900 text-lg leading-none">Dr. {doc.name}</h4>
                                                    <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-widest">General Clinical Consultant</p>
                                                </div>
                                                <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Date & Time */}
                            {bookingStep === 2 && (
                                <div className="space-y-10 animate-in slide-in-from-right-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <button onClick={() => setBookingStep(1)} className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">← Back to Doctors</button>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="font-black text-xs text-slate-400 uppercase tracking-widest">Clinical Availability</p>
                                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                            {[0, 1, 2, 3, 4, 5, 6].map(offset => {
                                                const d = addDays(new Date(), offset);
                                                const isSelected = isSameDay(d, selectedDate);
                                                return (
                                                    <button
                                                        key={offset}
                                                        onClick={() => setSelectedDate(d)}
                                                        className={`min-w-[100px] p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-2 ${isSelected ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                                    >
                                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{format(d, 'EEE')}</span>
                                                        <span className="text-2xl font-black">{format(d, 'dd')}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="font-black text-xs text-slate-400 uppercase tracking-widest">Select High-Precision Slot</p>
                                        <div className="grid grid-cols-3 gap-4">
                                            {timeSlots.map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-5 rounded-2xl border font-black text-xs transition-all ${selectedTime === time ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white border-slate-100 text-slate-600 hover:border-emerald-200'}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        disabled={!selectedTime}
                                        onClick={handleBookAppointment}
                                        className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-sm tracking-[0.3em] shadow-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-4"
                                    >
                                        {booking ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Synchronize Appointment'}
                                    </button>
                                </div>
                            )}

                            {/* Step 3: Success */}
                            {bookingStep === 4 && (
                                <div className="text-center py-10 space-y-8 animate-in zoom-in-95 duration-500">
                                    <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-2xl shadow-emerald-500/40">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900">Synchronized!</h3>
                                        <p className="text-slate-500 font-bold mt-2">Your visit with Dr. {selectedDoctor?.name} is confirmed for {format(selectedDate, 'MMM do')} at {selectedTime}.</p>
                                    </div>
                                    <button
                                        onClick={resetBooking}
                                        className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-emerald-500 transition-all shadow-xl"
                                    >
                                        Return to Portal
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* AI Modal (Existing Logic) */}
            {showAiModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-white flex flex-col max-h-[90vh]">
                        <div className="bg-slate-900 p-10 text-white flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center">
                                    <Brain className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">CuraAI Intelligence</p>
                                    <h3 className="text-2xl font-black capitalize leading-none">{selectedPx?.diagnosis}</h3>
                                </div>
                            </div>
                            <button onClick={() => setShowAiModal(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><X /></button>
                        </div>
                        <div className="p-10 overflow-y-auto flex-1">
                            {explaining ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                                    <p className="text-slate-500 font-black italic uppercase tracking-widest text-[10px]">Decoding Medical DNA...</p>
                                </div>
                            ) : (
                                <div className="animate-in slide-in-from-bottom-4 space-y-10">
                                    <div className="space-y-4">
                                        <h4 className="font-black text-emerald-600 uppercase tracking-widest text-[10px]">Simple Interpretation</h4>
                                        <div className="text-slate-700 leading-relaxed text-xl font-medium border-l-4 border-emerald-500 pl-8">
                                            {explanation}
                                        </div>
                                    </div>
                                    <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                                        <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-3 italic">Clinical Disclaimer</p>
                                        <p className="text-sm text-amber-600 font-bold leading-relaxed">Always consult Dr. {selectedPx?.doctor?.name} for definitive medical advice.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-10 pt-0">
                            <button onClick={() => setShowAiModal(false)} className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest">Close Translation</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;
