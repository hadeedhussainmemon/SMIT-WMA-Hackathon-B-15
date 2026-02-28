import { Link } from 'react-router-dom';
import { Stethoscope, SearchX, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 flex flex-col">
            {/* Minimal Logo */}
            <div className="h-24 px-8 flex items-center">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/10">
                        <Stethoscope className="text-emerald-400 w-5 h-5" />
                    </div>
                    <span className="text-xl font-black tracking-tighter italic text-slate-900">Cura<span className="text-emerald-500">AI</span></span>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-xl w-full text-center space-y-12">
                    {/* Visual Element */}
                    <div className="relative mx-auto w-48 h-48 flex items-center justify-center">
                        <div className="absolute inset-0 bg-emerald-50 rounded-full animate-pulse border border-emerald-100"></div>
                        <div className="absolute inset-8 bg-emerald-100/50 rounded-full blur-xl"></div>
                        <SearchX className="relative z-10 w-20 h-20 text-emerald-500" />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">System Diagnostic: 404</p>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
                            Fragment <br />
                            <span className="text-emerald-500 italic">not found.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-bold italic leading-relaxed max-w-sm mx-auto opacity-80">
                            The clinical node you are attempting to access does not exist in our neural archive.
                        </p>
                    </div>

                    {/* Action */}
                    <div className="pt-8">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Synchronize to Home
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="py-12 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Node Resolution Failure | Health Ops Cluster 4</p>
            </footer>
        </div>
    );
};

export default NotFound;
