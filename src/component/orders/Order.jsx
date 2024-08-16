import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './order.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.requestData || {};

  const [address, setAddress] = useState(order.address);
  // const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [addressError, setAddressError] = useState("");

  const handleAddressChange = (e) => {
    setAddressError("")
    setAddress(e.target.value);
  };

  // const handleEditAddress = () => {
  //   setIsEditingAddress(!isEditingAddress);
  // };

  const handleContinue =async () => {
    try {
      console.log({reqdata:location?.state?.requestData});

      let reqdata = location?.state?.requestData;

      if(address?.length<=0){
        setAddressError("Please fill delivery address")
        return;
      }

      reqdata["address"]=address;

      console.log({reqdata});
      
      
      const response = await axios.post('https://clothing-backend-two.vercel.app/orders', location?.state?.requestData);

      if (response.status === 201) {
        navigate('/order', { state: { order: response.data } }); // Redirect to order page with order details
        toast.success('Order created successfully!');
        setTimeout(() => {
          navigate('/my-orders'); 
        }, 1000);

      } else {
        toast.error('Failed to create order');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'There was an error creating the order!');
    }
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
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
            />
            {
              addressError?.length>0?(
                <p style={{"color":"red","fontWeight":"bold"}}>{addressError}</p>
              ):null
            }
        </div>

        <h2>Items</h2>
        <ul>
          {order.items?.map((item, index) => (
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
