import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, ShoppingCart, PackageSearch } from "lucide-react";
import "../style/Header.css";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <nav>
        <div className="nav-left">
          <div className="logo">
            <img className="Bajha" src="/logo_sb.png" alt="logo" />
          </div>
        </div>

        <div className="nav-center">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/product">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="nav-right">
          <ul>
            {user ? (
              <>
                <li>
                  <Link to="/Cart" aria-label="Cart" className="cart-icon-link">
                    <button className="cart-icon-button" type="button">
                      <ShoppingCart size={24} color="white" />
                    </button>
                  </Link>
                </li>

                <li className="profile-dropdown" ref={dropdownRef}>
                  <button
                    className="profile-icon-button"
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    aria-label="User menu"
                  >
                    <img
                      src="/profile-icon.png"
                      alt="Profile"
                      className="profile-icon"
                    />
                  </button>

                  {dropdownOpen && (
                    <ul className="dropdown-menu" style={{ minWidth: '200px', padding: '10px' }}>
                      <li style={{ padding: '8px 12px' }}>
                        <Link
                          to="/account"
                          onClick={() => setDropdownOpen(false)}
                          className="dropdown-link"
                          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          <User className="dropdown-icon" />
                          Manage My Account
                        </Link>
                      </li>

                      <li style={{ padding: '8px 12px' }}>
                        <Link
                          to="/my-orders"
                          onClick={() => setDropdownOpen(false)}
                          className="dropdown-link"
                          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          <PackageSearch className="dropdown-icon" />
                          My Orders
                        </Link>
                      </li>

                      <li style={{ padding: '8px 12px' }}>
                        <button
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                          className="logout-button"
                          type="button"
                          style={{ width: '100%', textAlign: 'left', padding: '8px 12px' }}
                        >
                          <LogOut className="dropdown-icon" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <li>
                <Link to="/loginPage">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
