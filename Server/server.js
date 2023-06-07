
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const orderRoutes =require ('./routes/orderdetails')
var cors = require('cors');
 
const cookieParser = require('cookie-parser');



// express app
const app = express()
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:3000',
// }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api',orderRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URL).
then(()=>{
    console.log("database connected")
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
      })
})
.catch((err)=> {
    console.log(err)
})