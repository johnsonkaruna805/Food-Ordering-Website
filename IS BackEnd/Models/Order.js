const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
    email:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    menuItems:{
        type:Array,
        require:true
    },
    phone_number:{
        type:Number,
        require:true
    },
    subTotal:{
        type:Number,
        require:true
    }

})
module.exports = mongoose.model('Order',orderSchema,'Order');