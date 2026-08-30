import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { getMyOrders, placeOrder as apiPlaceOrder } from '../api/ordersApi';
import { useApp } from '../context/AppContext';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useApp();

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getMyOrders();
      // Map data to expected format if needed
      const mappedOrders = data.map(dbOrder => ({
        id: dbOrder.id,
        items: dbOrder.OrderItems.map(item => ({
          ...item.Product,
          quantity: item.quantity,
          price: item.priceAtPurchase
        })),
        total: dbOrder.total,
        status: dbOrder.status,
        date: new Date(dbOrder.created_at).toLocaleDateString(),
        deliveryEta: dbOrder.status === 'completed' ? 'Delivered' : 'Arriving soon'
      }));
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('orderStatusChanged', ({ orderId, status }) => {
      setOrders(prevOrders => 
        prevOrders.map(o => o.id === orderId ? { ...o, status } : o)
      );
      
      setCurrentOrder(prevCurrent => {
        if (prevCurrent && prevCurrent.id === orderId) {
          return { ...prevCurrent, status };
        }
        return prevCurrent;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createOrder = async (cart, total, savings, address, paymentMethod) => {
    try {
      const orderData = {
        items: cart,
        total,
        savings,
        address,
        paymentMethod: paymentMethod || 'Cash on Delivery'
      };
      
      const response = await apiPlaceOrder(orderData);
      
      // Update local state by refetching from server
      await fetchOrders();
      
      const newOrder = {
        id: response.order.id,
        items: cart,
        total,
        status: 'pending',
        date: new Date().toLocaleDateString(),
        deliveryEta: '10-15 mins'
      };
      
      setCurrentOrder(newOrder);
      return newOrder;
    } catch (error) {
      console.error('Failed to place order:', error);
      throw error;
    }
  };

  return {
    orders,
    currentOrder,
    setCurrentOrder,
    createOrder,
    loading
  };
};