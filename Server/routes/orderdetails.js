const express = require('express');
const { protectRoute } = require('../middlewares/requireAuth');
const { createOrder,getOrderDetails} =require('../controller/order')

const router =express.Router()

router.get('/get-order',protectRoute,getOrderDetails)

router.post('/add-order',protectRoute,createOrder)

module.exports =router


// Create a new order (protected route)
