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

// NEW SCREENS IMPORT
import { LocationMapScreen } from './components/screens/LocationMapScreen';
import { PaymentScreen } from './components/screens/PaymentScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

function AppContent() {
  // FIX: Combined all useApp values into one line here
  const { currentScreen, setCurrentScreen, userLocation } = useApp();
  
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

  // Logic to handle payment completion
  const handlePaymentComplete = () => {
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
            // MODIFIED: Navigate to Payment instead of placing order immediately
            onPlaceOrder={() => setCurrentScreen('payment')} 
          />
        );

      // NEW ROUTE: PAYMENT
      case 'payment':
        return (
          <PaymentScreen 
            cartTotal={cartTotal}
            cartSavings={cartSavings}
            onPaymentComplete={handlePaymentComplete}
          />
        );

      // NEW ROUTE: LOCATION MAP
      case 'locationMap':
        return <LocationMapScreen />;

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
      
      // NEW ROUTE: PROFILE
      case 'profile':
        return (
          <ProfileScreen 
            cartCount={cartCount} 
            ordersCount={orders.length} 
          />
        );
      
      default:
        return <SplashScreen />;
    }
  };

  return <div className="app font-sans text-gray-900">{renderScreen()}</div>;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;