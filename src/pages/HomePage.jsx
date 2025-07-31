import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, ShoppingCart, Music, Guitar, Piano, Drum } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'

// Sample featured products
const featuredProducts = [
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
]

const categories = [
  {
    name: "Guitars",
    icon: Guitar,
    description: "Electric, acoustic, and bass guitars",
    count: 45,
    color: "bg-blue-500",
  },
  {
    name: "Pianos",
    icon: Piano,
    description: "Digital and acoustic pianos",
    count: 23,
    color: "bg-purple-500",
  },
  {
    name: "Drums",
    icon: Drum,
    description: "Acoustic and electronic drum kits",
    count: 18,
    color: "bg-orange-500",
  },
]

const HomePage = () => {
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Perfect
              <span className="block text-yellow-300">Musical Instrument</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Premium instruments from world-renowned brands, delivered to your doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find the perfect instrument for your musical journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-sm text-purple-600 font-medium">{category.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked instruments from our collection</p>
            </div>
            <Link
              to="/shop"
              className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sajha Bajha?</h2>
            <p className="text-lg text-gray-600">We're committed to providing the best musical experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">All our instruments are carefully selected from top brands</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and secure shipping across Nepal</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Get help from our music experts anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Musical Journey?</h2>
          <p className="text-xl text-purple-100 mb-8">Join thousands of musicians who trust Sajha Bajha</p>
          <Link
            to="/shop"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Browse Our Collection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
