const orders = require('../Models/Order')

exports.myOrder=(req,res)=>{
    const { email, firstName,lastName,menuItems,address,subTotal,phone_number } = req.body;
    orders.find({ email: email })
    const userorder = new orders({
        email: email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone_number:phone_number,
        menuItems: menuItems,
        subTotal: subTotal,
    });
    userorder.save().then(response => {
            res.status(200).json({ message: "orders feactched Succesfully", orders: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
