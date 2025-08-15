import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  loginDate: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('breezaai_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('breezaai_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: { name: string; email: string }) => {
    const newUser: User = {
      ...userData,
      loginDate: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('breezaai_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('breezaai_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('breezaai_user', JSON.stringify(updatedUser));
  };

  const isLoggedIn = !!user;

  return {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateUser
  };
};