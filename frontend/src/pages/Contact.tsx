import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Stethoscope, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-emerald-100">
            {/* Minimal Sub-Navbar */}
            <div className="h-24 px-8 flex items-center justify-between border-b border-slate-100/60 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                        <Stethoscope className="text-emerald-400 w-5 h-5" />
                    </div>
                    <span className="text-xl font-black tracking-tighter italic text-slate-900">Cura<span className="text-emerald-500">AI</span></span>
                </Link>
                <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors">Return Home</Link>
            </div>

            <div className="max-w-6xl mx-auto px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Side: Text */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Global Support Infrastructure</p>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                                How can we <br />
                                <span className="text-emerald-500 italic">assist you?</span>
                            </h1>
                            <p className="text-xl text-slate-500 font-bold italic leading-relaxed">
                                Our clinical success teams are available around the clock to support your hospital integration or patient inquiries.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 group cursor-pointer hover:border-emerald-200 transition-all">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-900 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Command</p>
                                    <p className="font-black text-slate-900 text-sm">ops@curaai.com</p>
                                </div>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 group cursor-pointer hover:border-emerald-200 transition-all">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-900 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direct Line</p>
                                    <p className="font-black text-slate-900 text-sm">+1 (800) CURA-AI</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Card */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full"></div>
                        <div className="relative bg-slate-900 p-12 rounded-[3rem] shadow-2xl border border-white/5 space-y-10">
                            <div className="space-y-2">
                                <h3 className="text-white font-black text-2xl tracking-tight">Direct Support Node</h3>
                                <p className="text-slate-500 font-bold italic text-sm">Initiate a secure clinical ticket for priority assistance.</p>
                            </div>

                            <form className="space-y-6">
                                <div className="space-y-4">
                                    <input type="text" placeholder="Identity Name" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-slate-600 focus:bg-white/10 focus:border-emerald-500 transition-all outline-none" />
                                    <input type="email" placeholder="Work Email" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-slate-600 focus:bg-white/10 focus:border-emerald-500 transition-all outline-none" />
                                    <textarea placeholder="Clinical Query or Request Details..." rows={4} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-slate-600 focus:bg-white/10 focus:border-emerald-500 transition-all outline-none resize-none"></textarea>
                                </div>
                                <button className="w-full py-5 bg-emerald-500 text-slate-900 font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3">
                                    Broadcast Signal <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-12 border-t border-slate-50 bg-slate-50 text-center">
                <div className="flex items-center justify-center gap-6 mb-4 text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Palo Alto • Neural Health District</span>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 CuraAI Systems | Enterprise Support</p>
            </footer>
        </div>
    );
};

export default Contact;
