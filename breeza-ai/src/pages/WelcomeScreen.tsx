import "./WelcomeScreen.css";
import { Link } from "react-router-dom";

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full"></div>
      <div className="absolute top-1/2 -left-20 w-60 h-60 bg-gradient-to-br from-pink-200/20 to-blue-200/20 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/25 to-pink-200/25 rounded-full"></div>

      {/* Header with navigation */}
      <header className="relative z-20 bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm border-b border-blue-200/30">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="/breeza logo.png"
                alt="Breeza AI Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold text-gray-800">Breeza AI</span>
            </div>
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors underline">
                Home
              </Link>
              <Link to="/performance" className="text-gray-600 hover:text-blue-600 font-medium transition-colors underline">
                Performance
              </Link>
              <Link to="/testimony" className="text-gray-600 hover:text-blue-600 font-medium transition-colors underline">
                Testimony
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-120px)]">

          {/* Left side - Text content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Your personal AI friend for mental wellness.
              </h1>
              <p className="text-lg text-purple-600 leading-relaxed">
                Breeza can help you relax, take care of yourself, and even learn new skills. Let's take care of your mind together!
              </p>
            </div>

            {/* Logo */}
            <div className="flex items-center space-x-4">
              <img
                src="/breeza logo.png"
                alt="Breeza AI Logo"
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
              />
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  
                </h2>
              </div>
            </div>
          </div>

          {/* Right side - Options */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">

              {/* Option cards */}
              <div className="space-y-4 mb-6">
                <Link to="/reduce-stress" className="flex items-center p-4 hover:bg-blue-50/50 transition-colors group">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                    <span className="text-white text-xl">😊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-600 text-lg mb-0">Reduce Stress</h3>
                    <p className="text-gray-400 text-sm">Ease your mind</p>
                  </div>
                </Link>

                <Link to="/self-care" className="flex items-center p-4 hover:bg-green-50/50 transition-colors group">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                    <span className="text-white text-xl">❤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-600 text-lg mb-0">Self-Care</h3>
                    <p className="text-gray-400 text-sm">Take time for you</p>
                  </div>
                </Link>

                <Link to="/learn-skill" className="flex items-center p-4 hover:bg-blue-50/50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-600 text-lg mb-0">Learn a Skill</h3>
                    <p className="text-gray-400 text-sm">Quick lessons</p>
                  </div>
                </Link>

                <Link to="/session" className="flex items-center p-4 hover:bg-blue-50/50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-600 text-lg mb-0">Talk to Breeza</h3>
                    <p className="text-gray-400 text-sm">Start a conversation</p>
                  </div>
                </Link>
              </div>

              {/* Start Now button */}
              <Link
                to="/session"
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold text-base hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Start Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}