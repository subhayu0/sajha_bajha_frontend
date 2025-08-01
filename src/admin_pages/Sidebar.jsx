import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/AdminDashboard.css';

const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className={`fas fa-${sidebarCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
        </button>
      </div>

      <div className="sidebar-menu">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}
        >
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/order"
          className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Order</span>
        </NavLink>
        <NavLink
          to="/admin/customers"
          className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}
        >
          <i className="fas fa-user-friends"></i>
          <span>Customers</span>
        </NavLink>
        <NavLink
          to="/admin/product"
          className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}
        >
          <i className="fas fa-box"></i>
          <span>Product</span>
        </NavLink>
        <NavLink
          to="/admin/messages"
          className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}
        >
          <i className="fas fa-envelope"></i>
          <span>Messages</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;