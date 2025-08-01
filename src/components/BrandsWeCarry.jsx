import React from 'react';
import { Truck, Headphones, Shield } from 'lucide-react';
import '../style/BrandsWeCarry.css'; // Import external CSS

const BrandsSection = () => {
  // Brand logos data - Replace these paths with your actual image paths
  const brands = [
    { name: 'Yamaha', logo: '/yamaha.png' },
    { name: 'Gibson', logo: '/gibson.png' },
    { name: 'Fender', logo: '/fender.png' },
    { name: 'Roland', logo: '/roland.png' },
    
  ];

  return (
    <div className="brands-section">
      <div className="container">
        <h2 className="brands-title">Brands We Carry</h2>
        
        <div className="brands-carousel">
          <div className="brands-track">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div key={`first-${index}`} className="brand-item">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="brand-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="brand-text" style={{display: 'none'}}>{brand.name}</div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div key={`second-${index}`} className="brand-item">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="brand-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="brand-text" style={{display: 'none'}}>{brand.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Truck size={32} color="white" />
            </div>
            <h3 className="feature-title">Free and Fast Delivery</h3>
            <p className="feature-description">Free delivery for all orders over $100</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Headphones size={32} color="white" />
            </div>
            <h3 className="feature-title">24/7 Customer Service</h3>
            <p className="feature-description">Friendly 24/7 customer support</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={32} color="white" />
            </div>
            <h3 className="feature-title">Money Back Guarantee</h3>
            <p className="feature-description">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;