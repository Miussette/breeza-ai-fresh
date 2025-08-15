import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "./WelcomeScreenNew.css";

export default function WelcomeScreen() {
  const { user, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();

  const handleStartNow = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/session');
    }
  };

  return (
    <div className="welcome-page">
      {/* Header */}
      <header className="welcome-page-header">
        <nav className="welcome-page-nav">
          <div className="welcome-page-nav-content">
            <div className="welcome-page-logo">
              <img src="/breeza-brand.png" alt="Breeza AI Logo" />
              {isLoggedIn && (
                <span className="welcome-user-badge">
                  Welcome, {user?.name}! 👋
                </span>
              )}
            </div>
            <div className="welcome-page-nav-links">
              <Link to="/" className="welcome-page-nav-link">Home</Link>
              <Link to="/performance" className="welcome-page-nav-link">Performance</Link>
              <Link to="/testimony" className="welcome-page-nav-link">Testimony</Link>
              {isLoggedIn ? (
                <button onClick={logout} className="welcome-logout-btn">
                  Logout
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="welcome-login-btn">
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="welcome-page-main">
        <div className="welcome-page-container">
          {/* Left Side - Text and Logo */}
          <div className="welcome-page-left">
            <div className="welcome-page-text">
              <h1 className="welcome-page-title">
                {isLoggedIn ? `Hello ${user?.name}! 🌸` : 'Your personal AI friend for mental wellness.'}
              </h1>
              <p className="welcome-page-subtitle">
                {isLoggedIn
                  ? `Welcome back! Ready to continue your wellness journey? Kiro AI is here to support you.`
                  : 'Breeza can help you relax, take care of yourself, and even learn new skills. Let\'s take care of your mind together!'
                }
              </p>
            </div>

            <div className="welcome-page-brand">
              <img src="/breeza-logo.png" alt="Breeza AI Logo" className="welcome-page-brand-logo" />
            </div>
          </div>

          {/* Right Side - Options Card */}
          <div className="welcome-page-right">
            <div className="welcome-page-card">
              <div className="welcome-page-options">
                <Link to="/reduce-stress" className="welcome-page-option welcome-page-option-clickable">
                  <div className="welcome-page-option-icon welcome-icon-stress">
                    😊
                  </div>
                  <div className="welcome-page-option-content">
                    <h3>Reduce Stress</h3>
                    <p>Ease your mind</p>
                  </div>
                </Link>

                <Link to="/self-care" className="welcome-page-option welcome-page-option-clickable">
                  <div className="welcome-page-option-icon welcome-icon-care">
                    💚
                  </div>
                  <div className="welcome-page-option-content">
                    <h3>Self-Care</h3>
                    <p>Take time for you</p>
                  </div>
                </Link>

                <Link to="/learn-skill" className="welcome-page-option welcome-page-option-clickable">
                  <div className="welcome-page-option-icon welcome-icon-skill">
                    🎓
                  </div>
                  <div className="welcome-page-option-content">
                    <h3>Learn a Skill</h3>
                    <p>Quick lessons</p>
                  </div>
                </Link>

                <Link to="/session" className="welcome-page-option welcome-page-option-clickable">
                  <div className="welcome-page-option-icon welcome-icon-chat">
                    💬
                  </div>
                  <div className="welcome-page-option-content">
                    <h3>Talk to Breeza</h3>
                    <p>Start a conversation</p>
                  </div>
                </Link>
              </div>

              {isLoggedIn ? (
                <Link to="/session" className="welcome-page-button">
                  Continue Your Journey ✨
                </Link>
              ) : (
                <button onClick={handleStartNow} className="welcome-page-button">
                  Start Now
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}