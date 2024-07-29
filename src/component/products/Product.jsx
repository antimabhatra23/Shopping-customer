import React from 'react';
import { useLocation } from 'react-router-dom';
import './product.css';

const Product = () => {
  const location = useLocation();
  const product = location.state?.product || {};

  console.log("location", location);

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.img} alt={product.name} />
        <div className="product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p> 
        <p>Size: {product.size}</p>
        <p className="product-rating">Rating: {product.rating} ⭐</p>
      </div>
    </div>
  );
}

export default Product;
