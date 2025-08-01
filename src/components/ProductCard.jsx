import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"; // Import external CSS


export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  discount,
  showAddToCart = true,
  hideDollarSign = false,
  onClick,
  onAddToCart,
}) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (id) {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />

        {/* Removed icon buttons */}

        {showAddToCart && hovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart();
            }}
            className="add-to-cart"
          >
            Add to Cart
          </button>
        )}
      </div>

      <h3 className="product-name">{name}</h3>
      <div className="price-row">
        <span className="current-price">{hideDollarSign ? price : `Rs ${price}`}</span>
        {originalPrice && (
          <span className="original-price">{hideDollarSign ? originalPrice : `Rs ${originalPrice}`}</span>
        )}
      </div>
    </div>
  );
}