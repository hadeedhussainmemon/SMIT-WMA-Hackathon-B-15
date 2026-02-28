import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';
import {
    LayoutDashboard,
    Calendar,
    Pill,
    Users,
    LogOut,
    BarChart3,
    User,
    CreditCard,
    Activity,
    Stethoscope
} from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!user) return null;

    const navItems = {
        admin: [
            { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
            { name: 'Staff Management', icon: Users, path: '/dashboard/staff' },
            { name: 'SaaS Plans', icon: CreditCard, path: '/dashboard/plans' },
            { name: 'Advanced Analytics', icon: BarChart3, path: '/dashboard/analytics' },
        ],
        doctor: [
            { name: 'My Schedule', icon: Calendar, path: '/dashboard' },
            { name: 'AI Assistant', icon: Stethoscope, path: '/dashboard/ai' },
        ],
        receptionist: [
            { name: 'Front Desk', icon: LayoutDashboard, path: '/dashboard' },
            { name: 'Patient Directory', icon: Users, path: '/dashboard/patients' },
        ],
        patient: [
            { name: 'My Health', icon: Activity, path: '/dashboard' },
            { name: 'Prescriptions', icon: Pill, path: '/dashboard/prescriptions' },
        ]
    };

    const currentNav = navItems[(user as any).role as keyof typeof navItems] || [];

    return (
        <div className="flex h-screen bg-[#f8fafc] selection:bg-emerald-100 selection:text-emerald-900 font-sans relative overflow-hidden text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20 transition-all duration-300">
                <div className="h-20 flex items-center px-6">
                    <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            <Activity className="w-5.5 h-5.5 text-white" />
                        </div>
                        <span className="text-lg font-black tracking-tight text-slate-900">
                            Cura<span className="text-emerald-500">AI</span>
                        </span>
                    </div>
                </div>

                <div className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
                    <nav className="space-y-1.5">
                        <p className="px-3 text-[10px] font-black tracking-[0.1em] text-slate-400 uppercase mb-3">Main Navigation</p>
                        {currentNav.map((item) => {
                            const Icon = item.icon;
                            const isActive = item.path === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(item.path);

                            return (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.path)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 group ${isActive
                                        ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon className={`w-4.5 h-4.5 transition-transform duration-200 ${isActive ? 'text-emerald-600' : 'group-hover:translate-x-0.5'}`} />
                                    {item.name}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="mt-8 space-y-1.5">
                        <p className="px-3 text-[10px] font-black tracking-[0.1em] text-slate-400 uppercase mb-3">Settings</p>
                        <button
                            onClick={() => navigate('/dashboard/profile')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 group ${location.pathname === '/dashboard/profile'
                                ? 'bg-slate-100 text-slate-900'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <User className="w-4.5 h-4.5" />
                            My Profile
                        </button>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 mt-auto">
                    <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3 mb-3 border border-slate-100/50">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 font-black text-sm shadow-sm">
                            {((user as any).name as string)?.charAt(0) || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <h4 className="font-bold text-xs text-slate-900 truncate">{(user as any).name as string}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{(user as any).role as string}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all duration-200 group"
                    >
                        <LogOut className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/40 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4 bg-slate-100/50 border border-slate-200/50 rounded-2xl px-4 py-2 w-96 transition-all focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-500/30 group">
                        <User className="w-4 h-4 text-slate-400 group-focus-within:text-emerald-500" />
                        <input type="text" placeholder="Search for patients, records..." className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-600 placeholder:text-slate-400" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl hover:bg-white transition-colors flex items-center justify-center text-slate-500">
                            <Activity className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-700 hidden sm:block">{(user as any).name}</span>
                            <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs">
                                {((user as any).name as string)?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Viewport */}
                <section className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
                    <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm min-h-full">
                        {children}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardLayout;
