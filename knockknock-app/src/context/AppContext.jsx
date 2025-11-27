import React, { createContext, useContext, useState } from 'react';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLocation, setUserLocation] = useState('Avadi, Tamil Nadu');
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const login = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    isLoggedIn,
    setIsLoggedIn,
    userLocation,
    setUserLocation,
    selectedStore,
    setSelectedStore,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    login,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};