const express=require('express');
const jwt=require('jsonwebtoken');
const config=require('config')

function auth(req,res,next){

    const header=req.header('x-auth-token');
    
    if(!header){

        res.status(401).send('Unauthorized Request ');
        return 0;
    }  

    try{
        const token=req.header('x-auth-token');
        const decode=jwt.verify(token,'jwtPrivateKey');
        req.user=decode;
        next();
    }
    catch(err){

        res.status(400).send('InValid Token Request');
    }


}

module.exports =auth;