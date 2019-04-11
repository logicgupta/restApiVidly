const {Rental,validateRental}=require('../models/rental');
const {Customer}=require('../models/customer');
const {Movie}=require('../models/movies');
const mongoose=require('mongoose');
const express=require('express');
const Fawn =require('fawn');
const router=express.Router();

Fawn.init(mongoose);

router.get('/',async(req,res)=>{

    const rentals=await Rental.find().sort('-dateOut');
    res.send(rentals);
});


router.post('/',async(req,res)=>{

    const {error} =validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer=await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send(error.details[0].message);

    const movies=await Movie.findById(req.body.movieId);
    if(!movies)  return res.status(400).send(error.details[0].message);

    let  rentals= new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movies:{
            _id:movies._id,
            title:movies.title,
            dailyRentalRate:movies. dailyRentalRate
       }
    });

    try{

        await new Fawn.Task()
                    .save('rentals',rentals)
                    .update('movies',{_id:movies._id},{
                        $inc:{
                            numberInStock:-1
                        }
                    })
                    .run();
                 res.send(rentals);
    }
    catch(ex){
        res.sendStatus(404).send('Something Went Woong ..');

    }
    

});
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });
  
  module.exports = router; 