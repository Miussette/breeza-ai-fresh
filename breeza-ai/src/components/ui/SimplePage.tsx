// src/components/ui/SimplePage.tsx
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import "../../styles/simple-page.css";

interface SimplePageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  centerTitle?: boolean;
}

export const SimplePage: React.FC<SimplePageProps> = ({ title, subtitle, children, centerTitle }) => {
  return (
    <div className="simple-page min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Header with navigation */}
      <header className="sp-header">
        <nav className="sp-nav">
          <div className="sp-logo">
            <img 
              src="/breeza-brand.png" 
              alt="Breeza AI Logo" 
              className="w-10 h-10 object-contain"
            />
            <span> </span>
          </div>
          <div className="sp-nav-links">
            <Link to="/" className="sp-nav-link">Home</Link>
            <Link to="/performance" className="sp-nav-link">Performance</Link>
            <Link to="/testimony" className="sp-nav-link">Testimony</Link>
          </div>
        </nav>
      </header>

      {/* Background circles */}
      <div className="sp-bubble--l"></div>
      <div className="sp-bubble--m"></div>
      
      {/* Main content */}
      <main className="sp-main">
        <div className="sp-content">
          {/* Title */}
          <h1 className={`sp-title gradient ${centerTitle ? 'center' : ''}`}>
            {title}
          </h1>
          {subtitle && (
            <p className="sp-subtitle">
              {subtitle}
            </p>
          )}

          {/* Content */}
          <div className="sp-card">
            {children}
          </div>

          {/* Back button */}
          <div className="flex justify-center">
            <Link to="/" className="sp-back-btn">
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};