import { useState, useRef, useEffect } from 'react';
import { useAnalyzeReportMutation, useNeuralChatMutation } from '../../store/api/aiApiSlice';
import {
    BrainCircuit,
    Zap,
    AlertCircle,
    Loader2,
    Sparkles,
    FileSearch,
    MessageSquare,
    Send,
    Bot,
    User,
    ArrowRight,
    Lock
} from 'lucide-react';
import { useGetMySubscriptionQuery } from '../../store/api/subscriptionApiSlice';

const NeuralLab = () => {
    const [activeView, setActiveView] = useState<'analyzer' | 'chat'>('analyzer');
    const { data: subscription } = useGetMySubscriptionQuery({});
    const isPro = subscription?.planTier === 'Pro';

    // --- Report Analyzer State ---
    const [reportText, setReportText] = useState('');
    const [analyzeReport, { isLoading: analyzing }] = useAnalyzeReportMutation();
    const [result, setResult] = useState<any>(null);

    // --- Neural Chat State ---
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [neuralChat, { isLoading: chatting }] = useNeuralChatMutation();
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (activeView === 'chat') scrollToBottom();
    }, [chatHistory, chatting, activeView]);

    const handleAnalyze = async () => {
        if (!reportText.trim()) return;
        try {
            const res = await analyzeReport({ reportText }).unwrap();
            setResult(res);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChatSend = async () => {
        if (!chatInput.trim() || chatting) return;

        const userMsg = { role: 'user' as const, content: chatInput };
        const newHistory = [...chatHistory, userMsg];
        setChatHistory(newHistory);
        setChatInput('');

        try {
            const res = await neuralChat({ messages: newHistory }).unwrap();
            setChatHistory(prev => [...prev, { role: 'assistant', content: res.reply }]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col gap-10 p-2 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            {/* Header / Tab Section */}
            <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                    <BrainCircuit className="w-40 h-40 text-slate-900" />
                </div>
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Neural Clinical Suite v2.4</span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            </div>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Neural Lab</h1>
                            <p className="text-slate-500 text-xl font-bold italic max-w-2xl leading-relaxed">
                                Advanced clinical intelligence for report decoding and conversational diagnostics.
                            </p>
                        </div>

                        <div className="bg-slate-900 p-2 rounded-[2.5rem] flex items-center gap-2 shadow-2xl">
                            <button
                                onClick={() => setActiveView('analyzer')}
                                className={`px-8 py-4 rounded-[1.8rem] transition-all font-black text-xs uppercase tracking-widest flex items-center gap-3 relative ${activeView === 'analyzer' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
                            >
                                <FileSearch className="w-4 h-4" /> Reports
                                {!isPro && <Lock className="w-3 h-3 absolute top-2 right-2 text-emerald-400" />}
                            </button>
                            <button
                                onClick={() => setActiveView('chat')}
                                className={`px-8 py-4 rounded-[1.8rem] transition-all font-black text-xs uppercase tracking-widest flex items-center gap-3 relative ${activeView === 'chat' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
                            >
                                <MessageSquare className="w-4 h-4" /> Neural Chat
                                {!isPro && <Lock className="w-3 h-3 absolute top-2 right-2 text-emerald-400" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {activeView === 'analyzer' ? (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    {/* Input Section */}
                    <div className="xl:col-span-5 flex flex-col gap-6">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm flex-1 flex flex-col">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                                <Zap className="w-4 h-4 text-emerald-500" />
                                Report Terminal
                            </h3>
                            <textarea
                                className="flex-1 w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300 placeholder:italic min-h-[400px] shadow-inner text-lg leading-relaxed"
                                placeholder="Paste the extracted text from your medical report here..."
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                            />
                            <button
                                onClick={handleAnalyze}
                                disabled={analyzing || !reportText.trim() || !isPro}
                                className="mt-8 w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl hover:bg-emerald-500 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:bg-slate-900 flex items-center justify-center gap-4 group"
                            >
                                {analyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform" />}
                                {isPro ? 'Decode Medical Insights' : 'Pro Subscription Required'}
                            </button>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="xl:col-span-7">
                        {!result && !analyzing ? (
                            <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-slate-50/50">
                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                                    <Sparkles className="w-10 h-10 text-slate-200" />
                                </div>
                                <h4 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-2">Awaiting Data</h4>
                                <p className="text-slate-400 font-bold italic max-w-xs">Initialize the neural engine to see decoded results here.</p>
                            </div>
                        ) : analyzing ? (
                            <div className="h-full min-h-[500px] bg-slate-900 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl">
                                <Loader2 className="w-20 h-20 text-emerald-500 animate-spin mb-8" />
                                <h4 className="text-2xl font-black text-white tracking-widest uppercase mb-4 animate-pulse">Neural Processing...</h4>
                                <p className="text-emerald-500/60 font-black italic text-sm">Synchronizing clinical data with Grok-beta Node</p>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in zoom-in-95 duration-500">
                                <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-800">
                                    <h4 className="font-black text-xs text-white/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                                        Decoded Summary
                                    </h4>
                                    <div className="text-xl font-bold text-emerald-50/90 leading-relaxed italic">
                                        "{result.summary}"
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] border bg-rose-500/5 border-rose-500/20">
                                        <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <AlertCircle className="w-4 h-4" />
                                            Risk Markers
                                        </h4>
                                        <div className="space-y-3">
                                            {result.criticalFlags?.map((flag: string, i: number) => (
                                                <div key={i} className="flex gap-3 bg-white/60 p-4 rounded-2xl border border-rose-100">
                                                    <div className="mt-1 h-3 w-3 rounded-full bg-rose-500 flex-shrink-0"></div>
                                                    <span className="text-sm font-bold text-slate-700 leading-tight">{flag}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 bg-indigo-500/5 rounded-[2.5rem] border border-indigo-500/20">
                                        <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <ArrowRight className="w-4 h-4" />
                                            Consultation Steps
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

                                <div className="bg-emerald-500 flex items-center gap-8 p-10 rounded-[3rem] shadow-xl text-white">
                                    <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shrink-0">
                                        <Zap className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Health Tip</p>
                                        <p className="text-xl font-black leading-tight">{result.wellnessTip}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-[700px] bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
                    {/* Chat Feed */}
                    <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/50">
                        {chatHistory.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center gap-6 opacity-30">
                                <Bot className="w-20 h-20 text-slate-900" />
                                <div>
                                    <h4 className="text-xl font-black uppercase tracking-[0.3em] text-slate-900">Neural Sync Active</h4>
                                    <p className="font-bold italic mt-2 text-slate-500">I am your conversational bot. Type below to start clinical reasoning.</p>
                                </div>
                            </div>
                        )}

                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                                <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-slate-900 text-emerald-400' : 'bg-emerald-500 text-white'}`}>
                                        {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                                    </div>
                                    <div className={`p-6 rounded-[2.5rem] text-base leading-relaxed font-bold ${msg.role === 'user' ? 'bg-white border border-slate-200 text-slate-900 rounded-tr-none shadow-sm' : 'bg-slate-900 text-emerald-50 rounded-tl-none ring-4 ring-emerald-500/5 shadow-xl'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {chatting && (
                            <div className="flex justify-start">
                                <div className="flex gap-4 animate-pulse">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white">
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div className="bg-slate-900 p-6 rounded-[2.5rem] rounded-tl-none flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Processing Neural Thread...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-8 pb-10 border-t border-slate-100 bg-white">
                        <div className="relative max-w-5xl mx-auto flex gap-4">
                            <input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                                disabled={!isPro}
                                placeholder={isPro ? "Consult the Neural Assistant about symptoms or medical data..." : "Upgrade to Pro to unlock clinical chat..."}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-[2.5rem] py-6 px-10 text-slate-900 font-black placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5 transition-all shadow-inner text-lg disabled:opacity-50"
                            />
                            <button
                                onClick={handleChatSend}
                                disabled={chatting || !chatInput.trim() || !isPro}
                                className="p-6 bg-slate-900 hover:bg-emerald-500 disabled:opacity-30 rounded-[2rem] text-white transition-all shadow-2xl active:scale-95 group"
                            >
                                <Send className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NeuralLab;
