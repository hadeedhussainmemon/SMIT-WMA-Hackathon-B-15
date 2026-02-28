import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { Stethoscope, User, ArrowRight, ShieldCheck, Mail, Lock, Building } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Defaulting to patient for open signups as per usual SaaS flows
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
        <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-indigo-200">
            {/* Left Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-10 shadow-2xl">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="text-center lg:text-left space-y-2">
                        <Link to="/" className="inline-flex items-center gap-2 mb-8 lg:hidden">
                            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                                <Stethoscope className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-slate-900 tracking-tight">Cura<span className="text-indigo-500">AI</span></span>
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Account</h2>
                        <p className="text-slate-500 font-medium">Join CuraAI to streamline your healthcare journey</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            Failed to create account. Email might be in use.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 mt-8">

                        <div className="space-y-1.5 relative group">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400 text-slate-900"
                                    placeholder="Sarah Connor"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 relative group">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400 text-slate-900"
                                    placeholder="sarah@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 relative group">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400 text-slate-900 shadow-sm"
                                    placeholder="Create a strong password"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 relative group">
                            <label className="text-sm font-semibold text-slate-700 ml-1">I am a...</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Building className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium text-slate-900 appearance-none"
                                >
                                    <option value="patient">Patient (Looking for care)</option>
                                    <option value="doctor">Doctor (Medical Professional)</option>
                                    <option value="receptionist">Receptionist (Clinic Staff)</option>
                                    <option value="admin">Admin (Clinic Owner)</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Create Account <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-slate-500 font-medium text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-colors">
                                    Sign in instead
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Panel - Branding/Marketing (Flipped for Signup) */}
            <div className="hidden lg:flex w-1/2 bg-slate-50 p-12 flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-lg text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/10 mx-auto mb-8 border border-white">
                        <Stethoscope className="text-indigo-600 w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Join the Medical <br /><span className="text-indigo-600">AI Revolution</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-medium mb-12 px-4">
                        Whether you're a patient looking for smarter care, or a doctor wanting an AI co-pilot, CuraAI is built for you.
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center"><User className="w-5 h-5" /></div>
                            <h4 className="font-bold text-slate-900">For Patients</h4>
                            <p className="text-sm text-slate-500 font-medium">Access your digital prescriptions and book instantly.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center"><Stethoscope className="w-5 h-5" /></div>
                            <h4 className="font-bold text-slate-900">For Doctors</h4>
                            <p className="text-sm text-slate-500 font-medium">Leverage Grok AI to analyze symptoms and generate PDFs.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;
