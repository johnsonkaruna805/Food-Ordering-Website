const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuitemsSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:Number,
        required:true,
    },
    ingridients:{
        type:Array
    },
    restaurantId:{
        type:String
    },
    image:{
        type:String
    },
    qty:{
        type:Number
    },
    price:{
        type:Number
    }

})
module.exports = mongoose.model('Items', MenuitemsSchema,'Items');
 