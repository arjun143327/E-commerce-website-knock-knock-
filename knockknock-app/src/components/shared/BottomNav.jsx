import React from 'react';
import { Home, ShoppingCart, Package, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav = ({ cartCount, ordersCount }) => {
  const { currentScreen, setCurrentScreen } = useApp();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { id: 'orders', icon: Package, label: 'Orders', badge: ordersCount },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="bg-white border-t shadow-2xl">
      <div className="flex justify-around p-3">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className="flex flex-col items-center gap-1 transition transform active:scale-90 relative"
            >
              <div className={`p-2 rounded-xl ${isActive ? 'bg-purple-100' : 'bg-gray-100'}`}>
                <Icon 
                  size={24} 
                  className={isActive ? 'text-purple-600' : 'text-gray-600'}
                />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'font-bold text-purple-600' : 'font-semibold text-gray-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};