import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SplashScreen = () => {
  const { setCurrentScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [setCurrentScreen]);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="text-center z-10 animate-pulse">
        <div className="text-8xl mb-6 animate-bounce">🚪</div>
        <h1 className="text-5xl font-black text-white mb-3 tracking-tight">Knock Knock</h1>
        <p className="text-xl text-white font-medium">Lightning-fast retail delivery</p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );
};