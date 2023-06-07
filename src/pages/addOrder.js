import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { createOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';
const AddOrder = () => {
  const navigate = useNavigate();
    const [subTotal, setSubTotal] = useState('');
    const [phone_number,setphone_number] = useState('')
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/add-order');
        console.log('User is logged in');
      } else {
        navigate('/login');
        console.log('User is not logged in');
      }
    }, []);

    const handleCreateOrder = async () => {
        try {
          await createOrder ({ sub_total: subTotal,phone_number : phone_number })
          alert('Order created successfully');
        } catch (error) {
          console.error('Error creating order:', error);
        }
      };
    
      return (
        <div>
          <h1>Create Order</h1>
          <input
            type="text"
            placeholder="Sub Total"
            value={subTotal}
            onChange={(e) => setSubTotal(e.target.value)}
          />
           <input
            type="text"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setphone_number(e.target.value)}
          />
          <button onClick={handleCreateOrder}>Create Order</button>
        </div>
      );
    };
    


export default AddOrder