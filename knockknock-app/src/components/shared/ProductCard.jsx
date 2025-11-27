import React from 'react';
import { Star, BadgeCheck } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, cartItem, onUpdateQuantity }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="p-4">
        <div className="flex gap-4">
          <div className="text-6xl flex-shrink-0">{product.image}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-base mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.store}</p>
              </div>
              {product.badge && (
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold whitespace-nowrap">
                  {product.badge}
                </span>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                <Star size={12} className="fill-white" />
                {product.rating}
              </div>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
              <span className="text-sm font-bold text-green-600">{product.discount}% OFF</span>
            </div>

            {/* Stock & Action */}
            {product.inStock ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                  <BadgeCheck size={14} />
                  <span>{product.quantity} left</span>
                </div>
                {cartItem ? (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl px-4 py-2 shadow-lg">
                    <button 
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="font-bold text-xl w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition"
                    >
                      −
                    </button>
                    <span className="font-bold min-w-[20px] text-center">
                      {cartItem.cartQuantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="font-bold text-xl w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95 shadow-lg"
                  >
                    Add
                  </button>
                )}
              </div>
            ) : (
              <div className="text-sm text-red-600 font-bold">Out of Stock</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};