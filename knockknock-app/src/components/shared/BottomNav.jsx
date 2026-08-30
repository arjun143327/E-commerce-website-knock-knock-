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
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="glass-nav rounded-3xl p-3 flex justify-around items-center max-w-sm mx-auto shadow-glass border border-white/60 bg-white/70">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className="flex flex-col items-center gap-1 transition-all duration-300 transform active:scale-90 relative group"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-md shadow-indigo-200 -translate-y-1' : 'bg-transparent group-hover:bg-gray-100/80'}`}>
                <Icon 
                  size={24} 
                  className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-indigo-500'}
                />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-[10px] rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold shadow-sm animate-pulse-subtle px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              {isActive && (
                <span className="text-[10px] font-bold text-indigo-600 animate-slide-up absolute -bottom-3">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};