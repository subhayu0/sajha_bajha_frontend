import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../style/AdminDashboard.css';
import AdminOrder from './AdminOrder';
import Customer from './Customer';
import AdminProduct from './AdminProduct';
import AddProduct from './AddProduct';
import AddCustomer from './AddCustomer';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import EditProduct from './EditProduct';
import ContactMessages from './ContactMessages';
import api from '../context/api';

// Dashboard Home Component with Charts and Statistics
const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersByStatus, setOrdersByStatus] = useState({});

  // Using the imported api instance from '../context/api'

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard/stats');
        setStats({
          totalSales: res.data.totalSales,
          totalOrders: res.data.totalOrders,
          totalCustomers: res.data.totalCustomers,
          totalProducts: res.data.totalProducts,
        });
        // Prepare category data for pie chart
        const totalCount = res.data.productCategoryCounts.reduce((sum, item) => sum + item.count, 0);
        const colors = ['#2E227B', '#54548B', '#7B6BA8', '#A294C4', '#B0A8D3', '#C1B9E0'];
        const catData = res.data.productCategoryCounts.map((item, index) => ({
          category: item.category,
          percentage: ((item.count / totalCount) * 100).toFixed(1),
          color: colors[index % colors.length],
        }));
        setCategoryData(catData);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    // Fetch recent orders
    const fetchRecentOrders = async () => {
      try {
        const res = await api.get('/orders'); // Assuming this is the getAllOrders API
        setRecentOrders(res.data.data.slice(0, 5)); // Show top 5 recent orders
        // Calculate orders by status for new graph
        const statusCounts = res.data.data.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});
        setOrdersByStatus(statusCounts);
      } catch (error) {
        console.error('Failed to fetch recent orders:', error);
      }
    };

    fetchStats();
    fetchRecentOrders();
  }, []);

  // New graph: Orders by status
  const statusColors = {
    Pending: '#FFA500',
    Shipping: '#1E90FF',
    Completed: '#32CD32',
    Cancelled: '#FF4500',
  };

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon sales">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-info">
            <h3>Rs. {stats.totalSales.toLocaleString()}</h3>
            <p>Total Sales</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
            <span className="stat-change positive">+8.2%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalCustomers}</h3>
            <p>Total Customers</p>
            <span className="stat-change positive">+15.3%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
            <span className="stat-change neutral">+2.1%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Orders by Status Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <h3>Orders by Status</h3>
            <p>Current order statuses distribution</p>
          </div>
          <div className="pie-chart">
            <div className="pie-chart-visual">
              {Object.entries(ordersByStatus).map(([status, count], index) => {
                const total = Object.values(ordersByStatus).reduce((a, b) => a + b, 0);
                const percentage = ((count / total) * 100).toFixed(1);
                const rotation = Object.values(ordersByStatus)
                  .slice(0, index)
                  .reduce((sum, val) => sum + (val / total) * 360, 0);
                return (
                  <div
                    key={index}
                    className="pie-segment"
                    style={{
                      '--percentage': percentage,
                      '--color': statusColors[status] || '#ccc',
                      '--rotation': rotation,
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="pie-legend">
              {Object.entries(ordersByStatus).map(([status, count], index) => (
                <div key={index} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: statusColors[status] || '#ccc' }}
                  ></div>
                  <span>{status} ({count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="chart-container">
          <div className="chart-header">
            <h3>Product Categories</h3>
            <p>Distribution by category</p>
          </div>
          <div className="pie-chart">
            <div className="pie-chart-visual">
              {categoryData.map((item, index) => (
                <div
                  key={index}
                  className="pie-segment"
                  style={{
                    '--percentage': item.percentage,
                    '--color': item.color,
                    '--rotation': categoryData.slice(0, index).reduce((sum, cat) => sum + (parseFloat(cat.percentage) * 3.6), 0),
                  }}
                ></div>
              ))}
            </div>
            <div className="pie-legend">
              {categoryData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.category} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders">
        <div className="section-header">
          <h3>Recent Orders</h3>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.User?.name || 'Unknown'}</td>
                  <td>Rs. {order.totalAmount.toLocaleString()}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="dashboard" style={{ backgroundColor: 'white' }}>
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="dashboard-content">
          <Routes>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="customers" element={<Customer />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="addcustomer" element={<AddCustomer />} />
            <Route path="editproduct/:id" element={<EditProduct />} />
            <Route path="messages" element={<ContactMessages />} />
            <Route path="*" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
