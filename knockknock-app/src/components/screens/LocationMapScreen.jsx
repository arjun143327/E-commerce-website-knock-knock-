import React, { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LocationMapScreen = () => {
  const { setCurrentScreen, setUserLocation } = useApp();
  const [tempLocation, setTempLocation] = useState('Avadi, Tamil Nadu');
  const [isLocating, setIsLocating] = useState(false);

  const handleConfirm = () => {
    setUserLocation(tempLocation);
    setCurrentScreen('home');
  };

  const simulateLocateMe = () => {
    setIsLocating(true);
    setTimeout(() => {
      setTempLocation('New Street, 5th Avenue, Chennai');
      setIsLocating(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 relative">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={() => setCurrentScreen('home')}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Simulated Map Background */}
      <div className="flex-1 bg-blue-50 relative overflow-hidden flex items-center justify-center">
        {/* Map Grid Pattern (Simulating a map view) */}
        <div className="absolute inset-0 opacity-10" 
             style={{backgroundImage: 'radial-gradient(#4F46E5 2px, transparent 2px)', backgroundSize: '30px 30px'}}>
        </div>
        
        {/* Roads Simulation */}
        <div className="absolute w-full h-4 bg-white/50 top-1/3 rotate-12"></div>
        <div className="absolute w-4 h-full bg-white/50 left-1/2 -rotate-12"></div>

        {/* Center Pin */}
        <div className="relative z-10 -mt-10 flex flex-col items-center animate-bounce">
          <div className="bg-black text-white px-3 py-1 rounded-lg text-xs font-bold mb-1 shadow-lg whitespace-nowrap">
            Order will be delivered here
          </div>
          <MapPin size={48} className="text-red-600 fill-current" />
          <div className="w-4 h-1 bg-black/20 rounded-full blur-sm mt-1"></div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-20">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <h2 className="text-xl font-black text-gray-900 mb-4">Select Location</h2>
        
        {/* Search Box */}
        <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl mb-4">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text" 
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
            className="bg-transparent w-full font-semibold outline-none text-gray-800"
          />
        </div>

        {/* Use Current Location */}
        <button 
          onClick={simulateLocateMe}
          className="flex items-center gap-3 text-purple-600 font-bold mb-6 hover:bg-purple-50 p-2 rounded-lg w-full transition"
        >
          <Navigation size={20} className={isLocating ? 'animate-spin' : ''} />
          <span>{isLocating ? 'Locating...' : 'Use Current Location'}</span>
        </button>

        {/* Confirm Button */}
        <button 
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95"
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
};