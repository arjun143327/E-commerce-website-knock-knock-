import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/constants';

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="flex gap-2 px-4 py-4 overflow-x-auto bg-transparent hide-scrollbar">
      {CATEGORIES.map(cat => (
        <button
          key={cat.name}
          onClick={() => setSelectedCategory(cat.name)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 transform active:scale-95 ${
            selectedCategory === cat.name 
              ? 'bg-indigo-600 text-white shadow-glass scale-105 ring-2 ring-indigo-200 ring-offset-2 ring-offset-gray-50' 
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-100 hover:border-indigo-200'
          }`}
        >
          <span>{cat.icon}</span>
          <span className="text-sm">{cat.name}</span>
        </button>
      ))}
    </div>
  );
};