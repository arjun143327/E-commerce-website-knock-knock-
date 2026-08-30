import api from './axios';

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.category && filters.category !== 'All') params.append('category', filters.category);
  if (filters.storeId) params.append('storeId', filters.storeId);

  const response = await api.get(`/products?${params.toString()}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
