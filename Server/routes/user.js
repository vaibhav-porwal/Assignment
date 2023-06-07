const express = require('express')

// controller functions
const { loginUser, signupUser ,google } = require('../controller/user')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/add-user', signupUser)

router.post('/google', google);
module.exports = router