import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Checkout.css';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Nepal',
    paymentMethod: 'cod'
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate cart is not empty
    if (!cartItems || cartItems.length === 0) {
      setError('Your cart is empty');
      setLoading(false);
      return;
    }

    // Validate form data
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        setLoading(false);
        return;
      }
    }

    try {
      // Submit order to backend
      const response = await api.post('/orders', {
        ...formData,
        userId: user.id
      });

      // Redirect to success page or dashboard
      alert('Order placed successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total amount
  const getSubtotal = (item) => {
    const price = item.Product?.price || 0;
    const quantity = item.quantity || 1;
    return price * quantity;
  };
  const getTotal = () => cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);

  return (
    <div className="checkout-page">
      <Header />
      <div className="checkout-container">
        <h2>Checkout</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            First Name
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address
            <input 
              type="text" 
              name="address" 
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City
            <input 
              type="text" 
              name="city" 
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            State
            <input 
              type="text" 
              name="state" 
              value={formData.state}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            ZIP Code
            <input 
              type="text" 
              name="zip" 
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Country
            <input 
              type="text" 
              name="country" 
              value={formData.country}
              onChange={handleChange}
              required
            />
          </label>
          <fieldset>
            <legend>Payment Method</legend>
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="cod" 
                checked={formData.paymentMethod === 'cod'}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
          </fieldset>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.map((item) => (
              <div className="order-item" key={item.id}>
                <span>{item.Product?.productName} x {item.quantity}</span>
                <span>₹{getSubtotal(item)}</span>
              </div>
            ))}
            <div className="order-total">
              <span>Total:</span>
              <span>₹{getTotal()}</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
