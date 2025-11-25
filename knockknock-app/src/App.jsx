import React, { useState, useEffect } from 'react';
import { Search, MapPin, ShoppingCart, User, Store, Clock, Package, Star, Filter, X, Home, Heart, Bell, TrendingUp, Zap, BadgeCheck, ChevronRight, Tag, Truck, Shield } from 'lucide-react';

// Mock data with enhanced details
const MOCK_STORES = [
  { id: 1, name: "Tech Galaxy", category: "Electronics", distance: "0.8 km", rating: 4.5, reviews: 234, deliveryTime: "10-15 min", image: "🔌", badge: "⚡ Fast" },
  { id: 2, name: "MediCare Plus", category: "Pharmacy", distance: "1.2 km", rating: 4.7, reviews: 567, deliveryTime: "8-12 min", image: "💊", badge: "✓ Verified" },
  { id: 3, name: "Beauty Hub", category: "Beauty", distance: "0.5 km", rating: 4.3, reviews: 189, deliveryTime: "10-15 min", image: "💄", badge: "🔥 Popular" },
  { id: 4, name: "Fashion Point", category: "Fashion", distance: "1.5 km", rating: 4.6, reviews: 412, deliveryTime: "15-20 min", image: "👕", badge: "⭐ Top Rated" }
];

const MOCK_PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro", price: 134900, mrp: 144900, store: "Tech Galaxy", storeId: 1, inStock: true, quantity: 3, category: "Electronics", image: "📱", rating: 4.8, reviews: 2341, discount: 7, badge: "Bestseller" },
  { id: 2, name: "Samsung Galaxy S24", price: 79999, mrp: 89999, store: "Tech Galaxy", storeId: 1, inStock: true, quantity: 5, category: "Electronics", image: "📱", rating: 4.6, reviews: 1876, discount: 11, badge: "Deal" },
  { id: 3, name: "Paracetamol 500mg", price: 15, mrp: 20, store: "MediCare Plus", storeId: 2, inStock: true, quantity: 50, category: "Pharmacy", image: "💊", rating: 4.9, reviews: 567, discount: 25 },
  { id: 4, name: "Lakme Lipstick", price: 450, mrp: 599, store: "Beauty Hub", storeId: 3, inStock: true, quantity: 12, category: "Beauty", image: "💄", rating: 4.5, reviews: 234, discount: 25, badge: "Hot" },
  { id: 5, name: "Levi's Jeans", price: 2999, mrp: 3999, store: "Fashion Point", storeId: 4, inStock: true, quantity: 8, category: "Fashion", image: "👖", rating: 4.7, reviews: 892, discount: 25 },
  { id: 6, name: "Sony Headphones", price: 8999, mrp: 12999, store: "Tech Galaxy", storeId: 1, inStock: false, quantity: 0, category: "Electronics", image: "🎧", rating: 4.4, reviews: 445, discount: 31 },
  { id: 7, name: "AirPods Pro", price: 24999, mrp: 27900, store: "Tech Galaxy", storeId: 1, inStock: true, quantity: 7, category: "Electronics", image: "🎧", rating: 4.9, reviews: 3421, discount: 10, badge: "Bestseller" },
  { id: 8, name: "Vitamin D3 Tablets", price: 299, mrp: 450, store: "MediCare Plus", storeId: 2, inStock: true, quantity: 30, category: "Pharmacy", image: "💊", rating: 4.7, reviews: 234, discount: 34 }
];

const CATEGORIES = [
  { name: "All", icon: "🏪", color: "from-purple-500 to-pink-500" },
  { name: "Electronics", icon: "📱", color: "from-blue-500 to-cyan-500" },
  { name: "Pharmacy", icon: "💊", color: "from-green-500 to-emerald-500" },
  { name: "Beauty", icon: "💄", color: "from-pink-500 to-rose-500" },
  { name: "Fashion", icon: "👕", color: "from-orange-500 to-amber-500" },
  { name: "Personal Care", icon: "🧴", color: "from-violet-500 to-purple-500" }
];

const OFFERS = [
  { title: "First Order", discount: "50% OFF", subtitle: "On orders above ₹500", color: "from-purple-600 to-blue-600" },
  { title: "Free Delivery", discount: "₹0 Fee", subtitle: "On all orders today", color: "from-green-600 to-teal-600" },
];

