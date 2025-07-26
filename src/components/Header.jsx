"use client"
import { Link, useLocation } from "react-router-dom"
import { Music, ShoppingCart, User, LogOut } from "lucide-react"

const Header = ({ user, cartItems, onLogout }) => {
  const location = useLocation()

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "shop", label: "Shop", path: "/shop" },
    { id: "about", label: "About Us", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Music className="h-8 w-8 text-purple-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">SajhaBaja</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>

            {/* User actions */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
