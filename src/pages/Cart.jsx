import React from 'react';
import { useNavigate } from 'react-router-dom';  // import useNavigate
import '../style/Cart.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();  // initialize navigate
  const { cartItems, updateCartQuantity, removeFromCart } = useCart();

  console.log('Cart page cartItems:', cartItems);
  if (cartItems.length > 0) {
    console.log('First cart item in Cart page:', cartItems[0]);
  }

  // Remove local cartItems state and setCartItems

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Don't allow quantity less than 1
    await updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId);
  };

  const getSubtotal = (item) => {
    const price = item.Product?.price || 0;
    const quantity = item.quantity || 1;
    return price * quantity;
  };
  const getTotal = () => cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);

  // handler for return to shop button
  const handleReturnToShop = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <div className="cart-table">
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>
          {cartItems.length === 0 && <div className="cart-item">Your cart is empty.</div>}
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-product">
                <img 
                  src={item.Product?.imageUrls?.[0] ? `http://localhost:5001${item.Product.imageUrls[0]}` : '/default-product.png'} 
                  alt={item.Product?.productName || 'Product'} 
                />
                <span>{item.Product?.productName || 'Unknown Product'}</span>
              </div>
              <span>₹{item.Product?.price || 0}</span>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn minus" 
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity || 1}</span>
                <button 
                  className="quantity-btn plus" 
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <span>₹{getSubtotal(item)}</span>
              <button 
                className="delete-btn" 
                onClick={() => handleRemoveFromCart(item.productId)}
                title="Remove from cart"
              >
                🗑️
              </button>
            </div>
          ))}
          <div className="cart-buttons">
            <button className="btn-outline" onClick={handleReturnToShop}>Return To Shop</button>
          </div>
        </div>

        <div className="cart-summary">
          <h3>Cart Total</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{getTotal()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{getTotal()}</span>
          </div>
          <button className="btn-primary" onClick={() => navigate('/checkout')}>Proceed to checkout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
