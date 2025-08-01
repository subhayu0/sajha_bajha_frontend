import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:5001/api'
});

// Add a request interceptor to automatically add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Function to refresh products from the backend
  const refreshProducts = async () => {
    console.log('=== PRODUCT CONTEXT: Refreshing products ===');
    try {
      const res = await api.get('/product');
      console.log('=== PRODUCT CONTEXT: Successfully refreshed products ===');
      console.log('Response data:', res.data);
      console.log('Products array:', res.data.data);
      setProducts(res.data.data);
      return res.data.data;
    } catch (err) {
      console.error("=== PRODUCT CONTEXT: Failed to refresh products ===", err);
      console.error("Error details:", err.response?.data || err.message);
      return [];
    }
  };

  // Fetch products from backend on mount
  React.useEffect(() => {
    refreshProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      console.log('=== PRODUCT CONTEXT: Adding product ===');
      console.log('Product to add:', product);
      const res = await api.post('/product', product);
      console.log('=== PRODUCT CONTEXT: Successfully added product ===');
      console.log('Response:', res.data);
      setProducts(prev => {
        const newProducts = [...prev, res.data.data];
        console.log('Updated products array:', newProducts);
        return newProducts;
      });
      return res.data.data;
    } catch (error) {
      console.error('=== PRODUCT CONTEXT: Failed to add product ===', error);
      console.error('Error details:', error.response?.data || error.message);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
};