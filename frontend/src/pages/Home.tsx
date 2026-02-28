import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Brain, ShieldCheck, Activity, Users } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="CuraAI Logo" className="w-12 h-12 rounded-xl shadow-lg shadow-indigo-500/20" />
                        <span className="text-2xl font-black text-slate-900 tracking-tight">Cura<span className="text-indigo-500">AI</span></span>
                    </div>
                    <div className="hidden md:flex gap-8 font-medium text-slate-600">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="font-semibold text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
                        <Link to="/signup" className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all shadow-md active:scale-95">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-8 border border-indigo-100 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Powered by xAI Grok
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
                        The Operating System for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                            Modern Medical Clinics.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Say goodbye to paper records. CuraAI brings intelligent symptom analysis, automated digital prescriptions, and seamless appointment scheduling to your practice.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 text-lg active:scale-95">
                            Start Free Trial <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 text-lg">
                            Login to Portal
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Dashboard Preview mockup */}
            <section className="px-6 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-900 rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-2xl relative border border-slate-800">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                        <div className="flex gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-1 md:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Brain className="w-5 h-5 text-indigo-400" /> AI Symptom Analysis</h3>
                                <div className="space-y-3">
                                    <div className="h-4 bg-slate-700 rounded-full w-3/4"></div>
                                    <div className="h-4 bg-slate-700 rounded-full w-full"></div>
                                    <div className="h-4 bg-slate-700 rounded-full w-5/6"></div>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex flex-col items-center justify-center min-h-[160px]">
                                <Activity className="w-12 h-12 text-emerald-400 mb-2" />
                                <span className="text-slate-300 font-medium">+85% Efficiency</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 bg-white border-t border-slate-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything an autonomous clinic needs</h2>
                        <p className="text-lg text-slate-500">Built securely on modern cloud infrastructure, bridging the gap between doctors and patients.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Role-Based Access</h3>
                            <p className="text-slate-600 leading-relaxed">Dedicated portals for Admins, Receptionists, Doctors, and Patients. Pure privacy and correct tools at the right time.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Grok Smart Co-pilot</h3>
                            <p className="text-slate-600 leading-relaxed">Instant AI differential diagnoses and automated medication regimens based on live symptoms.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Digital PDF Prescriptions</h3>
                            <p className="text-slate-600 leading-relaxed">Instantly generate and hand-off securely signed PDFs. Patients can download their prescriptions directly from their own portal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="w-6 h-6 text-indigo-500" />
                        <span className="text-xl font-bold text-white tracking-tight">Cura<span className="text-indigo-500">AI</span></span>
                    </div>
                    <p className="text-sm">Engineered for the SMIT WMA Hackathon B-15</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
