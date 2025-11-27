// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface User {
  email: string;
  userType: string; // "expert" | "candidate" | ...
  name?: string;
  // add other fields your backend returns
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, userType: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize axios auth header if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/profile');
      // backend should return { user: {...} }
      const userData: User = response.data.user;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to fetch profile', error);
      logout();
      throw error;
    }
  };

  // login now returns the user object
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      const { token: newToken, user: userData } = response.data;

      if (!newToken || !userData) {
        throw new Error('Invalid response from server');
      }

      // persist token + set header
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);

      // set user in context
      setUser(userData);
      setIsLoading(false);

      // return user for immediate navigation decisions
      return userData;
    } catch (error: any) {
      // normalize error message
      const msg = error?.response?.data?.message || error?.message || 'Login failed';
      throw new Error(msg);
    }
  };

  const register = async (email: string, password: string, userType: string, name: string) => {
    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
        userType,
        name
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
