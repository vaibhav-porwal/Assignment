import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { getOrderDetails } from '../services/api';
import { useNavigate } from 'react-router-dom';

const orderDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px',
};

const orderItemStyle = {
  margin: '5px 0',
};

const Showorder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/get-order');
        console.log('User is logged in');
      } else {
        navigate('/login')
        console.log('User is not logged in');
      }
      fetchOrderDetails();
    }, []);
  
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails()
        setOrders(response);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
  
    return (
      <div>
      <h1>Order Details</h1>
      {orders.map((order) => (
        <div key={order._id} style={orderDetailsStyle}>
          <p style={orderItemStyle}>Order ID: {order._id}</p>
          <p style={orderItemStyle}>Sub Total: {order.sub_total}</p>
          <p style={orderItemStyle}>User ID: {order.user_id}</p>
          <p style={orderItemStyle}>Phone Number: {order.phone_number}</p>
        </div>
      ))}
    </div>
    );
}

export default Showorder