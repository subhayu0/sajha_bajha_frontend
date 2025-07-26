"use client"
import { Star, ShoppingCart } from "lucide-react"

const ProductCard = ({ product, onAddToCart, viewMode = "grid" }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex">
        <div className="relative w-48 flex-shrink-0">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{discount}%
            </div>
          )}
          {product.inStock === false && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
            {product.brand && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                {product.brand}
              </span>
            )}
          </div>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={onAddToCart}
            disabled={product.inStock === false}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
              product.inStock === false
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{product.inStock === false ? "Out of Stock" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{discount}%
          </div>
        )}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <button
          onClick={onAddToCart}
          disabled={product.inStock === false}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
            product.inStock === false
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.inStock === false ? "Out of Stock" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
