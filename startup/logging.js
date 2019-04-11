require('express-async-error');
const winston=require('winston');
require('winston-mongodb');
module.exports =function(){

    /*winston.exceptions.handle(
        new winston.transports.Console({ colourize:true,prettyPrint:true}),
        new winston.transports.File({filename:'uncaughtException.log'}));*/
    winston.add(new winston.transports.File({filename:'logfile.log'}));
    winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly'}));
    process.on('uncaughtException',(err)=>{
        console.log(' UnCaught Exception');
    winston.error(err.message,err);
    });

}