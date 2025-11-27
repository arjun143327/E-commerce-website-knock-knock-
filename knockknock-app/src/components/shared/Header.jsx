import React from 'react';
import { MapPin, Bell, Heart, Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { userLocation, searchQuery, setSearchQuery } = useApp();

  return (
    <div className="bg-white shadow-sm">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="flex-shrink-0" />
            <div>
              <div className="text-xs opacity-90">Delivering to</div>
              <div className="font-bold text-sm">{userLocation}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/20 rounded-lg transition">
              <Bell size={20} />
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
            className="w-full pl-12 pr-12 py-4 text-gray-900 rounded-2xl focus:ring-2 focus:ring-purple-300 shadow-lg"
          />
          <button className="absolute right-4 top-4 text-gray-400">
            <Filter size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};