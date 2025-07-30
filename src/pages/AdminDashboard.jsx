import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  MessageSquare,
  Plus,
  LogOut,
  Shield
} from "lucide-react"

const AdminDashboard = ({ admin, onLogout }) => {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Total Revenue",
      value: "Rs45,231",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "bg-blue-500"
    },
    {
      title: "Total Customers",
      value: "856",
      change: "+15.3%",
      changeType: "positive",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      title: "Products Sold",
      value: "2,847",
      change: "+5.7%",
      changeType: "positive",
      icon: Package,
      color: "bg-orange-500"
    }
  ]

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      product: "Yamaha Acoustic Guitar",
      amount: 299.99,
      status: "Completed",
      date: "2024-01-15"
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      product: "Roland Digital Piano",
      amount: 1299.99,
      status: "Processing",
      date: "2024-01-14"
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      product: "Pearl Drum Set",
      amount: 899.99,
      status: "Shipped",
      date: "2024-01-13"
    },
    {
      id: "#ORD-004",
      customer: "Sarah Wilson",
      product: "Fender Electric Guitar",
      amount: 799.99,
      status: "Completed",
      date: "2024-01-12"
    }
  ]

  const topProducts = [
    { name: "Yamaha Acoustic Guitar", sales: 45, revenue: "Rs13,455" },
    { name: "Roland Digital Piano", sales: 32, revenue: "Rs41,598" },
    { name: "Pearl Drum Set", sales: 28, revenue: "Rs25,198" },
    { name: "Fender Electric Guitar", sales: 24, revenue: "Rs19,198" }
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-gray-700 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {admin.name}</span>
              <button
                onClick={onLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/add-product"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
            <Link
              to="/admin/orders"
              className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              View Orders
            </Link>
            <Link
              to="/admin/customers"
              className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Customer Queries
            </Link>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  timeRange === range
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {range === "7d" && "Last 7 days"}
                {range === "30d" && "Last 30 days"}
                {range === "90d" && "Last 90 days"}
                {range === "1y" && "Last year"}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <Link
                  to="/admin/orders"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">Rs{order.amount}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Selling Products</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard