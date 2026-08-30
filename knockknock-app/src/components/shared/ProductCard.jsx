import React, { useState } from 'react';
import { Star, BadgeCheck, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductDetailsModal } from './ProductDetailsModal';

export const ProductCard = ({ product, onAddToCart, cartItem, onUpdateQuantity }) => {
  const { wishlistIds, toggleWishlist } = useApp();
  const isWishlisted = wishlistIds.includes(product.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div 
      onClick={() => setIsModalOpen(true)}
      className="glass-card rounded-3xl hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.15)] transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      <div className="p-4">
        <div className="flex gap-4">
          <div className="w-28 h-28 flex-shrink-0 bg-gradient-light rounded-2xl overflow-hidden flex items-center justify-center text-6xl relative">
            {product.image?.startsWith('/') ? (
              <img src={`http://localhost:3001${product.image}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <span className="group-hover:scale-110 transition-transform duration-500">{product.image || '📦'}</span>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
              className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-glass hover:bg-white transition-all opacity-0 group-hover:opacity-100 lg:opacity-100 z-10"
            >
              <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-2">{product.store}</p>
              </div>
              {product.badge && (
                <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-sm">
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
              <span className="text-sm font-semibold text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{product.discount}% OFF</span>
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
                      onClick={(e) => { e.stopPropagation(); onUpdateQuantity(product.id, -1); }}
                      className="font-bold text-xl w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition"
                    >
                      −
                    </button>
                    <span className="font-bold min-w-[20px] text-center">
                      {cartItem.cartQuantity}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateQuantity(product.id, 1); }}
                      className="font-bold text-xl w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
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

      <ProductDetailsModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

