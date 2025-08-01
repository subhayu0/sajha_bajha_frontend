import React, { useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import '../style/ProductCard.css';

const backendUrl = "http://localhost:5001";

const Drums = () => {
  const { products, refreshProducts } = useProducts();
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Refresh products when component mounts
    refreshProducts();
  }, []);
  
  const drumsProducts = products.filter(product => product.category === 'Drums');
  
  console.log('All products:', products);
  console.log('Drums products:', drumsProducts);

  return (
    <>
      <Header />
      <div className="user-products-page">
        <h2>Drums Products</h2>
        <div className="products-grid">
          {tennisProducts.length === 0 && <p>No drums products available.</p>}
          {tennisProducts.map(product => {
            console.log('Rendering product:', product);
            let imageUrl = '/default-product.png';
            
            if (product.imageUrls) {
              // Handle different possible formats of imageUrls
              if (Array.isArray(product.imageUrls) && product.imageUrls.length > 0) {
                // If it's an array, use the first image
                imageUrl = product.imageUrls[0].startsWith('http') 
                  ? product.imageUrls[0] 
                  : backendUrl + product.imageUrls[0];
              } else if (typeof product.imageUrls === 'string') {
                // If it's a string, use it directly
                imageUrl = product.imageUrls.startsWith('http') 
                  ? product.imageUrls 
                  : backendUrl + product.imageUrls;
              }
            }
            
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.productName}
                price={product.price}
                image={imageUrl}
                showAddToCart={true}
                onAddToCart={() => {
                  console.log('Adding to cart:', product.id);
                  addToCart(product.id, 1);
                }}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Drums;