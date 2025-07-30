import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign
} from "lucide-react"

const AdminOrderHistory = ({ admin, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    {
      id: "#ORD-001",
      customer: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001"
      },
      items: [
        {
          id: 1,
          name: "Yamaha Acoustic Guitar",
          price: 299.99,
          quantity: 1,
          image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=100"
        }
      ],
      status: "delivered",
      paymentStatus: "paid",
      total: 299.99,
      shipping: 0,
      tax: 24.00,
      createdAt: "2024-01-15T10:30:00Z",
      deliveredAt: "2024-01-18T14:20:00Z",
      trackingNumber: "TRK123456789"
    },
    {
      id: "#ORD-002",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Ave, Los Angeles, CA 90210"
      },
      items: [
        {
          id: 2,
          name: "Roland Digital Piano",
          price: 1299.99,
          quantity: 1,
          image: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=100"
        }
      ],
      status: "processing",
      paymentStatus: "paid",
      total: 1299.99,
      shipping: 0,
      tax: 104.00,
      createdAt: "2024-01-14T14:20:00Z",
      trackingNumber: null
    },
    {
      id: "#ORD-003",
      customer: {
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        phone: "+1 (555) 456-7890",
        address: "789 Pine St, Chicago, IL 60601"
      },
      items: [
        {
          id: 3,
          name: "Pearl Drum Set",
          price: 899.99,
          quantity: 1,
          image: "https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=100"
        }
      ],
      status: "shipped",
      paymentStatus: "paid",
      total: 899.99,
      shipping: 0,
      tax: 72.00,
      createdAt: "2024-01-13T09:15:00Z",
      shippedAt: "2024-01-14T11:30:00Z",
      trackingNumber: "TRK987654321"
    },
    {
      id: "#ORD-004",
      customer: {
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        phone: "+1 (555) 321-0987",
        address: "321 Elm St, Houston, TX 77001"
      },
      items: [
        {
          id: 4,
          name: "Fender Electric Guitar",
          price: 799.99,
          quantity: 1,
          image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=100"
        }
      ],
      status: "delivered",
      paymentStatus: "paid",
      total: 799.99,
      shipping: 0,
      tax: 64.00,
      createdAt: "2024-01-12T16:45:00Z",
      deliveredAt: "2024-01-15T10:20:00Z",
      trackingNumber: "TRK456789123"
    },
    {
      id: "#ORD-005",
      customer: {
        name: "David Brown",
        email: "david.brown@email.com",
        phone: "+1 (555) 654-3210",
        address: "654 Maple Ave, Phoenix, AZ 85001"
      },
      items: [
        {
          id: 5,
          name: "Yamaha Saxophone",
          price: 1899.99,
          quantity: 1,
          image: "https://images.pexels.com/photos/3779235/pexels-photo-3779235.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        {
          id: 6,
          name: "Violin Set",
          price: 249.99,
          quantity: 1,
          image: "https://images.pexels.com/photos/33597/violin-musical-instrument-music-sound.jpg?auto=compress&cs=tinysrgb&w=100"
        }
      ],
      status: "cancelled",
      paymentStatus: "refunded",
      total: 2149.98,
      shipping: 0,
      tax: 172.00,
      createdAt: "2024-01-11T11:20:00Z",
      cancelledAt: "2024-01-11T15:30:00Z"
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    // Simple date filtering - in a real app, you'd have proper date range filtering
    const matchesDate = dateRange === "all" || true
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const handleStatusUpdate = (orderId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} status to ${newStatus}`)
  }

  const handleExportOrders = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("Exporting orders...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/admin/dashboard"
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExportOrders}
                className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <span className="text-gray-600">Welcome, {admin.name}</span>
              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredOrders.length} of {orders.length} orders
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Orders</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                      selectedOrder?.id === order.id ? "bg-blue-50 border-r-4 border-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-900">{order.id}</span>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                        <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <span className="text-sm text-gray-500">+{order.items.length - 3} more</span>
                        )}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="h-4 w-4 inline mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
                    <span className="text-sm text-gray-500">{selectedOrder.id}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1 capitalize">{selectedOrder.status}</span>
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      selectedOrder.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedOrder.customer.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedOrder.customer.phone}</p>
                      <p><span className="font-medium">Address:</span> {selectedOrder.customer.address}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${(selectedOrder.total - selectedOrder.tax - selectedOrder.shipping).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>{selectedOrder.shipping === 0 ? "Free" : `$${selectedOrder.shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${selectedOrder.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-base border-t pt-2">
                        <span>Total:</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Ordered: {formatDate(selectedOrder.createdAt)}</span>
                      </div>
                      {selectedOrder.shippedAt && (
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 mr-2 text-gray-400" />
                          <span>Shipped: {formatDate(selectedOrder.shippedAt)}</span>
                        </div>
                      )}
                      {selectedOrder.deliveredAt && (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-gray-400" />
                          <span>Delivered: {formatDate(selectedOrder.deliveredAt)}</span>
                        </div>
                      )}
                      {selectedOrder.cancelledAt && (
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-gray-400" />
                          <span>Cancelled: {formatDate(selectedOrder.cancelledAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tracking */}
                  {selectedOrder.trackingNumber && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Tracking</h3>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedOrder.trackingNumber}</p>
                    </div>
                  )}

                  {/* Actions */}
                  {selectedOrder.status !== "delivered" && selectedOrder.status !== "cancelled" && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
                      <div className="space-y-2">
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                          Update Status
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Order</h3>
                <p className="text-gray-600">Choose an order from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderHistory