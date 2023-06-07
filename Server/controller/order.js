const Order = require('../models/orderModel');

// Get order details for a user
const getOrderDetails = async (req,res) => {
  const userId = req.user._id; // Assuming you have authentication middleware that sets the user in req.user
  try {
    const orders = await Order.find({ user_id: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { sub_total ,phone_number } = req.body;
  const userId = req.user._id;
  try {
    // const user = await this.create({name :name,password: hash,phoneNumber :phoneNumber})
    const order = await Order.create({
      user_id: userId,
      sub_total :sub_total,
      phone_number: phone_number
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getOrderDetails, createOrder };
