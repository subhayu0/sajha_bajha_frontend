// "use client"

// import { useState } from "react"
// import { Package, User, Settings, Heart, CreditCard, MapPin, Bell, LogOut } from "lucide-react"

// const DashboardPage = ({ user, onLogout }) => {
//   const [activeTab, setActiveTab] = useState("orders")

//   const orders = [
//     {
//       id: "#ORD-001",
//       date: "2024-01-15",
//       status: "Delivered",
//       total: 299.99,
//       items: ["Yamaha Acoustic Guitar"],
//     },
//     {
//       id: "#ORD-002",
//       date: "2024-01-20",
//       status: "Processing",
//       total: 1299.99,
//       items: ["Roland Digital Piano"],
//     },
//     {
//       id: "#ORD-003",
//       date: "2024-01-25",
//       status: "Shipped",
//       total: 899.99,
//       items: ["Pearl Drum Set"],
//     },
//   ]

//   const wishlistItems = [
//     {
//       id: 1,
//       name: "Fender Stratocaster",
//       price: 1299.99,
//       image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200",
//     },
//     {
//       id: 2,
//       name: "Yamaha Saxophone",
//       price: 1899.99,
//       image: "https://images.pexels.com/photos/3779235/pexels-photo-3779235.jpeg?auto=compress&cs=tinysrgb&w=200",
//     },
//   ]

//   const menuItems = [
//     { id: "orders", label: "My Orders", icon: Package },
//     { id: "profile", label: "Profile", icon: User },
//     { id: "wishlist", label: "Wishlist", icon: Heart },
//     { id: "addresses", label: "Addresses", icon: MapPin },
//     { id: "payments", label: "Payment Methods", icon: CreditCard },
//     { id: "notifications", label: "Notifications", icon: Bell },
//     { id: "settings", label: "Settings", icon: Settings },
//   ]

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "delivered":
//         return "bg-green-100 text-green-800"
//       case "shipped":
//         return "bg-blue-100 text-blue-800"
//       case "processing":
//         return "bg-yellow-100 text-yellow-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const renderContent = () => {
//     switch (activeTab) {
//       case "orders":
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
//             <div className="space-y-4">
//               {orders.map((order) => (
//                 <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//                     <div className="flex items-center space-x-4 mb-2 sm:mb-0">
//                       <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
//                       <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
//                         {order.status}
//                       </span>
//                     </div>
//                     <div className="text-lg font-bold text-gray-900">${order.total}</div>
//                   </div>
//                   <div className="text-sm text-gray-600 mb-2">Order Date: {order.date}</div>
//                   <div className="text-sm text-gray-900">Items: {order.items.join(", ")}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )

//       case "profile":
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
//             <div className="bg-white border border-gray-200 rounded-lg p-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     defaultValue={user?.name}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                   <input
//                     type="email"
//                     defaultValue={user?.email}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                   <input
//                     type="tel"
//                     placeholder="+1 (555) 123-4567"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>
//                 <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200">
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )

//       case "wishlist":
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {wishlistItems.map((item) => (
//                 <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//                   <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
//                   <div className="p-4">
//                     <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
//                     <p className="text-lg font-bold text-purple-600 mb-3">${item.price}</p>
//                     <div className="space-y-2">
//                       <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200">
//                         Add to Cart
//                       </button>
//                       <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200">
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               {menuItems.find((item) => item.id === activeTab)?.label}
//             </h2>
//             <p className="text-gray-600">This section is coming soon!</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <div className="lg:w-64 flex-shrink-0">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               {/* User Info */}
//               <div className="bg-purple-600 text-white p-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-white bg-opacity-20 rounded-full p-2">
//                     <User className="h-6 w-6" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">{user?.name}</h3>
//                     <p className="text-sm text-purple-100">{user?.email}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Menu Items */}
//               <nav className="p-2">
//                 {menuItems.map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => setActiveTab(item.id)}
//                     className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-md transition-colors duration-200 ${
//                       activeTab === item.id
//                         ? "bg-purple-50 text-purple-600 border-r-2 border-purple-600"
//                         : "text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     <item.icon className="h-5 w-5" />
//                     <span className="font-medium">{item.label}</span>
//                   </button>
//                 ))}

//                 {/* Logout Button */}
//                 <button
//                   onClick={onLogout}
//                   className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200 mt-2"
//                 >
//                   <LogOut className="h-5 w-5" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </nav>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             <div className="bg-gray-50 rounded-lg p-6">{renderContent()}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DashboardPage


"use client"

import { useState } from "react"
import { Package, User, Settings, Heart, CreditCard, MapPin, Bell, LogOut, Home, TrendingUp, ShoppingBag, Clock, Star, Eye, Plus } from "lucide-react"

const DashboardPage = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home") // Changed from "orders" to "home"

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

  const recentlyViewed = [
    {
      id: 1,
      name: "Casio CTK-3500 Keyboard",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=200&h=150&fit=crop",
      rating: 4.6
    },
    {
      id: 2,
      name: "Audio-Technica ATH-M50x",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=150&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Shure SM58 Microphone",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&h=150&fit=crop",
      rating: 4.7
    }
  ]

  const menuItems = [
    { id: "home", label: "Dashboard Home", icon: Home }, // Added home menu item
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600">Here's what's happening with your musical journey.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">12% increase</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(orders.reduce((sum, order) => sum + order.total, 0))}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">8% increase</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                    <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Plus className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-blue-600 font-medium">2 new items</span>
                  <span className="text-gray-500 ml-1">this week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Orders</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(order => order.status !== 'Delivered').length}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ShoppingBag className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-orange-600 font-medium">1 processing</span>
                  <span className="text-gray-500 ml-1">1 shipped</span>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-semibold text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{order.items[0]}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(order.total)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Viewed */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recently Viewed</h3>
                  <Eye className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {recentlyViewed.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
                          </div>
                          <span className="text-sm font-bold text-purple-600">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
                >
                  <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-blue-900">Track Orders</span>
                </button>
                <button 
                  onClick={() => setActiveTab('wishlist')}
                  className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
                >
                  <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-purple-900">View Wishlist</span>
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
                >
                  <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-green-900">Edit Profile</span>
                </button>
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
                >
                  <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-orange-900">Manage Addresses</span>
                </button>
              </div>
            </div>
          </div>
        )

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
                    <div className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</div>
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
                    <p className="text-lg font-bold text-purple-600 mb-3">{formatPrice(item.price)}</p>
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