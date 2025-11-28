import React from 'react';
import { MapPin, Bell, Heart, Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { userLocation, searchQuery, setSearchQuery, setCurrentScreen } = useApp();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          
          {/* CLICKABLE LOCATION */}
          <button 
            onClick={() => setCurrentScreen('locationMap')}
            className="flex items-center gap-2 hover:bg-white/10 p-2 -ml-2 rounded-xl transition cursor-pointer text-left"
          >
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <div className="text-xs opacity-90 flex items-center gap-1">
                Delivering to <span className="text-[10px] bg-white/20 px-1 rounded">▼</span>
              </div>
              <div className="font-bold text-sm max-w-[150px] truncate">{userLocation}</div>
            </div>
          </button>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/20 rounded-lg transition relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-purple-600"></span>
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search for products, stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 text-gray-900 rounded-2xl focus:ring-2 focus:ring-purple-300 shadow-lg outline-none"
          />
          <button className="absolute right-4 top-4 text-gray-400">
            <Filter size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};