import React, { createContext, useContext, useState, useEffect } from 'react';
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
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  console.log('CartProvider user:', user);
  console.log('CartProvider token:', token);

  useEffect(() => {
    if (user && user.id && token) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user, token]);

  const fetchCart = async () => {
    console.log('fetchCart called');
    try {
      const res = await api.get(`/users/${user.id}/cart`);
      console.log('fetchCart response:', res.data);
      console.log('Cart items structure:', res.data.data);
      if (res.data.data && res.data.data.length > 0) {
        console.log('First cart item:', res.data.data[0]);
      }
      setCartItems(res.data.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error.response ? error.response.data : error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    console.log('addToCart called with:', productId, quantity); // Debug log
    try {
      await api.post(
        `/users/${user.id}/cart`,
        { productId, quantity }
      );
      fetchCart();
    } catch (error) {
      console.error('Failed to add to cart:', error.response ? error.response.data : error); // Improved error log
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(
        `/users/${user.id}/cart/${productId}`
      );
      fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error.response ? error.response.data : error);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      await api.put(
        `/users/${user.id}/cart/${productId}`,
        { quantity }
      );
      fetchCart();
    } catch (error) {
      console.error('Failed to update cart quantity:', error.response ? error.response.data : error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};