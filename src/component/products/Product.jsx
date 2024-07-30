import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './product.css';

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || {};

  const userId = localStorage.getItem('userId');
  const address = 'Murli Krishna Colony, 223309, Jaipur';

  // Function to handle Buy Now button click
  const handleBuyNow = async () => {
    const requestData = {
      userId: userId,
      items: [
        {
          productId: product._id,
          quantity: 1,
          price: product.price
        }
      ],
      totalAmount: product.price,
      address: address
    };

    console.log('Request Data:', requestData);

    try {
      const response = await axios.post('http://localhost:5000/orders', requestData);
      console.log('response', response);

      if (response.status === 201) {
        toast.success('Order created successfully!');
        navigate('/order', { state: { order: response.data } }); // Redirect to order page with order details
      } else {
        toast.error('Failed to create order');
      }
    } catch (error) {
      console.error('There was an error creating the order!', error);
      toast.error(error.response?.data?.message || 'There was an error creating the order!');
    }
  };

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.img} alt={product.name} />
        <div className="product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        <p>Size: {product.size}</p>
        <p className="product-rating">Rating: {product.rating} ⭐</p>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default Product;
