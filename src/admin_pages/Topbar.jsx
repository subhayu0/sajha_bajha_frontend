import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import '../style/AdminDashboard.css';

const Topbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear context and localStorage
    navigate('/login'); // redirect to login page  
  };

  return (
    <div className="top-bar">
      <div className="user-dropdown" style={{ marginLeft: 'auto' }}>
        <button className="dropdown-btn">
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>
          <span>Admin User</span>
          <i className="fas fa-chevron-down"></i>
        </button>
        <div className="dropdown-content">
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
