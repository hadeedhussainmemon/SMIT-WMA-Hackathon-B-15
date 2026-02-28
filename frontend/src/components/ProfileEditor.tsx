import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateProfileMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { User, Mail, Lock, ShieldCheck, Edit2, Check, X } from 'lucide-react';

const ProfileEditor = () => {
    const { user, token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

    useEffect(() => {
        if (user) {
            setName(user.name as string);
            setEmail(user.email as string);
        }
    }, [user]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedUser = await updateProfile({ name, email, password }).unwrap();
            dispatch(setCredentials({ user: updatedUser, token: token as string }));
            setSuccessMsg('Profile updated successfully!');
            setIsEditing(false);
            setPassword(''); // Clear password field

            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Failed to update profile', err);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (user) {
            setName(user.name as string);
            setEmail(user.email as string);
        }
        setPassword('');
    };

    if (!user) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 w-full max-w-2xl mb-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <User className="w-6 h-6 text-indigo-500" />
                        My Profile
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Manage your personal information and credentials</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4" /> Edit Profile
                    </button>
                )}
            </div>

            {successMsg && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-sm font-medium flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    {successMsg}
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Failed to update profile. Please try again.
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5 group">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className={`h-5 w-5 transition-colors ${isEditing ? 'text-indigo-500' : 'text-slate-400'}`} />
                            </div>
                            <input
                                type="text"
                                disabled={!isEditing}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400 text-slate-900 disabled:opacity-70 disabled:bg-slate-100"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 group">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className={`h-5 w-5 transition-colors ${isEditing ? 'text-indigo-500' : 'text-slate-400'}`} />
                            </div>
                            <input
                                type="email"
                                disabled={!isEditing}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400 text-slate-900 disabled:opacity-70 disabled:bg-slate-100"
                            />
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="space-y-1.5 group animate-in fade-in slide-in-from-top-4 duration-300">
                        <label className="text-sm font-semibold text-slate-700 ml-1">New Password (Leave blank to keep current)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400 text-slate-900"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                )}

                <div className="pt-4 flex items-center gap-4 border-t border-slate-100">
                    <span className="text-sm font-medium text-slate-500 capitalize bg-slate-100 px-3 py-1 rounded-full">
                        Role: {user.role as string}
                    </span>

                    {isEditing && (
                        <div className="ml-auto flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-xl transition-all flex items-center gap-2"
                            >
                                <X className="w-4 h-4" /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <><Check className="w-4 h-4" /> Save Changes</>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProfileEditor;
