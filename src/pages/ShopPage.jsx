"use client"

import { useState } from "react"
import { Search, Filter, Grid, List } from "lucide-react"
import ProductCard from "../components/ProductCard"

const products = [
  {
    id: 1,
    name: "Yamaha Acoustic Guitar",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 124,
    category: "Guitars",
    brand: "Yamaha",
    inStock: true,
  },
  {
    id: 2,
    name: "Roland Digital Piano",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 89,
    category: "Keyboards",
    brand: "Roland",
    inStock: true,
  },
  {
    id: 3,
    name: "Pearl Drum Set",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviews: 156,
    category: "Drums",
    brand: "Pearl",
    inStock: true,
  },
  {
    id: 4,
    name: "Fender Electric Guitar",
    price: 799.99,
    originalPrice: 999.99,
    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 203,
    category: "Guitars",
    brand: "Fender",
    inStock: true,
  },
  {
    id: 5,
    name: "Yamaha Saxophone",
    price: 1899.99,
    originalPrice: 2299.99,
    image: "https://images.pexels.com/photos/3779235/pexels-photo-3779235.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 67,
    category: "Wind",
    brand: "Yamaha",
    inStock: false,
  },
  {
    id: 6,
    name: "Violin Set",
    price: 249.99,
    originalPrice: 349.99,
    image:
      "https://images.pexels.com/photos/33597/violin-musical-instrument-music-sound.jpg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    reviews: 98,
    category: "Strings",
    brand: "Stentor",
    inStock: true,
  },
  {
    id: 7,
    name: "Casio Digital Piano",
    price: 599.99,
    originalPrice: 749.99,
    image: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    reviews: 142,
    category: "Keyboards",
    brand: "Casio",
    inStock: true,
  },
  {
    id: 8,
    name: "Gibson Les Paul",
    price: 2499.99,
    originalPrice: 2999.99,
    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 87,
    category: "Guitars",
    brand: "Gibson",
    inStock: true,
  },
]

const categories = ["All", "Guitars", "Keyboards", "Drums", "Wind", "Strings"]
const brands = ["All", "Yamaha", "Roland", "Pearl", "Fender", "Gibson", "Casio", "Stentor"]

const ShopPage = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)

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
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} viewMode={viewMode} />
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
