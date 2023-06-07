const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async (req, res, next) => {
  try {
    // Retrieve the token from the request headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    console.log(token)
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized token not' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded)
    // Retrieve the user based on the decoded token
    const user = await User.findById(decoded._id);
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: 'Unauthorizedjwdcjkw' });
    }

    // Attach the user object to the request
    req.user = user;
    console.log("authorized")
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { protectRoute };
