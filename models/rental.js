const Joi=require('joi');
const mongoose=require('mongoose');

const Rental=mongoose.model('rental',new mongoose.Schema({

    customer:{
        type: new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength:255
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:Number,
                required:true,
                minlength:5,
                maxlength:10

            }
        }),
        required:true
    },

    movie:{
        type: new mongoose.Schema({

            title:{
                type:String,
                required:true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                minlength:5,
                maxlength:255
            }
        })
        ,required:true
    },
    dateOut:{

        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }       
}));

function validateRental(rental){

    const schema={
        costomerId:Joi.string().required(),
        movieId:Joi.string().required()
    }

    return Joi.validate(rental,schema);
}

exports.Rental =Rental;
exports.validateRental =validateRental;