export default function KnockKnockApp() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userLocation, setUserLocation] = useState('Avadi, Tamil Nadu');
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('login'), 2500);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (showAnimation) {
      setTimeout(() => setShowAnimation(false), 500);
    }
  }, [currentScreen]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
    setShowAnimation(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
    setShowAnimation(true);
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? {...item, cartQuantity: item.cartQuantity + 1} : item
      ));
    } else {
      setCart([...cart, {...product, cartQuantity: 1}]);
    }
  };

  const updateCartQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = item.cartQuantity + change;
        return newQty > 0 ? {...item, cartQuantity: newQty} : item;
      }
      return item;
    }).filter(item => item.cartQuantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
  const cartMRP = cart.reduce((sum, item) => sum + (item.mrp * item.cartQuantity), 0);
  const cartSavings = cartMRP - cartTotal;
  const cartCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStore = !selectedStore || p.storeId === selectedStore.id;
    return matchesSearch && matchesCategory && matchesStore;
  });

  // Splash Screen
  if (currentScreen === 'splash') {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="text-center z-10 animate-pulse">
          <div className="text-8xl mb-6 animate-bounce">🚪</div>
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight">Knock Knock</h1>
          <p className="text-xl text-white font-medium">Lightning-fast retail delivery</p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (currentScreen === 'login' && !isLoggedIn) {
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
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter password"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95 shadow-lg"
              >
                Login
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
  }

  // Signup Screen
  if (currentScreen === 'signup' && !isLoggedIn) {
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
                  placeholder="John Doe"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
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

              <button 
                onClick={handleSignup}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95 shadow-lg"
              >
                Create Account
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
  }

  // Main App (Home Screen)
  if (currentScreen === 'home') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Premium Header */}
        <div className="bg-white shadow-sm">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="flex-shrink-0" />
                <div>
                  <div className="text-xs opacity-90">Delivering to</div>
                  <div className="font-bold text-sm">{userLocation}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/20 rounded-lg transition">
                  <Bell size={20} />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-lg transition">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Enhanced Search */}
            <div className="relative">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search for products, stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-gray-900 rounded-2xl focus:ring-2 focus:ring-purple-300 shadow-lg"
              />
              <button className="absolute right-4 top-4 text-gray-400">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold whitespace-nowrap transition transform active:scale-95 ${
                  selectedCategory === cat.name 
                    ? 'bg-gradient-to-r ' + cat.color + ' text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Offers Banner */}
          {!selectedStore && (
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-orange-500" size={20} />
                <h2 className="font-black text-lg">Today's Offers</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {OFFERS.map((offer, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${offer.color} rounded-2xl p-4 text-white shadow-lg`}>
                    <div className="text-xs font-semibold opacity-90">{offer.title}</div>
                    <div className="text-2xl font-black my-1">{offer.discount}</div>
                    <div className="text-xs opacity-90">{offer.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stores Section */}
          {!selectedStore && (
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Store className="text-purple-600" size={20} />
                  <h2 className="font-black text-lg">Stores Near You</h2>
                </div>
                <button className="text-purple-600 font-bold text-sm">View All →</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {MOCK_STORES.map(store => (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
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
                ))}
              </div>
            </div>
          )}

          {/* Products Section */}
          <div className="px-4 pb-24">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-purple-600" size={20} />
                <h2 className="font-black text-lg">
                  {selectedStore ? `${selectedStore.name}` : 'Popular Products'}
                </h2>
              </div>
              {selectedStore && (
                <button 
                  onClick={() => setSelectedStore(null)}
                  className="text-purple-600 font-bold text-sm"
                >
                  ← Back
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Package size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-semibold">No products found</p>
                <p className="text-sm">Try adjusting your search</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
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
                              {cart.find(item => item.id === product.id) ? (
                                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl px-4 py-2 shadow-lg">
                                  <button 
                                    onClick={() => updateCartQuantity(product.id, -1)}
                                    className="font-bold text-xl w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition"
                                  >
                                    −
                                  </button>
                                  <span className="font-bold min-w-[20px] text-center">
                                    {cart.find(item => item.id === product.id).cartQuantity}
                                  </span>
                                  <button 
                                    onClick={() => updateCartQuantity(product.id, 1)}
                                    className="font-bold text-xl w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => addToCart(product)}
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
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Premium Bottom Navigation */}
        <div className="bg-white border-t shadow-2xl">
          <div className="flex justify-around p-3">
            <button className="flex flex-col items-center gap-1 text-purple-600 transition transform active:scale-90">
              <div className="bg-purple-100 p-2 rounded-xl">
                <Home size={24} />
              </div>
              <span className="text-xs font-bold">Home</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('cart')}
              className="flex flex-col items-center gap-1 text-gray-600 relative transition transform active:scale-90"
            >
              <div className="bg-gray-100 p-2 rounded-xl relative">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold">Cart</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 transition transform active:scale-90">
              <div className="bg-gray-100 p-2 rounded-xl">
                <Package size={24} />
              </div>
              <span className="text-xs font-semibold">Orders</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 transition transform active:scale-90">
              <div className="bg-gray-100 p-2 rounded-xl">
                <User size={24} />
              </div>
              <span className="text-xs font-semibold">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Premium Cart Screen
  if (currentScreen === 'cart') {
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
              <ShoppingCart size={80} className="mx-auto mb-4 text-gray-300" />
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
                            onClick={() => updateCartQuantity(item.id, -item.cartQuantity)}
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
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="font-bold text-xl text-gray-600 w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition"
                            >
                              −
                            </button>
                            <span className="font-bold min-w-[20px] text-center">{item.cartQuantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.id, 1)}
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
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-black text-lg hover:from-purple-700 hover:to-blue-700 transition transform active:scale-95 shadow-lg flex items-center justify-center gap-2">
                <span>Proceed to Checkout</span>
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
  }

  return null;
}