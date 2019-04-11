const mongoose=require('mongoose');
const {genreSchema} =require('./genre');
const  Joi =require('joi');

const Movies=mongoose.model('movie',new mongoose.Schema({

    title:{
        type:String,
        required:true,
        minlegth:5,
        maxlength:255
    },
    
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
      type:Number,
      required:true,
      min:0,
      max:50
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:50
       }

}));

function validateMovies(movie){

    const schema={
        title:Joi.string().min(3).required(),
        genreId:Joi.string().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    }

    return Joi.validate(movie,schema);

}


exports.validateMovies =validateMovies;
exports.Movies =Movies;