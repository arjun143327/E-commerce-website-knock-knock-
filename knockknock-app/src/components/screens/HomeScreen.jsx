import React from 'react';
import { Store, TrendingUp, Zap, Clock, Star, Package } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_STORES } from '../../data/stores';
import { MOCK_PRODUCTS } from '../../data/products';
import { OFFERS } from '../../data/constants';
import { Header } from '../shared/Header';
import { CategoryPills } from '../shared/CategoryPills';
import { StoreCard } from '../shared/StoreCard';
import { ProductCard } from '../shared/ProductCard';
import { BottomNav } from '../shared/BottomNav';

export const HomeScreen = ({ cart, onAddToCart, onUpdateQuantity, ordersCount }) => {
  const { selectedStore, setSelectedStore, searchQuery, selectedCategory } = useApp();

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStore = !selectedStore || p.storeId === selectedStore.id;
    return matchesSearch && matchesCategory && matchesStore;
  });

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <CategoryPills />

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
                <StoreCard 
                  key={store.id} 
                  store={store} 
                  onClick={setSelectedStore}
                />
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
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  cartItem={cart.find(item => item.id === product.id)}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav cartCount={cart.length} ordersCount={ordersCount} />
    </div>
  );
};