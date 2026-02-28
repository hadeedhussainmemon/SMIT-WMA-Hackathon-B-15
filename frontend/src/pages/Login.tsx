import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { Stethoscope, Activity, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading, error }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = await login({ email, password }).unwrap();
            dispatch(setCredentials({ user: userData, token: 'cookie-based' }));
            navigate('/dashboard');
        } catch (err) {
            console.error('Failed to log in', err);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-blue-200">
            {/* Left Panel - Branding/Marketing */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Stethoscope className="text-white w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">Cura<span className="text-blue-400">AI</span></span>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                        The future of<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            clinic management
                        </span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed mb-10">
                        Empowering healthcare professionals with next-generation AI symptom analysis, seamless scheduling, and automated digital prescriptions.
                    </p>

                    <div className="flex flex-col gap-4 mt-8 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                <Activity className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="font-medium text-sm">Grok AI Integration</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="font-medium text-sm">Enterprise-grade RBAC</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-slate-500 font-medium">
                    © 2026 CuraAI Systems. All rights reserved.
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
                        <p className="text-slate-500 font-medium">Enter your credentials to access your portal</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            Authentication failed. Please check your credentials.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                        <div className="space-y-4">
                            <div className="space-y-1.5 relative group">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Work Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400 text-slate-900"
                                        placeholder="doctor@clinic.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 relative group">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold text-slate-700">Password</label>
                                    <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline">Forgot?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400 text-slate-900 shadow-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 text-white bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/10 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Sign In <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-slate-500 font-medium text-sm">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
