import React, { createContext, useContext, useState } from 'react';
import { getMe } from '../api/authApi';
import { getWishlist, toggleWishlist as apiToggleWishlist } from '../api/productsApi';

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
  const [sortBy, setSortBy] = useState('');
  const [wishlistIds, setWishlistIds] = useState([]);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const items = await getWishlist();
      setWishlistIds(items.map(i => i.id));
    } catch (error) {
      console.error('Failed to fetch wishlist', error);
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const toggleWishlist = async (productId) => {
    try {
      const res = await apiToggleWishlist(productId);
      if (res.isWishlisted) {
        setWishlistIds(prev => [...prev, productId]);
      } else {
        setWishlistIds(prev => prev.filter(id => id !== productId));
      }
    } catch (error) {
      console.error('Failed to toggle wishlist', error);
    }
  };

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
    sortBy,
    setSortBy,
    wishlistIds,
    toggleWishlist,
    trackingOrderId,
    setTrackingOrderId,
    login,
    logout,
    refreshUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};