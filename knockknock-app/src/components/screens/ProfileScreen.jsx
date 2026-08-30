import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Heart, CreditCard, Headphones, LogOut, ChevronRight, Wallet, Edit2, Check, X, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../shared/BottomNav';
import { updateProfile } from '../../api/authApi';
import { getWishlist } from '../../api/productsApi';
import { ProductCard } from '../shared/ProductCard';

export const ProfileScreen = ({ cartCount, ordersCount }) => {
  const { logout, userLocation, user, refreshUser } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    phone: user?.phone || '',
    address: user?.address || userLocation
  });
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

  useEffect(() => {
    if (activeTab === 'wishlist') {
      loadWishlist();
    }
  }, [activeTab]);

  const loadWishlist = async () => {
    try {
      setIsLoadingWishlist(true);
      const items = await getWishlist();
      setWishlistItems(items);
    } catch (error) {
      console.error('Failed to load wishlist', error);
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  const menuItems = [
    { icon: Package, label: 'Your Orders', sub: 'Track, return, or buy again' },
    { icon: MapPin, label: 'Addresses', sub: userLocation },
    { icon: Heart, label: 'Wishlist', sub: 'Your favorite items' },
    { icon: CreditCard, label: 'Payment Methods', sub: 'Manage cards & UPI' },
    { icon: Headphones, label: 'Help & Support', sub: 'FAQs & Customer Care' },
  ];

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Profile Header */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {getInitials(user?.name)}
            </div>
            <div>
              <h1 className="text-2xl font-black">{user?.name || 'User'}</h1>
              <p className="text-gray-500">{user?.email || 'No email'}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
          >
            {isEditing ? <X size={20} /> : <Edit2 size={20} />}
          </button>
        </div>

        {/* Wallet Card */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 text-white shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Wallet size={24} className="text-yellow-400" />
            </div>
            <div>
              <div className="text-xs opacity-70">Knock Knock Balance</div>
              <div className="text-xl font-bold">₹{user?.walletBalance?.toLocaleString() || 0}</div>
            </div>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold">
            Top Up
          </button>
        </div>
      </div>

      {/* Menu Grid / Edit Form / Wishlist View */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'wishlist' ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveTab('menu')} className="p-2 hover:bg-gray-200 rounded-full">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">Your Wishlist</h2>
            </div>
            
            {isLoadingWishlist ? (
              <p className="text-center text-gray-500 py-10">Loading your favorites...</p>
            ) : wishlistItems.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Heart size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {wishlistItems.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => {}} // Could be wired to actual addToCart
                  />
                ))}
              </div>
            )}
          </div>
        ) : isEditing ? (
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
              <input 
                type="text" 
                value={editForm.phone}
                onChange={e => setEditForm({...editForm, phone: e.target.value})}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Delivery Address</label>
              <textarea 
                value={editForm.address}
                onChange={e => setEditForm({...editForm, address: e.target.value})}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none h-24 resize-none"
                placeholder="Enter complete delivery address"
              />
            </div>
            <button 
              onClick={async () => {
                setIsSaving(true);
                try {
                  await updateProfile(editForm);
                  await refreshUser();
                  setIsEditing(false);
                } catch (error) {
                  alert('Failed to update profile');
                } finally {
                  setIsSaving(false);
                }
              }}
              disabled={isSaving}
              className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 transition"
            >
              {isSaving ? 'Saving...' : <><Check size={20} /> Save Changes</>}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            {menuItems.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (item.label === 'Wishlist') setActiveTab('wishlist');
                }}
                className="w-full flex items-center p-4 border-b last:border-0 hover:bg-gray-50 transition"
              >
                <div className="bg-purple-50 p-3 rounded-full text-purple-600 mr-4">
                  <item.icon size={20} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-900">{item.label}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[200px]">
                    {item.label === 'Addresses' ? (user?.address || userLocation) : 
                     item.label === 'Help & Support' && user?.phone ? user.phone : item.sub}
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
              </button>
            ))}
          </div>
        )}

        {activeTab === 'menu' && !isEditing && (
          <button 
            onClick={logout}
            className="w-full bg-white text-red-500 p-4 rounded-2xl font-bold shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        )}
        
        <p className="text-center text-xs text-gray-400 mt-6">Version 1.0.0 • Knock Knock Retail</p>
      </div>

      <BottomNav cartCount={cartCount} ordersCount={ordersCount} />
    </div>
  );
};