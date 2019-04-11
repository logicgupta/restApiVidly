const {Users,validateUser} =require('../models/users');
const _=require('lodash');
const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const router=express.Router();
const asyncMiddleware=require('../middleware/async');
const auth=require('../middleware/auth');

router.get('/',auth,async(req,res)=>{
        const user=await Users.find();
    res.send(user);
});

router.post('/',async(req,res)=>{

    console.log('Starting User register ');

    const {error}=validateUser(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    } 

    let user =Users.findOne({email:req.body.email});
    
    if(!user) res.status(400).send('User Already Registered !');

     user=new Users(_.pick(req.body,['name','email','password']));

    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(user.password,salt);
    user.password=hash;

   await user.save();
    
   const token=user.generateAuthToken();

    
   res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

module.exports = router;
