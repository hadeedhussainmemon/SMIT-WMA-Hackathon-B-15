import {
    TrendingUp,
    Activity,
    ArrowUpRight,
    AlertTriangle
} from 'lucide-react';

const AdminAnalytics = () => {
    // Simulated analytics data
    const forecastData = [
        { month: 'Mar', load: 450, trend: '+12%' },
        { month: 'Apr', load: 520, trend: '+15%' },
        { month: 'May (Forecast)', load: 680, trend: '+30%', highlight: true },
    ];

    const diseaseTrends = [
        { name: 'Viral Fever', growth: 'High', urgency: 'Medium' },
        { name: 'Seasonal Allergy', growth: 'Surging', urgency: 'Low' },
        { name: 'Heat Exhaustion', growth: 'Projected', urgency: 'High' },
    ];

    return (
        <div className="p-1 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clinic Insights</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Real-time load forecasting and epidemiology trends</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">AI Engine Live</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Clinic Load Forecast */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm flex flex-col min-h-[480px]">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-lg font-black text-slate-800 flex items-center gap-3 uppercase tracking-wider">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                            Occupancy Forecast
                        </h2>
                        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                            {['7D', '1M', '1Y'].map(t => (
                                <button key={t} className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${t === '1M' ? 'bg-white text-emerald-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex items-end justify-between gap-6 h-64 mb-10 px-4">
                        {forecastData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-default">
                                <div className="w-full relative h-[180px] flex items-end">
                                    <div
                                        className={`w-full rounded-2xl transition-all duration-700 ${d.highlight ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-100 group-hover:bg-slate-200'}`}
                                        style={{ height: `${(d.load / 700) * 100}%` }}
                                    >
                                        {d.highlight && (
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-xl font-bold border border-slate-800 shadow-2xl scale-110">
                                                {d.load} (Peak)
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className={`text-xs font-black ${d.highlight ? 'text-emerald-600' : 'text-slate-400'}`}>{d.month}</p>
                                    <p className="text-[10px] font-bold text-slate-400">{d.trend}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
                                <Activity className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-emerald-700 text-[10px] font-black uppercase tracking-widest">Resource Insight</p>
                                <p className="text-slate-900 font-bold text-sm tracking-tight">Optimal staffing suggested for Q3 surge.</p>
                            </div>
                        </div>
                        <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] hover:bg-slate-800 transition-all uppercase tracking-widest">
                            Staffing Plan
                        </button>
                    </div>
                </div>

                {/* Disease Trends */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-3 uppercase tracking-wider mb-10">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Emerging Risks
                    </h2>

                    <div className="space-y-6">
                        {diseaseTrends.map((t, i) => (
                            <div key={i} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all group cursor-pointer">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">{t.name}</h4>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${t.growth === 'Surging' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                        {t.growth}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${t.urgency === 'High' ? 'bg-rose-500' : t.urgency === 'Medium' ? 'bg-emerald-500' : 'bg-slate-400'}`}
                                            style={{ width: t.urgency === 'High' ? '90%' : t.urgency === 'Medium' ? '60%' : '30%' }}
                                        ></div>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.urgency}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100">
                        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                            Download Epidemiological Report <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { label: 'Patient Retention', val: '88%', delta: '+4.2%' },
                    { label: 'Avg Wait Time', val: '14m', delta: '-2m' },
                    { label: 'Clinic Efficiency', val: '9.4', delta: 'High' },
                ].map((m, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-colors">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
                        <div className="flex items-baseline gap-3">
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{m.val}</h3>
                            <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">{m.delta}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminAnalytics;
