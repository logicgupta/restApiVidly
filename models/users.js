const mongoose=require('mongoose');
const express=require('express');
const Joi=require('joi');
const routes=express.Router();
const jwt=require('jsonwebtoken');
const config=require('config');


const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String, 
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

UserSchema.methods.generateAuthToken = function(){

   const token=jwt.sign({_id:this._id},'jwtPrivateKey');
   return token;

}
 
const Users=mongoose.model('User',UserSchema);



function validateUser(user){
    const Schema={
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(10).max(1024).required().email(),
        password:Joi.string().min(7).max(20).required()
    };

    return Joi.validate(user,Schema);
}

exports.Users  =Users;
exports.validateUser =validateUser;
exports.UserSchema =UserSchema;
