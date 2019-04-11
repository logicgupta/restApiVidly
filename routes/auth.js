const {Users} =require('../models/users');
const _=require('lodash');
const config=require('config');
const jwt=require('jsonwebtoken');
const express=require('express');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const Joi=require('joi');
const router=express.Router();

router.get('/',async(req,res)=>{

    // const rentals=await Rental.find().sort('-dateOut');
   console.log("connected sucessfully");
});

router.post('/',async(req,res)=>{

    console.log('Starting User register ');

    /*const {error}=validate(req.body);
    if(error) {
        return res.status(400).send('Invalid User and password.');
    } */

    let user =Users.findOne({email:req.body.email});
    
    if(!user) res.status(400).send('INvalid email and password ..');

     bcrypt.compare(req.body.password,user.password,(err,vl)=>{

        if(!vl){
            res.status(400).send('Invalid User and Password ...');

        }
    });
   // if(!validPassword) 

    //const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
    
    const token=user.generateAuthToken();


   res.send(token);
});

    function validate(req){
        const Schema={
            email:Joi.string().required().email(),
            password:Joi.string().min(5).required()
        }
        return Joi.validate(Schema,req);
    }

module.exports = router;
