import { useState } from 'react';
import { useAnalyzeReportMutation } from '../../store/api/aiApiSlice';
import {
    FileSearch,
    Zap,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Loader2,
    Sparkles,
    BrainCircuit,
    ClipboardCheck
} from 'lucide-react';

const NeuralLab = () => {
    const [reportText, setReportText] = useState('');
    const [analyzeReport, { isLoading }] = useAnalyzeReportMutation();
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!reportText.trim()) return;
        try {
            const res = await analyzeReport({ reportText }).unwrap();
            setResult(res);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col gap-10 p-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                    <BrainCircuit className="w-40 h-40 text-slate-900" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Neural Intelligence Lab</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Report Decoder</h1>
                    <p className="text-slate-500 text-xl font-bold italic max-w-2xl leading-relaxed">
                        Paste your clinical reports, lab results, or imaging summaries to receive a high-fidelity AI interpretation.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Input Section */}
                <div className="xl:col-span-5 flex flex-col gap-6">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <FileSearch className="w-4 h-4 text-emerald-500" />
                                Report Terminal
                            </h3>
                        </div>
                        <textarea
                            className="flex-1 w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300 placeholder:italic min-h-[400px] shadow-inner text-lg leading-relaxed"
                            placeholder="Paste the extracted text from your medical report here..."
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                        />
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading || !reportText.trim()}
                            className="mt-8 w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl hover:bg-emerald-500 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:bg-slate-900 flex items-center justify-center gap-4 group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <Zap className="w-6 h-6 text-emerald-400 group-hover:scale-125 transition-transform" />
                            )}
                            Decode Medical Insights
                        </button>
                    </div>
                </div>

                {/* Result Section */}
                <div className="xl:col-span-7">
                    {!result && !isLoading ? (
                        <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-slate-50/50">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                                <Sparkles className="w-10 h-10 text-slate-200" />
                            </div>
                            <h4 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-2">Awaiting Data</h4>
                            <p className="text-slate-400 font-bold italic max-w-xs">Enter report data and initialize the neural engine to see results here.</p>
                        </div>
                    ) : isLoading ? (
                        <div className="h-full min-h-[500px] bg-slate-900 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            <Loader2 className="w-20 h-20 text-emerald-500 animate-spin mb-8" />
                            <h4 className="text-2xl font-black text-white tracking-widest uppercase mb-4 animate-pulse">Neural Processing...</h4>
                            <p className="text-emerald-500/60 font-black italic text-sm">Synchronizing clinical data with Grok-beta Node</p>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in zoom-in-95 duration-500">
                            {/* Executive Summary */}
                            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5">
                                    <ClipboardCheck className="w-32 h-32 text-white" />
                                </div>
                                <h4 className="font-black text-xs text-white/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                                    Clinical Executive Summary
                                </h4>
                                <div className="text-xl font-bold text-emerald-50/90 leading-relaxed selection:bg-emerald-500">
                                    {result.summary}
                                </div>
                            </div>

                            {/* Critical Flags & Steps */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className={`p-8 rounded-[2.5rem] border ${result.criticalFlags?.length > 0 ? 'bg-rose-500/5 border-rose-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                                    <h4 className={`text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-3 ${result.criticalFlags?.length > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                        <AlertCircle className="w-4 h-4" />
                                        Health Risk Markers
                                    </h4>
                                    <div className="space-y-3">
                                        {result.criticalFlags?.map((flag: string, i: number) => (
                                            <div key={i} className="flex gap-3 bg-white/60 p-4 rounded-2xl border border-slate-100">
                                                <div className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${result.criticalFlags?.length > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                                                <span className="text-sm font-bold text-slate-700 leading-tight">{flag}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 bg-indigo-500/5 rounded-[2.5rem] border border-indigo-500/20">
                                    <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                                        <ArrowRight className="w-4 h-4" />
                                        Recommended Consultation
                                    </h4>
                                    <div className="space-y-3">
                                        {result.nextSteps?.map((step: string, i: number) => (
                                            <div key={i} className="flex gap-3 bg-white/60 p-4 rounded-2xl border border-slate-100">
                                                <div className="mt-1 h-3 w-3 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                                <span className="text-sm font-bold text-slate-700 leading-tight">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Wellness Tip */}
                            <div className="bg-emerald-500 flex items-center gap-8 p-10 rounded-[3rem] shadow-xl shadow-emerald-500/20 group hover:scale-[1.01] transition-transform">
                                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                                    <Zap className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Wellness Neural Tip</p>
                                    <p className="text-xl font-black text-white leading-tight">{result.wellnessTip}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NeuralLab;
