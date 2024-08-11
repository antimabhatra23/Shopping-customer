import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './mycart.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`https://clothing-backend-two.vercel.app/cart/${userId}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error('Error fetching cart');
      }
    };

    fetchCart();
  }, [userId]);

  const handleCheckout = () => {
    // console.log('Proceed to checkout');
    toast.success('Proceeding to checkout');
    navigate('/');
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <ToastContainer />
      <h1 className="heading">My Cart</h1>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.productId._id} className="cart-item">
            <img src={item.productId.img} alt={item.productId.name} />
            <div className="cart-item-details">
              <h2>{item.productId.name}</h2>
              <p>Price: ₹{item.productId.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>
          Total Amount: ₹
          {cart.items.reduce(
            (acc, item) => acc + item.productId.price * item.quantity,
            0
          )}
        </h2>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
