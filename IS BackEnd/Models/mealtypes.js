const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MealtypeSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
        meal_type:{
        type:Number,
        required:true,
    }
   
})
module.exports = mongoose.model('Mealtypes',MealtypeSchema,'Mealtypes');
 