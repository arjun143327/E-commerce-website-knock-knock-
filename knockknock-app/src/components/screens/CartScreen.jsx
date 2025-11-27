import React from 'react';
import { X, Truck, Tag, ChevronRight, Package, Shield, BadgeCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartScreen = ({ cart, onUpdateQuantity, cartTotal, cartMRP, cartSavings, cartCount, onPlaceOrder }) => {
  const { setCurrentScreen, userLocation } = useApp();

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black">My Cart</h1>
            <p className="text-sm opacity-90">{cartCount} items</p>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto p-4">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <Package size={80} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to get started!</p>
            <button 
              onClick={() => setCurrentScreen('home')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {/* Delivery Info Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <Truck size={32} />
                <div>
                  <div className="font-bold text-lg">Free Delivery</div>
                  <div className="text-sm opacity-90">Estimated delivery in 10-15 mins</div>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className="text-5xl flex-shrink-0">{item.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-500">{item.store}</p>
                        </div>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -item.cartQuantity)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-black">₹{(item.price * item.cartQuantity).toLocaleString()}</span>
                        <span className="text-xs text-gray-400 line-through">₹{(item.mrp * item.cartQuantity).toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-green-600 font-semibold">
                          Save ₹{((item.mrp - item.price) * item.cartQuantity).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="font-bold text-xl text-gray-600 w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition"
                          >
                            −
                          </button>
                          <span className="font-bold min-w-[20px] text-center">{item.cartQuantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="font-bold text-xl text-gray-600 w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Apply Coupon */}
            <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-dashed border-purple-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Tag className="text-purple-600" size={24} />
                  <div>
                    <div className="font-bold">Apply Coupon</div>
                    <div className="text-xs text-gray-500">Save extra on this order</div>
                  </div>
                </div>
                <ChevronRight className="text-purple-600" size={20} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Section */}
      {cart.length > 0 && (
        <div className="bg-white border-t-4 border-purple-600 shadow-2xl">
          <div className="p-4">
            {/* Bill Details */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Package className="text-purple-600" size={20} />
                <h3 className="font-black text-lg">Bill Details</h3>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Item Total</span>
                <span className="font-semibold">₹{cartMRP.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-semibold text-green-600">−₹{cartSavings.toLocaleString()}</span>
              </div>
              <div className="border-t-2 border-dashed pt-2 mt-2 flex justify-between">
                <span className="font-black text-lg">To Pay</span>
                <span className="font-black text-2xl text-purple-600">₹{cartTotal.toLocaleString()}</span>
              </div>
              {cartSavings > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                  <span className="text-green-700 font-bold text-sm">
                    🎉 You're saving ₹{cartSavings.toLocaleString()} on this order!
                  </span>
                </div>
              )}
            </div>

            {/* Checkout Button */}
            <button 
              onClick={onPlaceOrder}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-black text-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <span>Place Order</span>
              <ChevronRight size={24} />
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield size={14} />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck size={14} />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <BadgeCheck size={14} />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};