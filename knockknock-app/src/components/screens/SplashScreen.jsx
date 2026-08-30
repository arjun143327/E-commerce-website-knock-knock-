import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SplashScreen = () => {
  const { setCurrentScreen, user } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setCurrentScreen('home');
      } else {
        setCurrentScreen('login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [setCurrentScreen, user]);

  return (
    <div className="h-screen bg-gradient-light flex items-center justify-center relative overflow-hidden animate-slide-up">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl"></div>
      
      {/* Decorative blurry background circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-subtle"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
      
      <div className="text-center z-10 animate-float">
        <div className="text-7xl mb-4 font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">⚡</div>
        <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600 mb-3 tracking-tighter">ASHY</h1>
        <p className="text-lg text-gray-500 font-medium tracking-wide uppercase text-sm">Hyperlocal Speed Delivery</p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );
};