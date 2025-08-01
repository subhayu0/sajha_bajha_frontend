
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('access_token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('access_token', token);
      console.log('Token stored in localStorage:', token);
    } else {
      localStorage.removeItem('access_token');
      console.log('Token removed from localStorage');
    }
  }, [token]);

  // login now takes userData and token
  const login = (userData, token) => {
    console.log('Login called with userData:', userData);
    console.log('Login called with token:', token);
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };

  // Debug function to check authentication state
  const checkAuthState = () => {
    console.log('Current auth state:');
    console.log('User:', user);
    console.log('Token:', token);
    console.log('LocalStorage user:', localStorage.getItem('user'));
    console.log('LocalStorage token:', localStorage.getItem('access_token'));
    return { user, token };
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, checkAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add this hook to allow usage in other components
export const useAuth = () => {
  return useContext(AuthContext);
};