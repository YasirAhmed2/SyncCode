/* eslint-disable @typescript-eslint/no-unused-vars */
// src/context/auth.context.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { User, AuthState } from '../types.js';
import { TOKEN_KEY, USER_KEY } from './auth.constants.js';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<void>;
  signup: (username: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  verifyOTP: (otp: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function for initial state - moved outside component
const getInitialAuthState = (): AuthState => {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
    };
  }

  const savedToken = localStorage.getItem(TOKEN_KEY);
  const savedUser = localStorage.getItem(USER_KEY);
  
  if (savedToken && savedUser) {
    try {
      return {
        user: JSON.parse(savedUser),
        token: savedToken,
        isAuthenticated: true,
        isLoading: false,
      };
    } catch (error) {
      console.error('Error parsing saved user:', error);
      // Clear invalid data
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use lazy initialization to avoid useEffect for initial state
  const [state, setState] = useState<AuthState>(() => getInitialAuthState());

  // Optional: Only needed if you want to sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY || e.key === USER_KEY) {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);
        
        if (savedToken && savedUser) {
          try {
            setState({
              user: JSON.parse(savedUser),
              token: savedToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            console.error('Error parsing user on storage change:', error);
          }
        } else {
          setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email: string, pass: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Placeholder logic: Accept anything for demo
    const mockUser: User = { 
      id: '1', 
      username: email.split('@')[0], 
      email 
    };
    const mockToken = 'dummy-jwt-token';

    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

    setState({
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signup = async (username: string, email: string, pass: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate success - proceed to OTP step via UI
    setState(prev => ({ ...prev, isLoading: false }));
  };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const verifyOTP = async (otp: string, email: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate verification
    if (otp !== '123456') {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error("Invalid OTP");
    }
    
    setState(prev => ({ ...prev, isLoading: false }));
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...state,
    login,
    signup,
    logout,
    verifyOTP,
  }), [state]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};