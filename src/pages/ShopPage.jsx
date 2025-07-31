"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Search, Filter, Grid, List, Star } from "lucide-react"
import ProductCard from "../components/ProductCard.jsx"
import { useCart } from "../context/CartContext.jsx"

// Sample product data - replace with API call
const products = [
  {
    id: 1,
    name: "Yamaha P-45 Digital Piano",
    price: 499.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400",
    category: "Piano",
    brand: "Yamaha",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    stockQuantity: 15,
    sku: "YP45-BLK",
    images: ["https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400"],
  },
  {
    id: 2,
    name: "Fender Stratocaster Electric Guitar",
    price: 699.99,
    originalPrice: 799.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Guitar",
    brand: "Fender",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    stockQuantity: 8,
    sku: "FS-STRAT",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
  },
  {
    id: 3,
    name: "Roland TD-17KV Electronic Drum Kit",
    price: 899.99,
    originalPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400",
    category: "Drums",
    brand: "Roland",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    stockQuantity: 12,
    sku: "RTD17KV",
    images: ["https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400"],
  },
  {
    id: 4,
    name: "Gibson Les Paul Standard",
    price: 2499.99,
    originalPrice: 2799.99,
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400",
    category: "Guitar",
    brand: "Gibson",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    stockQuantity: 5,
    sku: "GLP-STD",
    images: ["https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400"],
  },
  {
    id: 5,
    name: "Kawai ES110 Digital Piano",
    price: 649.99,
    originalPrice: 749.99,
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400",
    category: "Piano",
    brand: "Kawai",
    rating: 4.6,
    reviews: 94,
    inStock: true,
    stockQuantity: 10,
    sku: "KES110-BLK",
    images: ["https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400"],
  },
  {
    id: 6,
    name: "Pearl Export Drum Set",
    price: 399.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400",
    category: "Drums",
    brand: "Pearl",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    stockQuantity: 20,
    sku: "PEX-5PC",
    images: ["https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400"],
  },
  {
    id: 7,
    name: "Taylor 214ce Grand Auditorium",
    price: 899.99,
    originalPrice: 999.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Guitar",
    brand: "Taylor",
    rating: 4.8,
    reviews: 167,
    inStock: true,
    stockQuantity: 7,
    sku: "T214CE",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
  },
  {
    id: 8,
    name: "Casio PX-S1000 Digital Piano",
    price: 449.99,
    originalPrice: 549.99,
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400",
    category: "Piano",
    brand: "Casio",
    rating: 4.4,
    reviews: 112,
    inStock: false,
    stockQuantity: 0,
    sku: "CPXS1000",
    images: ["https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400"],
  },
]

const categories = ["All", "Guitar", "Piano", "Drums", "Bass", "Wind", "Percussion"]
const brands = ["All", "Yamaha", "Fender", "Gibson", "Roland", "Kawai", "Pearl", "Taylor", "Casio"]

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Handle search params on component mount
  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand
    return matchesSearch && matchesCategory && matchesBrand
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const getDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    // Show success message and optionally navigate to cart
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shop Instruments</h1>
              <p className="text-gray-600 mt-1">Discover premium musical instruments from top brands</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search instruments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button className="p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-purple-100 text-purple-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedBrand === brand ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{sortedProducts.length} products found</span>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A to Z</option>
                  </select>

                  <div className="flex border rounded-md">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} viewMode={viewMode} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                    setSelectedBrand("All")
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
