import { useState } from 'react';
import {
    useGetUsersQuery,
    useCreateUserMutation,
    useDeleteUserMutation
} from '../../store/api/userApiSlice';
import {
    UserPlus,
    Trash2,
    User,
    Mail,
    Lock,
    Shield,
    X,
    Plus,
    Loader2,
    Stethoscope
} from 'lucide-react';

const AdminStaffManager = () => {
    const { data: users, isLoading, error } = useGetUsersQuery({});
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'doctor'
    });

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to remove this staff member?')) {
            try {
                await deleteUser(id).unwrap();
            } catch (err: any) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(formData).unwrap();
            setIsModalOpen(false);
            setFormData({ name: '', email: '', password: '', role: 'doctor' });
        } catch (err: any) {
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <div className="p-2 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Staff Management</h2>
                    <p className="text-slate-500 mt-1 font-medium">Add or remove clinic personnel (Doctors, Receptionists, Admins)</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                >
                    <UserPlus className="w-5 h-5" />
                    Invite New Staff
                </button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <p className="text-slate-500 font-semibold italic text-lg">Retrieving personnel records...</p>
                </div>
            ) : error ? (
                <div className="p-8 bg-red-50 border border-red-100 rounded-3xl text-center">
                    <p className="text-red-600 font-bold">Failed to load staff members. Please verify admin privileges.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users?.map((staff: any) => (
                        <div
                            key={staff._id}
                            className="bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white shadow-sm flex flex-col items-center text-center group hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDelete(staff._id)}
                                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Remove Staff Member"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center mb-4 shadow-inner ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-indigo-700">{staff.name.charAt(0)}</span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 leading-tight">{staff.name}</h3>
                            <p className="text-slate-500 font-medium text-sm mb-4">{staff.email}</p>

                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                                {staff.role === 'doctor' ? <Stethoscope className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                                {staff.role}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Staff Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Add Staff Member</h3>
                                <p className="text-sm text-slate-500 font-medium">Create a new clinic user account</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Dr. John Doe"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none font-medium text-slate-900"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="doctor@curaai.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none font-medium text-slate-900"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Access Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none font-medium text-slate-900"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Account Role</label>
                                <select
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none font-bold text-slate-900 appearance-none cursor-pointer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="doctor">Medical Doctor</option>
                                    <option value="receptionist">Front Desk / Receptionist</option>
                                    <option value="admin">System Administrator</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
                            >
                                {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                Add Staff Member
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminStaffManager;
