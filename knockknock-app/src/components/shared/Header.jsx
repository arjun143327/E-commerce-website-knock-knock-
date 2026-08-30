import React from 'react';
import { MapPin, Bell, Heart, Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { userLocation, searchQuery, setSearchQuery, sortBy, setSortBy, setCurrentScreen } = useApp();

  return (
    <div className="glass-header z-20">
      <div className="p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          
          {/* CLICKABLE LOCATION */}
          <button 
            onClick={() => setCurrentScreen('locationMap')}
            className="flex items-center gap-2 hover:bg-gray-100/50 p-2 -ml-2 rounded-2xl transition cursor-pointer text-left"
          >
            <div className="bg-white/80 shadow-glass p-2 rounded-full backdrop-blur-md">
              <MapPin size={20} className="text-indigo-600" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                Delivering to <span className="text-[8px] bg-gray-200/50 px-1 rounded text-gray-600">▼</span>
              </div>
              <div className="font-bold text-sm text-gray-800 max-w-[150px] truncate">{userLocation}</div>
            </div>
          </button>

          {/* BRAND MARK */}
          <div className="flex-1 flex justify-center items-center font-black text-xl tracking-tight text-gray-800 animate-float">
            <span className="text-indigo-600 mr-1">⚡</span> ASHY
          </div>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100/50 rounded-xl transition relative text-gray-600">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-pulse-subtle"></span>
            </button>
          </div>
        </div>

        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search for groceries, electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 focus:ring-2 focus:ring-indigo-200 shadow-glass outline-none transition-all"
            />
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/60 backdrop-blur-md border border-white/40 text-gray-900 rounded-2xl px-4 py-4 shadow-glass outline-none cursor-pointer focus:ring-2 focus:ring-indigo-200 transition-all font-medium text-sm"
          >
            <option value="">Sort</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};