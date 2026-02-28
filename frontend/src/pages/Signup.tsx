import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { Stethoscope, User, ArrowRight, ShieldCheck, Mail, Lock, Building, Activity, Loader2 } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signup, { isLoading, error }] = useSignupMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = await signup({ name, email, password, role }).unwrap();
            dispatch(setCredentials({ user: userData, token: 'cookie-based' }));
            navigate('/dashboard');
        } catch (err) {
            console.error('Failed to sign up', err);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-emerald-100">
            {/* Left Panel - High Fidelity Branding */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 p-16 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-20%] w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                        <Stethoscope className="text-emerald-500 w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight italic">Cura<span className="text-emerald-400">AI</span></span>
                </div>

                <div className="relative z-10 max-w-xl">
                    <h1 className="text-6xl font-black text-white leading-tight tracking-tighter mb-8">
                        The new standard<br />
                        <span className="text-emerald-400">
                            in healthcare.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 font-bold leading-relaxed mb-12 italic">
                        Join the elite network of clinics digitizing their workflow with CuraAI. Experience unmatched efficiency and intelligent diagnostic support.
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-12">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-4">
                                <Activity className="w-5 h-5 text-emerald-400" />
                            </div>
                            <p className="text-white font-black text-xs uppercase tracking-widest mb-1">Grok Core</p>
                            <p className="text-slate-500 text-[10px] font-bold">Neural diagnostics engine</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                            <div className="w-10 h-10 rounded-xl bg-slate-500/20 flex items-center justify-center border border-slate-500/30 mb-4">
                                <ShieldCheck className="w-5 h-5 text-slate-400" />
                            </div>
                            <p className="text-white font-black text-xs uppercase tracking-widest mb-1">AES-256</p>
                            <p className="text-slate-500 text-[10px] font-bold">Encrypted health records</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>© 2026 CuraAI Systems</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Security</a>
                    </div>
                </div>
            </div>

            {/* Right Panel - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
                <div className="w-full max-w-md space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Join CuraAI</h2>
                        <p className="text-slate-500 font-bold italic">Create your secure clinical workspace</p>
                    </div>

                    {error && (
                        <div className="p-5 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 animate-shake">
                            <ShieldCheck className="w-4 h-4" />
                            Registration failed
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2 relative group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Work Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                                        placeholder="doctor@curaai.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Secure Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Clinical Role</label>
                                <div className="relative">
                                    <Building className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-900 appearance-none shadow-inner"
                                    >
                                        <option value="patient">Patient (Health Tracker)</option>
                                        <option value="doctor">Doctor (Medical Core)</option>
                                        <option value="receptionist">Receptionist (Clinic Admin)</option>
                                        <option value="admin">System Admin (Enterprise)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 text-white bg-slate-900 hover:bg-emerald-500 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl hover:shadow-emerald-500/20 disabled:opacity-30"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                            ) : (
                                <>Register Global Profile <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>

                        <div className="text-center pt-6">
                            <p className="text-slate-400 font-bold text-xs">
                                Already registered?{' '}
                                <Link to="/login" className="text-emerald-600 font-black hover:text-emerald-700 transition-all">
                                    Authenticate Access
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
