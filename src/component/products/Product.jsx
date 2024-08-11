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
  const address = '';

  // Function to handle Buy Now button click
  const handleBuyNow = async () => {
    if (!userId) {
      toast.error('You need to be logged in to place an order');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page if not logged in
      }, 1000);
      return;
    }

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

    try {
      const response = await axios.post('https://clothing-backend-two.vercel.app/orders', requestData);

      if (response.status === 201) {
        navigate('/order', { state: { order: response.data } }); // Redirect to order page with order details
        toast.success('Order created successfully!');
      } else {
        toast.error('Failed to create order');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'There was an error creating the order!');
    }
  };

  // Function to handle Add to Cart button click
  const handleAddToCart = async () => {
    if (!userId) {
      toast.error('You need to be logged in to add products to your cart');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page if not logged in
      }, 1000);
      return;
    }

    const requestData = {
      userId: userId,
      productId: product._id,
      quantity: 1
    };

    try {
      const response = await axios.post('https://clothing-backend-two.vercel.app/cart', requestData);

      if (response.status === 200) {
        navigate('/cart', { state: { cart: response.data } }); // Redirect to cart page with cart details
        toast.success('Product added to cart successfully!');
      } else {
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'There was an error adding the product to the cart!');
    }
  };

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.img} alt={product.name} />
        <div className="product-actions">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
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
