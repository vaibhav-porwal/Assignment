const mongoose =require('mongoose')
const bcrypt =require('bcrypt')
const validator = require('validator')

const Schema =mongoose.Schema

const userSchema = new Schema({
    name :{
        type :String,
        required:true
    },
    password :{
        type :String,
        required :true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v); 
          },
          message: 'Invalid phone number'
        }
      },
})


// Static signup method

userSchema.statics.signup = async function (name,password,phoneNumber){
    
    if (!name || !password || !phoneNumber) {
        throw Error('All fields must be filled')
      }
     
    const exists = await this.findOne({ phoneNumber })
    if (exists)
    {
        throw Error('Phone exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({name :name,password: hash,phoneNumber :phoneNumber})

    return user
}

userSchema.statics.login = async function(phoneNumber, password ) {

    if (!phoneNumber || !password ) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ phoneNumber })
    if (!user) {
      throw Error('Incorrect phoneNumber')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
    return user
  }
module.exports =mongoose.model('User',userSchema)

