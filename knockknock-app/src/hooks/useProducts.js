import { useState, useEffect } from 'react';
import { getProducts } from '../api/productsApi';
import { useApp } from '../context/AppContext';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, selectedCategory, selectedStore } = useApp();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const filters = {
          search: searchQuery,
          category: selectedCategory,
          storeId: selectedStore?.id
        };
        const data = await getProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategory, selectedStore]);

  return { products, loading };
};
