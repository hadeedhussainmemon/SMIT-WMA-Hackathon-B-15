const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-muted/40">
            <div className="w-full max-w-md p-8 bg-card rounded-xl shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Email</label>
                        <input type="email" placeholder="you@example.com" className="px-3 py-2 border rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Password</label>
                        <input type="password" placeholder="••••••••" className="px-3 py-2 border rounded-md" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-primary rounded-md hover:bg-primary/90">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
