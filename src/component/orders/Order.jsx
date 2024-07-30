import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './order.css';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || {};

  const [address, setAddress] = useState(order.address);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEditAddress = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  const handleContinue = () => {
    navigate('/next-step'); // Change this to your desired route
  };

  return (
    <div className="order-container">
      <h1>Order Details</h1>
      <div className="order-details">
        <p>Order ID: {order._id}</p>
        <p>Total Amount: ₹{order.totalAmount}</p>
        <p>Created At: {order.createdAt}</p>
        <p>Free Delivery: Yes</p>
        <p>Estimated Delivery Date: {order.estimatedDeliveryDate}</p>
        <p>Order Status: {order.status}</p> {/* Assuming order.status contains the order tracking information */}

        <div className="address-section">
          <h2>Delivery Address</h2>
          {isEditingAddress ? (
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
            />
          ) : (
            <p>{address}</p>
          )}
          <button onClick={handleEditAddress}>
            {isEditingAddress ? 'Save Address' : 'Edit Address'}
          </button>
        </div>

        <h2>Items</h2>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              <div className="item-details">
                <p>Product ID: {item.productId}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default Order;
