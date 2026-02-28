import { useState } from 'react';
import {
    useGetPatientsQuery
} from '../../store/api/patientApiSlice';
import {
    UserPlus,
    Search,
    ChevronRight,
    Phone,
    Droplets,
    Loader2,
    Activity
} from 'lucide-react';

const ReceptionistPatients = () => {
    const { data: patients, isLoading } = useGetPatientsQuery({});
    const [searchTerm, setSearchTerm] = useState('');

    // Filter patients
    const filteredPatients = patients?.filter((p: any) =>
        p.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-1 text-slate-900 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pb-6 border-b border-slate-100">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Patient Registry</h2>
                    <p className="text-slate-500 font-bold italic mt-1">Search, manage, and register clinic patients</p>
                </div>
                <button
                    onClick={() => alert('Launching Secure Patient Onboarding...')}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-xl hover:scale-[1.02] active:scale-95 group"
                >
                    <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Register New Patient
                </button>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Filter by name, ID, or email..."
                        className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200/60 rounded-[2rem] shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    {filteredPatients?.length || 0} Records Found
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                    <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em]">Accessing Clinical Database...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                    {filteredPatients?.map((patient: any) => (
                        <div key={patient._id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                                <UserPlus className="w-24 h-24 text-slate-900" />
                            </div>

                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-2xl group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all shadow-inner border border-slate-200 group-hover:border-emerald-100">
                                    {patient.user?.name.charAt(0)}
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-black text-[9px] rounded-full border border-emerald-100 uppercase tracking-tighter">Active</span>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight">{patient.user?.name}</h3>
                                <p className="text-xs text-slate-500 font-bold italic mt-1">{patient.user?.email}</p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4 relative z-10">
                                <div className="flex items-center gap-4 text-xs font-black text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                                    </div>
                                    {patient.phoneNumber}
                                </div>
                                <div className="flex items-center gap-4 text-xs font-black text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                                        <Droplets className="w-3.5 h-3.5 text-rose-500" />
                                    </div>
                                    <span className="uppercase tracking-widest">Type:</span> {patient.bloodGroup || 'Not set'}
                                </div>
                            </div>

                            <button
                                onClick={() => alert('Opening Patient Health Timeline journey...')}
                                className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01] active:scale-95"
                            >
                                Analysis Timeline <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReceptionistPatients;
