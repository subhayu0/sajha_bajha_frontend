import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/ProductDetail.css';

const backendUrl = "http://localhost:5001";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/api/product/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.quantity || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      alert('Product added to cart!');
    }
  };

  if (loading) return (
    <>
      <Header />
      <div className="product-detail-container">
        <div className="loading">Loading product details...</div>
      </div>
      <Footer />
    </>
  );

  if (error) return (
    <>
      <Header />
      <div className="product-detail-container">
        <div className="error">Error: {error}</div>
        <button onClick={() => navigate('/product')} className="back-button">
          Back to Products
        </button>
      </div>
      <Footer />
    </>
  );

  if (!product) return (
    <>
      <Header />
      <div className="product-detail-container">
        <div className="error">Product not found</div>
        <button onClick={() => navigate('/product')} className="back-button">
          Back to Products
        </button>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-images">
            <div className="main-image">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <img 
                  src={`${backendUrl}${product.imageUrls[selectedImage]}`} 
                  alt={product.productName} 
                />
              ) : (
                <img src="/default-product.png" alt="Default product" />
              )}
            </div>
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="thumbnail-images">
                {product.imageUrls.map((url, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${selectedImage === index ? 'selected' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={`${backendUrl}${url}`} alt={`Thumbnail ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="product-info">
            <h1>{product.productName}</h1>
            <p className="product-sku">SKU: {product.sku}</p>
            <p className="product-price">Rs {product.price}</p>
            <div className="product-meta">
              {product.category && <p><strong>Category:</strong> {product.category}</p>}
              {product.size && <p><strong>Size:</strong> {product.size}</p>}
              {product.color && <p><strong>Color:</strong> {product.color}</p>}
              <p><strong>Status:</strong> {product.status}</p>
              <p><strong>Available:</strong> {product.quantity} in stock</p>
            </div>
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input 
                  type="number" 
                  id="quantity" 
                  name="quantity" 
                  min="1" 
                  max={product.quantity} 
                  value={quantity} 
                  onChange={handleQuantityChange} 
                />
              </div>
              <button 
                className="add-to-cart-btn" 
                onClick={handleAddToCart}
                disabled={product.status !== 'Available' || product.quantity < 1}
              >
                {product.status === 'Available' && product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/product')} className="back-button">
          Back to Products
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;