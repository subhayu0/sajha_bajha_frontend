import React, { useState, useEffect } from 'react';
import '../style/AdminOrder.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import axios from 'axios';

const AdminOrder = () => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderCounts, setOrderCounts] = useState({
    all: 0,
    pending: 0,
    shipping: 0,
    completed: 0,
    cancelled: 0
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders');
      const ordersData = response.data.data;
      setOrders(ordersData);
      
      // Count orders by status
      const counts = {
        all: ordersData.length,
        pending: ordersData.filter(order => order.status === 'Pending').length,
        shipping: ordersData.filter(order => order.status === 'Shipping').length,
        completed: ordersData.filter(order => order.status === 'Completed').length,
        cancelled: ordersData.filter(order => order.status === 'Cancelled').length
      };
      setOrderCounts(counts);
      
      // Initialize filtered orders with all orders
      setFilteredOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    
    // Filter orders based on the selected tab
    if (tab === 'All Orders') {
      setFilteredOrders(orders);
    } else {
      const status = tab.split(' ')[0]; // Extract status from tab name
      const filtered = orders.filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      // If search term is empty, show orders based on active tab
      handleTabClick(activeTab);
      return;
    }
    
    // Filter orders based on search term and active tab
    let filtered = orders;
    if (activeTab !== 'All Orders') {
      const status = activeTab.split(' ')[0];
      filtered = orders.filter(order => order.status === status);
    }
    
    // Further filter by search term
    filtered = filtered.filter(order => 
      order.id.toString().includes(term) || 
      order.firstName.toLowerCase().includes(term.toLowerCase()) || 
      order.lastName.toLowerCase().includes(term.toLowerCase()) ||
      order.email.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      fetchOrders(); // Refresh orders after status change
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        {/* Removed individual Topbar instance as per request */}
        <div className="orders-section" style={{ backgroundColor: '#54548B', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', color: 'white' }}>
          <h2 style={{ marginBottom: '20px' }}>Orders</h2>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search for order ID, customer name or email"
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: '100%',
                padding: '10px 15px',
                borderRadius: '20px',
                border: 'none',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
            <button style={{ position: 'relative', left: '-35px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: '#f8f9fa', borderRadius: '20px', color: '#54548B' }}>
            {[
              `All Orders (${orderCounts.all})`, 
              `Pending (${orderCounts.pending})`, 
              `Shipping (${orderCounts.shipping})`, 
              `Completed (${orderCounts.completed})`, 
              `Cancelled (${orderCounts.cancelled})`
            ].map((tab) => (
              <div
                key={tab}
                onClick={() => handleTabClick(tab.split(' ')[0] + ' Orders')}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px 0',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  backgroundColor: activeTab === (tab.split(' ')[0] + ' Orders') ? '#2E227B' : 'transparent',
                  color: activeTab === (tab.split(' ')[0] + ' Orders') ? 'white' : '#54548B',
                  border: '1px solid #2E227B',
                  userSelect: 'none'
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Loading orders...</div>
          ) : error ? (
            <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>
          ) : filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>No orders found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#212529' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td>
                      <a href="#" style={{ color: '#2E227B', fontWeight: '600', textDecoration: 'none' }}>#{order.id}</a>
                    </td>
                    <td>
                      <div>{order.firstName} {order.lastName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>{order.email}</div>
                    </td>
                    <td>
                      {order.OrderItems && order.OrderItems.length > 0 ? (
                        <div>
                          {order.OrderItems.slice(0, 2).map((item, idx) => (
                            <div key={idx}>
                              {item.Product?.productName} x {item.quantity}
                            </div>
                          ))}
                          {order.OrderItems.length > 2 && (
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>+{order.OrderItems.length - 2} more items</div>
                          )}
                        </div>
                      ) : (
                        <div>No items</div>
                      )}
                    </td>
                    <td>₹{order.totalAmount}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      <span style={{
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        backgroundColor: 
                          order.status === 'Pending' ? '#fff3cd' :
                          order.status === 'Shipping' ? '#d6c9f9' :
                          order.status === 'Completed' ? '#d1e7dd' :
                          '#f9d6d6',
                        color: 
                          order.status === 'Pending' ? '#856404' :
                          order.status === 'Shipping' ? '#6a4ed6' :
                          order.status === 'Completed' ? '#0f5132' :
                          '#d66a6a'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <select 
                          value={order.status} 
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ddd'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
