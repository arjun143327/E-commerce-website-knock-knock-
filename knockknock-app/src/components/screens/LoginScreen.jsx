import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { login as apiLogin } from '../../api/authApi';

export const LoginScreen = () => {
  const { login, setCurrentScreen } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚪</div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Login to start shopping</p>
          </div>
          
          <div className="space-y-4">
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
                placeholder="Enter password"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

            <button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95 shadow-lg disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield size={16} />
              <span>Secure & encrypted</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setCurrentScreen('signup')}
              className="text-purple-600 font-bold text-lg"
            >
              New here? Create Account →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};