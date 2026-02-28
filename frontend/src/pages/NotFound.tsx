import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-indigo-200">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Visual Element */}
                <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-indigo-200 rounded-full"></div>
                    <SearchX className="relative z-10 w-12 h-12 text-indigo-600" />
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-7xl font-black text-slate-900 tracking-tight">404</h1>
                    <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
                    <p className="text-slate-500 font-medium">
                        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 w-full sm:w-auto"
                    >
                        <Home className="w-5 h-5" />
                        Return to Homepage
                    </Link>
                </div>

                {/* Support Link */}
                <div className="pt-12 border-t border-slate-200/50">
                    <p className="text-sm font-medium text-slate-400">
                        Need help? <a href="#" className="text-indigo-600 hover:text-indigo-700 hover:underline">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
