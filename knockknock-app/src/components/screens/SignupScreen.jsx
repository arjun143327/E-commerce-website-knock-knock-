import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { register as apiRegister } from '../../api/authApi';

export const SignupScreen = () => {
  const { setCurrentScreen } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiRegister(name, email, password);
      setCurrentScreen('login');
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map(e => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col overflow-auto">
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚪</div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Join Knock Knock</h1>
            <p className="text-gray-600">Get your first order at 50% OFF!</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="john@example.com"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create strong password"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Address</label>
              <input 
                type="text" 
                placeholder="Enter your address"
                defaultValue={userLocation}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

            <button 
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95 shadow-lg disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setCurrentScreen('login')}
              className="text-purple-600 font-bold"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};