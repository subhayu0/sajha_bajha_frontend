import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  User
} from "lucide-react"

const AdminCustomerQueries = ({ admin, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedQuery, setSelectedQuery] = useState(null)

  const queries = [
    {
      id: "Q001",
      customer: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567"
      },
      subject: "Issue with Yamaha Guitar Delivery",
      message: "I ordered a Yamaha acoustic guitar last week but haven't received any tracking information. Could you please help me track my order?",
      status: "pending",
      priority: "medium",
      category: "shipping",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "Q002",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1 (555) 987-6543"
      },
      subject: "Product Return Request",
      message: "I received the Roland piano but it has some cosmetic damage. I would like to return it and get a replacement.",
      status: "in-progress",
      priority: "high",
      category: "returns",
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-14T16:45:00Z"
    },
    {
      id: "Q003",
      customer: {
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        phone: "+1 (555) 456-7890"
      },
      subject: "Payment Processing Issue",
      message: "My payment was charged but I didn't receive an order confirmation. Can you please check the status of my payment?",
      status: "resolved",
      priority: "high",
      category: "payment",
      createdAt: "2024-01-13T09:15:00Z",
      updatedAt: "2024-01-13T11:30:00Z"
    },
    {
      id: "Q004",
      customer: {
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        phone: "+1 (555) 321-0987"
      },
      subject: "Product Information Request",
      message: "I'm interested in the Fender electric guitar. Can you provide more details about the specifications and warranty?",
      status: "pending",
      priority: "low",
      category: "product-info",
      createdAt: "2024-01-12T16:45:00Z",
      updatedAt: "2024-01-12T16:45:00Z"
    },
    {
      id: "Q005",
      customer: {
        name: "David Brown",
        email: "david.brown@email.com",
        phone: "+1 (555) 654-3210"
      },
      subject: "Bulk Order Inquiry",
      message: "I'm looking to purchase multiple instruments for our music school. Do you offer bulk discounts?",
      status: "in-progress",
      priority: "medium",
      category: "sales",
      createdAt: "2024-01-11T11:20:00Z",
      updatedAt: "2024-01-11T13:15:00Z"
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredQueries = queries.filter((query) => {
    const matchesSearch = 
      query.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || query.status === statusFilter
    const matchesPriority = priorityFilter === "all" || query.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
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

  const handleStatusUpdate = (queryId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating query ${queryId} status to ${newStatus}`)
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
              <h1 className="text-2xl font-bold text-gray-900">Customer Queries</h1>
            </div>
            <div className="flex items-center space-x-4">
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
                placeholder="Search queries..."
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
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredQueries.length} of {queries.length} queries
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Queries List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Customer Queries</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredQueries.map((query) => (
                  <div
                    key={query.id}
                    onClick={() => setSelectedQuery(query)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                      selectedQuery?.id === query.id ? "bg-blue-50 border-r-4 border-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-900">{query.id}</span>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(query.status)}`}>
                          {getStatusIcon(query.status)}
                          <span className="ml-1 capitalize">{query.status.replace("-", " ")}</span>
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(query.priority)}`}>
                          {query.priority.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(query.createdAt)}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{query.subject}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{query.message}</p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span>{query.customer.name}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{query.category.replace("-", " ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Query Details */}
          <div className="lg:col-span-1">
            {selectedQuery ? (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Query Details</h2>
                    <span className="text-sm text-gray-500">{selectedQuery.id}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedQuery.status)}`}>
                      {getStatusIcon(selectedQuery.status)}
                      <span className="ml-1 capitalize">{selectedQuery.status.replace("-", " ")}</span>
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(selectedQuery.priority)}`}>
                      {selectedQuery.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedQuery.customer.name}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedQuery.customer.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedQuery.customer.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Query Details */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Query Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Subject</label>
                        <p className="text-sm text-gray-900">{selectedQuery.subject}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <p className="text-sm text-gray-900">{selectedQuery.message}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <p className="text-sm text-gray-900 capitalize">{selectedQuery.category.replace("-", " ")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-600">Created: {formatDate(selectedQuery.createdAt)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-600">Updated: {formatDate(selectedQuery.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
                    <div className="space-y-2">
                      <select
                        value={selectedQuery.status}
                        onChange={(e) => handleStatusUpdate(selectedQuery.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                        Send Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Query</h3>
                <p className="text-gray-600">Choose a query from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCustomerQueries