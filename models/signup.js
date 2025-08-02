const mongoose = require('mongoose')

const signupSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true
    } 
}) 
 
exports.signup = mongoose.model('signup',signupSchema) 