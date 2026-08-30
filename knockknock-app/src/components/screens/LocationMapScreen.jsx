import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Search, CheckCircle2, Bike } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LocationMapScreen = () => {
  const { setCurrentScreen, setUserLocation, trackingOrderId, setTrackingOrderId } = useApp();
  const [tempLocation, setTempLocation] = useState('Avadi, Tamil Nadu');
  const [isLocating, setIsLocating] = useState(false);
  const [eta, setEta] = useState(15); // Simulated ETA in mins

  useEffect(() => {
    if (trackingOrderId) {
      // Simulate ETA counting down
      const interval = setInterval(() => {
        setEta(prev => prev > 1 ? prev - 1 : 1);
      }, 5000); // Reduce ETA every 5 seconds for simulation
      return () => clearInterval(interval);
    }
  }, [trackingOrderId]);

  const handleBack = () => {
    if (trackingOrderId) {
      setTrackingOrderId(null);
      setCurrentScreen('ordersHistory');
    } else {
      setCurrentScreen('home');
    }
  };

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
          onClick={handleBack}
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
        <div className="absolute w-full h-8 bg-white/50 top-1/3 rotate-12 flex items-center justify-center border-y-2 border-dashed border-gray-300">
          {trackingOrderId && (
            <div className="absolute h-full w-full left-0 flex items-center">
              <div className="w-1/2 h-1 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            </div>
          )}
        </div>
        <div className="absolute w-8 h-full bg-white/50 left-1/2 -rotate-12 border-x-2 border-dashed border-gray-300"></div>

        {/* Center Pin / Driver Pin */}
        <div className="relative z-10 flex flex-col items-center">
          {trackingOrderId ? (
            // Delivery Driver Moving Animation
            <div className="absolute -top-10 -left-20 animate-[slide-right_4s_ease-in-out_infinite_alternate] flex flex-col items-center z-20">
               <div className="bg-purple-600 text-white p-2 rounded-full shadow-lg">
                 <Bike size={32} />
               </div>
               <div className="bg-black text-white px-2 py-1 rounded mt-1 text-xs whitespace-nowrap">
                 Driver
               </div>
            </div>
          ) : null}

          <div className={`relative flex flex-col items-center ${!trackingOrderId && 'animate-bounce -mt-10'}`}>
            <div className="bg-black text-white px-3 py-1 rounded-lg text-xs font-bold mb-1 shadow-lg whitespace-nowrap">
              {trackingOrderId ? 'Your Location' : 'Order will be delivered here'}
            </div>
            <MapPin size={48} className="text-red-600 fill-current" />
            <div className="w-4 h-1 bg-black/20 rounded-full blur-sm mt-1"></div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-20">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        {trackingOrderId ? (
          <div className="text-center">
            <h2 className="text-2xl font-black text-gray-900 mb-1">Arriving in {eta} min</h2>
            <p className="text-gray-500 mb-6">Your delivery partner is on the way.</p>
            
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl text-left mb-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Bike size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Ramesh Kumar</h4>
                <p className="text-sm text-gray-500">TN 01 AB 1234 • 4.8 <span className="text-yellow-500">★</span></p>
              </div>
              <div className="flex items-center gap-2">
                 <button className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200">
                   📞
                 </button>
              </div>
            </div>

            <button 
              onClick={handleBack}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95"
            >
              Back to Orders
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};