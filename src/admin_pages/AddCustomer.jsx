import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/AddCustomer.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    postalCode: ''
  });
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.password) {
        setError('Name, email, and password are required');
        setLoading(false);
        return;
      }
      
      // Validate password length
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      // Create user object
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: false // Ensure this is a regular customer, not an admin
      };

      // Get token for authorization
      const token = localStorage.getItem('access_token');
      
      // Send request to create user
      const response = await axios.post('http://localhost:5001/api/users', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Customer added successfully!');
      navigate('/admin/customers');
    } catch (err) {
      console.error('Error adding customer:', err);
      setError(err.response?.data?.message || 'Failed to add customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        {/* Add Customer Form */}
        <div className="add-customer-container">
          <h2>Add New Customer</h2>
          {error && <div className="error-message">{error}</div>}
          <form className="form-container" onSubmit={handleSubmit}>
            <label>Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="Input full name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="Input email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Set password for customer" 
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <label>Contact</label>
            <input 
              type="text" 
              name="phone"
              placeholder="Contact number" 
              value={formData.phone}
              onChange={handleChange}
            />
            
            <div className="row">
              <div className="col">
                <label>Membership status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="col">
                <label>Postal code</label>
                <input 
                  type="text" 
                  name="postalCode"
                  placeholder="Postal code" 
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <label>Address</label>
            <input 
              type="text" 
              name="address"
              placeholder="Input address" 
              value={formData.address}
              onChange={handleChange}
            />
            
            <button 
              type="submit" 
              className="save-customer-btn" 
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Save Customer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;