import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Customer.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all users from the backend
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:5001/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Filter out admin users
      const nonAdminUsers = response.data.data.filter(user => !user.isAdmin);
      setCustomers(nonAdminUsers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customers. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle customer deletion
  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(`http://localhost:5001/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update the customers list after deletion
        setCustomers(customers.filter(customer => customer.id !== id));
        alert('Customer deleted successfully');
      } catch (err) {
        console.error('Error deleting customer:', err);
        alert('Failed to delete customer. Please try again.');
      }
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    const searchValue = searchTerm.toLowerCase();
    return (
      customer.id.toString().includes(searchValue) ||
      customer.name.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue)
    );
  });


  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="customer-section">
          <h2>Customer</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="search-bar-container">
            <input 
              type="text" 
              placeholder="Search for id, name, or email" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button className="add-customer-btn" onClick={() => navigate('/admin/addcustomer')}>
            Add Customer <i className="fas fa-plus"></i>
          </button>
          
          {loading ? (
            <div className="loading">Loading customers...</div>
          ) : (
            <table className="customers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center' }}>
                      {searchTerm ? 'No customers match your search' : 'No customers found'}
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="customer-name-id">
                          <span style={{ color: '#d9534f', fontWeight: '600' }}>
                            ID{customer.id}
                          </span>
                        </div>
                      </td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td className="action-buttons">
                        <button title="View" onClick={() => alert(`Viewing customer ${customer.name}`)}>
                          <i className="fas fa-eye"></i>
                        </button>
                        <button title="Edit" onClick={() => navigate(`/admin/editcustomer/${customer.id}`)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button title="Delete" onClick={() => handleDeleteCustomer(customer.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customer;