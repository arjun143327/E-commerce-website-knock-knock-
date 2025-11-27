import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, cartQuantity: item.cartQuantity + 1} 
          : item
      ));
    } else {
      setCart([...cart, {...product, cartQuantity: 1}]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = item.cartQuantity + change;
        return newQty > 0 ? {...item, cartQuantity: newQty} : item;
      }
      return item;
    }).filter(item => item.cartQuantity > 0));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
  };

  const getCartMRP = () => {
    return cart.reduce((sum, item) => sum + (item.mrp * item.cartQuantity), 0);
  };

  const getCartSavings = () => {
    return getCartMRP() - getCartTotal();
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.cartQuantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal: getCartTotal(),
    cartMRP: getCartMRP(),
    cartSavings: getCartSavings(),
    cartCount: getCartCount()
  };
};