import { Link } from 'react-router-dom';
import { Stethoscope, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const About = () => {
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

            <div className="max-w-4xl mx-auto px-8 py-24 space-y-24">
                {/* Hero */}
                <div className="text-center space-y-8">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] animate-in fade-in slide-in-from-bottom-4 duration-700">Digital Clinical Evolution</p>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Bridging intelligence <br />
                        <span className="text-emerald-500 italic">& clinical care.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-bold italic leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        CuraAI was engineered to solve the disconnect between manual patient records and modern diagnostic speed. We build the infrastructure that empowers doctors.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                    <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <ShieldCheck className="text-emerald-500 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Impenetrable Privacy</h3>
                        <p className="text-slate-500 font-bold text-sm leading-relaxed italic">AES-256 encryption at rest and in transit. Your clinical data is treated with enterprise-level security protocols.</p>
                    </div>
                    <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Heart className="text-emerald-500 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Patient-First Logic</h3>
                        <p className="text-slate-500 font-bold text-sm leading-relaxed italic">Our neural engines are fine-tuned to reduce medical errors and improve diagnostic accuracy for every patient.</p>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-12 text-center border-t border-slate-100">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">Ready to evolve your practice?</h2>
                    <Link to="/signup" className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-500 transition-all shadow-xl active:scale-95">
                        Start Your Clinical Trial <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <footer className="py-12 border-t border-slate-50 bg-slate-50 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 CuraAI Systems | Next-Gen Medical OS</p>
            </footer>
        </div>
    );
};

export default About;
