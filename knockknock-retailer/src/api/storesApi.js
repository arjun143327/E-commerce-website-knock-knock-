import api from './axios';

export const getStores = async () => {
  const response = await api.get('/stores');
  return response.data;
};
