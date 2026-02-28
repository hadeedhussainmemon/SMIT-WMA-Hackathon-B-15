import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Brain, ShieldCheck, Activity, Users } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-emerald-100">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/60 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                            <Stethoscope className="text-emerald-400 w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter italic">Cura<span className="text-emerald-500">AI</span></span>
                    </div>
                    <div className="hidden md:flex gap-10 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        <a href="#features" className="hover:text-emerald-600 transition-colors">Digital Capabilities</a>
                        <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">Neural Logic</a>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Authenticate</Link>
                        <Link to="/signup" className="px-8 py-3.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-500 transition-all shadow-xl hover:scale-105 active:scale-95">
                            Initialize Portal
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-48 pb-32 px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-12 border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                        Precision Clinical Intelligence
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        The elite OS for <br />
                        <span className="text-emerald-500 italic">
                            modern medicine.
                        </span>
                    </h1>
                    <p className="text-2xl text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed font-bold italic opacity-80 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        Digitizing the clinical workflow through neural symptom analysis, automated regimens, and secure digital handshakes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000">
                        <Link to="/signup" className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-3xl hover:bg-emerald-500 transition-all shadow-[0_20px_50px_-12px_rgba(16,185,129,0.3)] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95">
                            Deploy Now <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-12 py-6 bg-white text-slate-400 font-black text-xs uppercase tracking-[0.3em] rounded-3xl border border-slate-200 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center justify-center gap-4">
                            Portal Access
                        </Link>
                    </div>
                </div>
            </section>

            {/* Premium Mockup Section */}
            <section className="px-8 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-slate-900 rounded-[3rem] p-12 shadow-3xl relative border border-slate-800 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="flex gap-2.5 mb-10">
                            <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-12 relative z-10">
                            <div className="flex-1 bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-xl">
                                <h3 className="text-white font-black text-xs uppercase tracking-[0.25em] mb-8 flex items-center gap-4 text-emerald-400">
                                    <Brain className="w-5 h-5" /> Neural Analysis
                                </h3>
                                <div className="space-y-4">
                                    <div className="h-2.5 bg-white/10 rounded-full w-3/4 animate-pulse"></div>
                                    <div className="h-2.5 bg-white/10 rounded-full w-full"></div>
                                    <div className="h-2.5 bg-white/5 rounded-full w-5/6"></div>
                                    <div className="h-2.5 bg-emerald-500/20 rounded-full w-1/2 mt-8"></div>
                                </div>
                            </div>
                            <div className="w-full md:w-64 bg-emerald-500/10 rounded-[2.5rem] p-10 border border-emerald-500/20 flex flex-col items-center justify-center min-h-[240px]">
                                <Activity className="w-16 h-16 text-emerald-500 mb-6 animate-pulse" />
                                <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">+92% Precision</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                        <div className="max-w-2xl">
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">Functional Architecture</p>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Designed for speed, <br />built for doctors.</h2>
                        </div>
                        <p className="text-lg text-slate-400 font-bold italic max-w-sm">Every module is fine-tuned for high-traffic clinical environments.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-2xl hover:shadow-emerald-500/5 group">
                            <div className="w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Role Portals</h3>
                            <p className="text-slate-500 font-bold leading-relaxed italic">Unified infrastructure with specialized views for Surgeons, Nurses, and Patients.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-2xl hover:shadow-emerald-500/5 group">
                            <div className="w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Smart Logic</h3>
                            <p className="text-slate-500 font-bold leading-relaxed italic">The Grok engine provides real-time diagnostic support and automated pharmacology.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-2xl hover:shadow-emerald-500/5 group">
                            <div className="w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Secure Handover</h3>
                            <p className="text-slate-500 font-bold leading-relaxed italic">End-to-end encrypted PDF generation and digital record synchronization.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-24 px-8 border-t border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-3">
                            <Stethoscope className="w-8 h-8 text-emerald-500" />
                            <span className="text-2xl font-black tracking-tighter italic">Cura<span className="text-emerald-400">AI</span></span>
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Next-Generation Healthcare Systems</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">SMIT WMA Hackathon B-15</p>
                        <p className="text-[10px] font-bold text-slate-600 italic">Engineered for excellence in clinic management.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
