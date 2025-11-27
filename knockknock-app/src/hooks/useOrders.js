import { useState } from 'react';
import { generateOrderId } from '../utils/formatters';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const createOrder = (cart, total, savings, userLocation) => {
    const newOrder = {
      id: generateOrderId(),
      items: [...cart],
      total: total,
      savings: savings,
      status: 'placed',
      timestamp: new Date().toISOString(),
      deliveryAddress: userLocation,
      deliveryPerson: {
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        rating: 4.8,
        vehicle: "Bike"
      }
    };
    
    setOrders([newOrder, ...orders]);
    setCurrentOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status} : order
    ));
    if (currentOrder?.id === orderId) {
      setCurrentOrder({...currentOrder, status});
    }
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  return {
    orders,
    currentOrder,
    setCurrentOrder,
    createOrder,
    updateOrderStatus,
    getOrderById
  };
};