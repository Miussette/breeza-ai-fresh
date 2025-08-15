import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import './WelcomeScreenNew.css';

const LoginPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, isLoggedIn } = useUser();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/session');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            login({ name: name.trim(), email: email.trim() });
            setIsLoading(false);
            navigate('/session');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
            {/* Background circles */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full"></div>
            <div className="absolute top-1/2 -left-20 w-60 h-60 bg-gradient-to-br from-pink-200/20 to-blue-200/20 rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/25 to-pink-200/25 rounded-full"></div>

            {/* Header */}
            <header className="welcome-page-header">
                <nav className="welcome-page-nav">
                    <div className="welcome-page-nav-content">
                        <div className="welcome-page-logo">
                            <img src="/breeza-brand.png" alt="Breeza AI Logo" />
                        </div>
                        <div className="welcome-page-nav-links">
                            <button
                                onClick={() => navigate('/')}
                                className="welcome-page-nav-link"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-8">
                <div className="max-w-md w-full">
                    {/* Login Card */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white text-center">
                            <div className="mb-4">
                                <img
                                    src="/breeza-logo.png"
                                    alt="Breeza AI"
                                    className="w-16 h-16 mx-auto object-contain bg-white/20 rounded-full p-2"
                                />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Welcome to BreezaAI</h1>
                            <p className="text-blue-100">Let's personalize your wellness journey</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                                    What should we call you? 🌸
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-lg"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Email (for your wellness progress) 📧
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-lg"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Benefits */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                                <h3 className="font-bold text-blue-800 mb-3 text-center">✨ Your personalized experience includes:</h3>
                                <ul className="text-sm text-blue-700 space-y-2">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        Customized wellness plans with your name
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                                        Personalized chat responses from Kiro AI
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        Progress tracking and insights
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                                        Tailored breathing exercises
                                    </li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!name.trim() || !email.trim() || isLoading}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                        Creating your profile...
                                    </div>
                                ) : (
                                    'Start My Wellness Journey 🚀'
                                )}
                            </button>

                            {/* Privacy Note */}
                            <div className="text-center">
                                <p className="text-xs text-gray-500">
                                    Your information is stored locally and used only to personalize your experience.
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    We respect your privacy. 🔒
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account? Your data is saved locally in your browser.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;