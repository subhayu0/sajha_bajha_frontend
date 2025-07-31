import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const CartPage = () => {
  const navigate = useNavigate()
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartSummary 
  } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const cartSummary = getCartSummary()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Here you would typically redirect to a checkout page or payment gateway
    // For now, we'll just show a success message
    setTimeout(() => {
      alert('Order placed successfully!')
      clearCart()
      navigate('/')
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">
                {cartSummary.itemCount} {cartSummary.itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Cart Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">SKU: {item.sku}</p>
                        <p className="text-lg font-semibold text-gray-900">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (13% VAT)</span>
                  <span className="font-medium">${cartSummary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {cartSummary.shipping === 0 ? 'Free' : `$${cartSummary.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${cartSummary.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-md font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {cartSummary.shipping > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    Add ${(5000 - cartSummary.subtotal).toFixed(2)} more to your cart for free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage