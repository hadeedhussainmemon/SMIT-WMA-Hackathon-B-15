import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center gap-6">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Welcome to Boilerplate
            </h1>
            <p className="text-lg text-muted-foreground w-full max-w-2xl">
                A complete MERN stack boilerplate with React, Vite, Tailwind CSS, Shadcn UI, and Redux Toolkit.
            </p>
            <div className="flex gap-4 mt-8">
                <Link to="/login" className="px-6 py-3 font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                    Get Started
                </Link>
                <Link to="/about" className="px-6 py-3 font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md">
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default Home;
