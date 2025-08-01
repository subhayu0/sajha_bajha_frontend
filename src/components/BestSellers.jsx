import React, { useEffect, useState } from 'react';
import '../style/BestSellers.css';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const BestSellers = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [randomProducts, setRandomProducts] = useState([]);

  // Function to shuffle and pick a subset of products
  const getRandomProducts = (productsList, count = 4) => {
    const shuffled = [...productsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (products.length > 0) {
      setRandomProducts(getRandomProducts(products));
    }
  }, [products]);

  return (
    <div className="homepage">
      <section className="best-sellers">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Best-sellers</h2>
            <Link to="/product" className="view-all">View all</Link>
          </div>

          <div className="products-grid">
            {randomProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.productName}
                price={product.price}
                image={product.imageUrls && product.imageUrls.length > 0 ? `http://localhost:5001${product.imageUrls[0]}` : '/default-product.png'}
                onAddToCart={() => addToCart(product.id, 1)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSellers;