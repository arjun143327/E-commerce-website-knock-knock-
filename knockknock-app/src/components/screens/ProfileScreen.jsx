import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Heart, CreditCard, Headphones, LogOut, ChevronRight, Wallet, Edit2, Check, X, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../shared/BottomNav';
import { updateProfile } from '../../api/authApi';
import { getWishlist } from '../../api/productsApi';
import { getAddresses, addAddress, deleteAddress } from '../../api/addressApi';
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
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ title: '', addressString: '' });
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    if (activeTab === 'wishlist') {
      loadWishlist();
    } else if (activeTab === 'addresses') {
      loadAddresses();
    }
  }, [activeTab]);

  const loadAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Failed to load addresses', error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await addAddress(newAddress);
      setNewAddress({ title: '', addressString: '' });
      setIsAddingAddress(false);
      loadAddresses();
    } catch (error) {
      console.error('Failed to add address', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      loadAddresses();
    } catch (error) {
      console.error('Failed to delete address', error);
    }
  };

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
        ) : activeTab === 'addresses' ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveTab('menu')} className="p-2 hover:bg-gray-200 rounded-full">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">Saved Addresses</h2>
            </div>

            {isAddingAddress ? (
              <form onSubmit={handleAddAddress} className="bg-white p-4 rounded-xl shadow-sm mb-4 space-y-3">
                <input 
                  type="text" 
                  placeholder="e.g. Home, Office" 
                  value={newAddress.title}
                  onChange={e => setNewAddress({...newAddress, title: e.target.value})}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
                <textarea 
                  placeholder="Complete Address" 
                  value={newAddress.addressString}
                  onChange={e => setNewAddress({...newAddress, addressString: e.target.value})}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-24 resize-none"
                  required
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsAddingAddress(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700">
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <button 
                onClick={() => setIsAddingAddress(true)}
                className="w-full bg-purple-50 text-purple-600 border border-purple-200 border-dashed py-4 rounded-xl font-bold mb-4 hover:bg-purple-100 transition"
              >
                + Add New Address
              </button>
            )}

            <div className="space-y-3">
              {addresses.map(addr => (
                <div key={addr.id} className="bg-white p-4 rounded-xl shadow-sm flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{addr.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{addr.addressString}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="text-red-500 p-2 hover:bg-red-50 rounded-full"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              {addresses.length === 0 && !isAddingAddress && (
                <div className="text-center py-10 text-gray-400">
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No saved addresses</p>
                </div>
              )}
            </div>
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
                  if (item.label === 'Addresses') setActiveTab('addresses');
                }}
                className="w-full flex items-center p-4 border-b last:border-0 hover:bg-gray-50 transition"
              >
                <div className="bg-purple-50 p-3 rounded-full text-purple-600 mr-4">
                  <item.icon size={20} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-900">{item.label}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[200px]">
                    {item.label === 'Addresses' ? (addresses.length > 0 ? `${addresses.length} saved` : userLocation) : 
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