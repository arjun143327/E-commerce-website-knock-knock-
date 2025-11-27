import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/constants';

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white">
      {CATEGORIES.map(cat => (
        <button
          key={cat.name}
          onClick={() => setSelectedCategory(cat.name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold whitespace-nowrap transition transform active:scale-95 ${
            selectedCategory === cat.name 
              ? 'bg-gradient-to-r ' + cat.color + ' text-white shadow-lg scale-105' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{cat.icon}</span>
          <span className="text-sm">{cat.name}</span>
        </button>
      ))}
    </div>
  );
};