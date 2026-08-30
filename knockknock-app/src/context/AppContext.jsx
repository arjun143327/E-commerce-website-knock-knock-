import React, { createContext, useContext, useState } from 'react';
import { getMe } from '../api/authApi';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);
  
  // Check for token on mount
  React.useEffect(() => {
    const token = localStorage.getItem('knockknock_token');
    const savedUser = localStorage.getItem('knockknock_user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const [userLocation, setUserLocation] = useState('Avadi, Tamil Nadu');
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const login = (userData, token) => {
    localStorage.setItem('knockknock_token', token);
    localStorage.setItem('knockknock_user', JSON.stringify(userData));
    setUser(userData);
    setCurrentScreen('home');
  };

  const logout = () => {
    localStorage.removeItem('knockknock_token');
    localStorage.removeItem('knockknock_user');
    setUser(null);
    setCurrentScreen('login');
  };

  const refreshUser = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
      localStorage.setItem('knockknock_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    user,
    setUser,
    userLocation,
    setUserLocation,
    selectedStore,
    setSelectedStore,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    login,
    logout,
    refreshUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};