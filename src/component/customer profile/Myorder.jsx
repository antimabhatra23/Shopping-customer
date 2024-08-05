import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './myorder.css';
import { format } from 'date-fns'; 

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/user/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [token]);

  if (orders.length === 0) {
    return <div>No orders found</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : format(date, 'MM/dd/yyyy');
  };

  return (
    <div className="orders-container">
      <h1 className='my-heading'>My Orders</h1>
      <ul className="order-list">
        {orders?.map((order) => (
          <li key={order._id} className="order-item">
            <p>Order ID: {order._id}</p>
            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            {order.items?.map((item) => (
              <div key={item?.productId} className="order-product">
                <img src={item?.productId?.img} alt={item.productName} className="Myproduct-image" />
                <div className="Myproduct-details">
                  <p>Product: {item.productId?.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Estimated Delivery: {formatDate(order.estimatedDelivery)}</p>
                </div>
              </div>
            ))}
            <p>Total Amount: ₹{order.totalAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
