"use client"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { itemCount } = useCart()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    onLogout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Sajha Bajha</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-purple-600 transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </form>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-purple-600 transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-purple-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-purple-600 transition-colors"
              >
                Contact
              </Link>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </form>

              {/* Mobile Cart */}
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({itemCount})</span>
              </Link>

              {/* Mobile User Menu */}
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-center"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
