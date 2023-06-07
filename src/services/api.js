// api.js

import axios from 'axios';

const BASE_URL = `http://localhost:4001/api`; // Replace with your backend URL

export const signup = async ({ name, phoneNumber, password }) => {
  const response = await axios.post(`${BASE_URL}/user/add-user`, {
    name,
    phoneNumber,
    password,
  });
  return response.data;
};


export const createOrder = async ({ sub_total,  phone_number }) => {
  const response = await axios.post(`${BASE_URL}/add-order`, {
    sub_total,
    phone_number
  });
  return response.data;
};

export const getOrderDetails = async () => {
  const response = await axios.get(`${BASE_URL}/get-order`)
  return response.data;
};

const login = async (code) => {
  return fetch(`${BASE_URL}/api/user/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export { login };