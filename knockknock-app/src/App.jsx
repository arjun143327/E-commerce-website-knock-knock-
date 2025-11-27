import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { useCart } from './hooks/useCart';
import { useOrders } from './hooks/useOrders';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignupScreen } from './components/screens/SignupScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CartScreen } from './components/screens/CartScreen';
import { OrderSuccessScreen } from './components/screens/OrderSuccessScreen';
import { OrdersHistoryScreen } from './components/screens/OrdersHistoryScreen';

function AppContent() {
  const { currentScreen } = useApp();
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    cartMRP, 
    cartSavings, 
    cartCount 
  } = useCart();
  
  const { 
    orders, 
    currentOrder, 
    setCurrentOrder, 
    createOrder 
  } = useOrders();
  
  const { setCurrentScreen, userLocation } = useApp();

  const handlePlaceOrder = () => {
    const order = createOrder(cart, cartTotal, cartSavings, userLocation);
    clearCart();
    setCurrentScreen('orderSuccess');
  };

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setCurrentScreen('orderSuccess');
  };

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      
      case 'login':
        return <LoginScreen />;
      
      case 'signup':
        return <SignupScreen />;
      
      case 'home':
        return (
          <HomeScreen 
            cart={cart}
            onAddToCart={addToCart}
            onUpdateQuantity={updateQuantity}
            ordersCount={orders.length}
          />
        );
      
      case 'cart':
        return (
          <CartScreen 
            cart={cart}
            onUpdateQuantity={updateQuantity}
            cartTotal={cartTotal}
            cartMRP={cartMRP}
            cartSavings={cartSavings}
            cartCount={cartCount}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      
      case 'orderSuccess':
        return <OrderSuccessScreen order={currentOrder} />;
      
      case 'orders':
        return (
          <OrdersHistoryScreen 
            orders={orders}
            cartCount={cartCount}
            onViewOrder={handleViewOrder}
          />
        );
      
      case 'profile':
        return (
          <div className="h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-black mb-4">Profile Coming Soon!</h1>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold"
              >
                Go Home
              </button>
            </div>
          </div>
        );
      
      default:
        return <SplashScreen />;
    }
  };

  return <div className="app">{renderScreen()}</div>;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;