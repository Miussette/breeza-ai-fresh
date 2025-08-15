import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { name: string; email: string }) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ name: name.trim(), email: email.trim() });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-t-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome to BreezaAI</h2>
              <p className="text-blue-100 mt-1">Let's personalize your wellness journey</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              What should we call you? 🌸
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email (for your wellness progress) 📧
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">✨ Your personalized experience includes:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Customized wellness plans with your name</li>
              <li>• Personalized chat responses from Kiro AI</li>
              <li>• Progress tracking and insights</li>
              <li>• Tailored breathing exercises</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name.trim() || !email.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating your profile...
              </div>
            ) : (
              'Start My Wellness Journey 🚀'
            )}
          </button>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 text-center">
            Your information is stored locally and used only to personalize your experience. 
            We respect your privacy. 🔒
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;