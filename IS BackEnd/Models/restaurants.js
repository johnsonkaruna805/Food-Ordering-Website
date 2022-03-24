const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RestaurantsSchema = new Schema({
    name:{
        type:String,
   
    },
    city:{
        type:String,
       
    }, location_id:{
        type:Number,
        required:true,
    },
    city_id:{
        type:Number,
        required:true,
    },
    locality:{
        type:String
    },
    thumb:{
        type:Array
    },
      
    aggregate_rating:{
        type:Number

    },
    rating_text:{
        type:String

    },
    
    min_price:{
        type:Number

    },

    contact_number:{
        type:Number

    },
  
    cuisine:{
        type:Array
    },
    image:{
        type:String

    },
    

    mealtype_id:{
        type:Number,
        required:true,
    },

})
module.exports = mongoose.model('Restaurants',RestaurantsSchema,'Restaurants');
 