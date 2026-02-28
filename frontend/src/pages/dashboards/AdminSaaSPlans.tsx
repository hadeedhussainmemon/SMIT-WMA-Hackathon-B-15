import {
    useGetMySubscriptionQuery,
    useToggleSubscriptionMutation
} from '../../store/api/subscriptionApiSlice';
import {
    Zap,
    ShieldCheck,
    Trophy,
    CheckCircle2,
    Lock,
    Loader2,
    Sparkles,
    BarChart3,
    Cpu
} from 'lucide-react';

const AdminSaaSPlans = () => {
    const { data: subscription, isLoading } = useGetMySubscriptionQuery({});
    const [toggleSubscription, { isLoading: isToggling }] = useToggleSubscriptionMutation();

    const handleToggle = async () => {
        try {
            await toggleSubscription({}).unwrap();
        } catch (err: any) {
            alert(err?.data?.message || err.error);
        }
    };

    const isPro = subscription?.planTier === 'Pro';

    const features = [
        { name: 'Patient Management', free: true, pro: true, icon: CheckCircle2 },
        { name: 'Appointment Booking', free: true, pro: true, icon: CheckCircle2 },
        { name: 'Prescription PDFs', free: true, pro: true, icon: CheckCircle2 },
        { name: 'Basic Analytics', free: true, pro: true, icon: CheckCircle2 },
        { name: 'AI Symptom Checker', free: false, pro: true, icon: Cpu },
        { name: 'AI Prescription Suggester', free: false, pro: true, icon: Sparkles },
        { name: 'Predictive Load Forecasting', free: false, pro: true, icon: BarChart3 },
        { name: 'Human-Readable AI Prescriptions', free: false, pro: true, icon: Zap },
    ];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                <p className="text-slate-500 font-semibold italic">Syncing with billing system...</p>
            </div>
        );
    }

    return (
        <div className="p-2 space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">SaaS Subscription Plans</h2>
                    <p className="text-slate-500 mt-1 font-medium italic">Simulate different clinic tiers to unlock advanced AI capabilities</p>
                </div>

                <div className={`px-6 py-2 rounded-2xl border-2 flex items-center gap-3 font-bold transition-all duration-500 ${isPro ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-lg shadow-amber-200/20' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                    {isPro ? <Trophy className="w-6 h-6 animate-pulse" /> : <ShieldCheck className="w-6 h-6" />}
                    Currently on: {subscription?.planTier} Plan
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Plan Comparison Cards */}
                <div className="space-y-6">
                    <div className="bg-white/40 backdrop-blur-md border border-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500">
                        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">1</span>
                            Feature Matrix
                        </h3>

                        <div className="space-y-4">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-slate-50/50 group hover:bg-white transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${feature.pro ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 bg-slate-100'}`}>
                                            <feature.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{feature.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-black text-xs uppercase tracking-tighter">
                                        <span className={feature.free ? 'text-green-500' : 'text-slate-300'}><CheckCircle2 className="w-4 h-4" /></span>
                                        <span className="text-indigo-600"><CheckCircle2 className="w-4 h-4" /></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Plan Toggle Action */}
                <div className="flex flex-col gap-6">
                    <div className={`rounded-[2.5rem] p-10 border-4 transition-all duration-700 flex flex-col items-center text-center justify-center min-h-[400px] shadow-2xl ${isPro ? 'bg-gradient-to-br from-indigo-900 to-slate-900 border-indigo-500/30' : 'bg-white border-slate-100'}`}>
                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-transform duration-700 rotate-12 hover:rotate-0 ${isPro ? 'bg-indigo-600 text-white shadow-indigo-500/40' : 'bg-slate-100 text-slate-400'}`}>
                            {isPro ? <Zap className="w-12 h-12 fill-white" /> : <Lock className="w-12 h-12" />}
                        </div>

                        <h3 className={`text-4xl font-black leading-tight mb-4 ${isPro ? 'text-white' : 'text-slate-900'}`}>
                            {isPro ? 'You are a PRO!' : 'Unlock AI Intelligence'}
                        </h3>
                        <p className={`text-lg mb-10 max-w-sm font-medium ${isPro ? 'text-indigo-100/70' : 'text-slate-500'}`}>
                            {isPro
                                ? 'Your clinic is fully empowered with predictive load forecasting and smart AI diagnostics.'
                                : 'Get started with advanced medical assistance by upgrading to our Pro Tier simulation.'}
                        </p>

                        <button
                            onClick={handleToggle}
                            disabled={isToggling}
                            className={`px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 ${isPro
                                ? 'bg-white text-indigo-900 hover:bg-red-50 hover:text-red-700'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 shadow-indigo-600/20'}`}
                        >
                            {isToggling ? <Loader2 className="w-6 h-6 animate-spin" /> : isPro ? <Zap className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                            {isPro ? 'Downgrade to Free' : 'Simulate PRO Upgrade'}
                        </button>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100/50">
                        <p className="text-sm font-bold text-indigo-800 leading-relaxed flex gap-3">
                            <Zap className="w-8 h-8 shrink-0 text-indigo-600" />
                            Upgrade status is synchronized globally across the system. Medical staff will immediately see AI tools unlocked in their dashboards upon upgrade.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSaaSPlans;
