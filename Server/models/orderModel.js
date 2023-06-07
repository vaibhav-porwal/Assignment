const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sub_total: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
