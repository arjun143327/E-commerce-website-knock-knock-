import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Banknote, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentScreen = ({ cartTotal, cartSavings, onPaymentComplete }) => {
  const { setCurrentScreen } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(); // Triggers the order creation in App.jsx
    }, 2000);
  };

  const methods = [
    { id: 'upi', icon: Wallet, label: 'UPI (GPay, PhonePe)', sub: 'Fastest' },
    { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Secure' },
    { id: 'cod', icon: Banknote, label: 'Cash on Delivery', sub: 'Pay at door' },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3">
        <button onClick={() => setCurrentScreen('cart')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Payment</h1>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Amount Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-1">Total Amount to Pay</div>
          <div className="text-4xl font-black">₹{cartTotal.toLocaleString()}</div>
          {cartSavings > 0 && (
            <div className="mt-2 text-sm bg-white/20 inline-block px-3 py-1 rounded-lg">
              You saved ₹{cartSavings} on this order!
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="font-bold text-lg mb-3">Select Payment Method</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center p-4 border-b last:border-0 transition ${
                  selectedMethod === method.id ? 'bg-purple-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`p-3 rounded-full mr-4 ${
                  selectedMethod === method.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  <method.icon size={24} />
                </div>
                <div className="flex-1 text-left">
                  <div className={`font-bold ${selectedMethod === method.id ? 'text-purple-900' : 'text-gray-900'}`}>
                    {method.label}
                  </div>
                  <div className="text-xs text-gray-500">{method.sub}</div>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle2 className="text-purple-600" size={24} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Banner */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <ShieldCheck size={16} />
          <span>100% Secure Payments with 256-bit Encryption</span>
        </div>
      </div>

      {/* Pay Button */}
      <div className="p-4 bg-white border-t">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 transition transform active:scale-95 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>Processing...</>
          ) : (
            <>
              <span>Pay ₹{cartTotal.toLocaleString()}</span>
              <ChevronRight size={24} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};