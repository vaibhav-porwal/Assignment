const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const googleOAuth = require('../utills/auth');
const createToken = (_id) =>{
  return  jwt.sign({_id},process.env.SECRET,{ expiresIn :'3d'})
}
// login a user
const loginUser = async (req, res) => {
    const {phoneNumber, password} = req.body
    
    try {
      const user = await User.login(phoneNumber, password)
  
      // create a token
      const token = createToken(user._id)
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 898979),
        httpOnly: true,
        path: '/', // Set the cookie to be accessible from all paths
      });
      res.status(200).json({token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// signup a user
const signupUser = async (req, res) => {
  const {name,password,phoneNumber} = req.body

  try {
    const user = await User.signup(name,password,phoneNumber)
        // create a token 
    const token = createToken(user._id)
    res.status(200).json({token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
const google =async (req,res) => {
  
  try {
    const code = req.body.code;
    const profile = await googleOAuth.getProfileInfo(code);

    const user = {
      googleId: profile.sub,
      name: profile.name,
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      profilePic: profile.picture,
    };

    res.send({ user });
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
}

module.exports = { signupUser, loginUser , google }