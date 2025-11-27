import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, MapPin, Clock, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrderSuccessScreen = ({ order }) => {
  const { setCurrentScreen, userLocation } = useApp();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              {['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      {/* Close Button */}
      <div className="p-4 flex justify-end">
        <button 
          onClick={() => setCurrentScreen('home')}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Success Animation */}
          <div className="text-center mb-8 animate-pulse">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <CheckCircle size={80} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">Order Placed!</h1>
            <p className="text-xl text-gray-600 mb-2">Thank you for your order</p>
            <p className="text-gray-500">We'll notify you when it's ready</p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-100">
              <div>
                <div className="text-sm text-gray-500">Order ID</div>
                <div className="font-bold text-lg">{order?.id}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="font-black text-2xl text-green-600">₹{order?.total.toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Package className="text-purple-600" size={20} />
                <span className="text-gray-600">{order?.items.length} items</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="text-purple-600" size={20} />
                <span className="text-gray-600">Delivering to {userLocation}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="text-purple-600" size={20} />
                <span className="text-gray-600">Expected: 10-15 minutes</span>
              </div>
            </div>

            {order?.savings > 0 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-center">
                <span className="text-green-700 font-bold">
                  🎉 You saved ₹{order.savings.toLocaleString()} on this order!
                </span>
              </div>
            )}
          </div>

          {/* Order Items Summary */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            <h3 className="font-black text-lg mb-4">Your Items</h3>
            <div className="space-y-2">
              {order?.items.map(item => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.image}</span>
                    <span className="text-gray-700">{item.name} x{item.cartQuantity}</span>
                  </div>
                  <span className="font-bold">₹{(item.price * item.cartQuantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => setCurrentScreen('orders')}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95 shadow-lg"
            >
              View My Orders
            </button>

            <button 
              onClick={() => setCurrentScreen('home')}
              className="w-full bg-white text-purple-600 py-4 rounded-xl font-bold text-lg border-2 border-purple-600 hover:bg-purple-50 transition transform active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};