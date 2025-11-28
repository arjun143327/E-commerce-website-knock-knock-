import React from 'react';
import { User, Package, MapPin, Heart, CreditCard, Headphones, LogOut, ChevronRight, Wallet } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../shared/BottomNav';

export const ProfileScreen = ({ cartCount, ordersCount }) => {
  const { logout, userLocation } = useApp();

  const menuItems = [
    { icon: Package, label: 'Your Orders', sub: 'Track, return, or buy again' },
    { icon: MapPin, label: 'Addresses', sub: userLocation },
    { icon: Heart, label: 'Wishlist', sub: 'Your favorite items' },
    { icon: CreditCard, label: 'Payment Methods', sub: 'Manage cards & UPI' },
    { icon: Headphones, label: 'Help & Support', sub: 'FAQs & Customer Care' },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Profile Header */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            JD
          </div>
          <div>
            <h1 className="text-2xl font-black">John Doe</h1>
            <p className="text-gray-500">+91 98765 43210</p>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 text-white shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Wallet size={24} className="text-yellow-400" />
            </div>
            <div>
              <div className="text-xs opacity-70">Knock Knock Balance</div>
              <div className="text-xl font-bold">₹0.00</div>
            </div>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold">
            Top Up
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {menuItems.map((item, idx) => (
            <button key={idx} className="w-full flex items-center p-4 border-b last:border-0 hover:bg-gray-50 transition">
              <div className="bg-purple-50 p-3 rounded-full text-purple-600 mr-4">
                <item.icon size={20} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.sub}</div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </button>
          ))}
        </div>

        <button 
          onClick={logout}
          className="w-full bg-white text-red-500 p-4 rounded-2xl font-bold shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-6">Version 1.0.0 • Knock Knock Retail</p>
      </div>

      <BottomNav cartCount={cartCount} ordersCount={ordersCount} />
    </div>
  );
};