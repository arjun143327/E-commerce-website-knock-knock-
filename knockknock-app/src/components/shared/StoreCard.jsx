import React from 'react';
import { Clock, Star } from 'lucide-react';

export const StoreCard = ({ store, onClick }) => {
  return (
    <button
      onClick={() => onClick(store)}
      className="bg-white rounded-2xl p-4 text-left shadow-md hover:shadow-xl transition transform active:scale-95"
    >
      <div className="text-4xl mb-2">{store.image}</div>
      <div className="font-bold text-sm mb-1">{store.name}</div>
      <div className="text-xs text-gray-500 mb-2">{store.category}</div>
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="flex items-center gap-1 font-semibold text-green-600">
          <Clock size={12} />
          {store.deliveryTime}
        </span>
        <span className="flex items-center gap-1 font-semibold">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          {store.rating}
        </span>
      </div>
      <div className="inline-block text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
        {store.badge}
      </div>
    </button>
  );
};