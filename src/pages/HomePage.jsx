import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { Star, Truck, Shield, Headphones } from "lucide-react"

const HomePage = ({ onAddToCart }) => {
  const featuredProducts = [
    {
      id: 1,
      name: "Yamaha Acoustic Guitar",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Roland Digital Piano",
      price: 1299.99,
      originalPrice: 1599.99,
      image: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Pearl Drum Set",
      price: 899.99,
      originalPrice: 1199.99,
      image: "https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Fender Electric Guitar",
      price: 799.99,
      originalPrice: 999.99,
      image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 5,
      name: "Yamaha Saxophone",
      price: 1899.99,
      originalPrice: 2299.99,
      image: "https://images.pexels.com/photos/3779235/pexels-photo-3779235.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 67,
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
    },
  ]

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: Shield,
      title: "2 Year Warranty",
      description: "Comprehensive warranty on all instruments",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Professional musicians ready to help",
    },
    {
      icon: Star,
      title: "Top Quality",
      description: "Only premium brands and instruments",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Music Journey
              <span className="block text-yellow-400">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Discover premium musical instruments from world-renowned brands. Whether you're a beginner or a
              professional, we have the perfect instrument for you.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Instruments</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of premium instruments from top brands, perfect for musicians of all skill levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay in Tune with Our Latest Updates</h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Get exclusive deals, new product announcements, and expert tips delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-r-lg font-medium hover:bg-yellow-400 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
