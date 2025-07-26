"use client"

import { useState } from "react"
import { Package, User, Settings, Heart, CreditCard, MapPin, Bell, LogOut } from "lucide-react"

const DashboardPage = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("orders")

  const orders = [
    {
      id: "#ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 299.99,
      items: ["Yamaha Acoustic Guitar"],
    },
    {
      id: "#ORD-002",
      date: "2024-01-20",
      status: "Processing",
      total: 1299.99,
      items: ["Roland Digital Piano"],
    },
    {
      id: "#ORD-003",
      date: "2024-01-25",
      status: "Shipped",
      total: 899.99,
      items: ["Pearl Drum Set"],
    },
  ]

  const wishlistItems = [
    {
      id: 1,
      name: "Fender Stratocaster",
      price: 1299.99,
      image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 2,
      name: "Yamaha Saxophone",
      price: 1899.99,
      image: "https://images.pexels.com/photos/3779235/pexels-photo-3779235.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
  ]

  const menuItems = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "profile", label: "Profile", icon: User },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">${order.total}</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Order Date: {order.date}</div>
                  <div className="text-sm text-gray-900">Items: {order.items.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        )

      case "profile":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )

      case "wishlist":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-lg font-bold text-purple-600 mb-3">${item.price}</p>
                    <div className="space-y-2">
                      <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200">
                        Add to Cart
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {menuItems.find((item) => item.id === activeTab)?.label}
            </h2>
            <p className="text-gray-600">This section is coming soon!</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* User Info */}
              <div className="bg-purple-600 text-white p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-2">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-purple-100">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="p-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                      activeTab === item.id
                        ? "bg-purple-50 text-purple-600 border-r-2 border-purple-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200 mt-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-6">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
