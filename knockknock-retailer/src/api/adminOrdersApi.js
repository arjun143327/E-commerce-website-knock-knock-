import api from './axios';

export const getAllOrders = async () => {
  const response = await api.get('/orders/all');
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
};
