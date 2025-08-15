import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, isLoading, navigate]);

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  // If not logged in, don't render children (will redirect)
  if (!isLoggedIn) {
    return null;
  }

  // If logged in, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;