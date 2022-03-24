
const { response } = require('express');
const UsersData =  require('../Models/User');


exports.createUser = (req,res) => {
    const reqBody = req.body;
    const email = reqBody.email ;
    const password =reqBody.password;
    const firstName = reqBody.firstName;
    const lastName =reqBody.lastName;
     const addUser = new UsersData({email,password,firstName,lastName});
     addUser.save().then(response =>
        {
            res.status(200).json({message : "Successfull",users : response})
        }).catch(err =>
            {
                res.status(500).json({message : "Error",location : err})   
            })    
}

exports.loginUser = (req,res) => {
        const { email,password} = req.body;
        UsersData.find({email:email,password:password})
        .then(response =>
            {
                res.status(200).json({message: "Fetched", users : response});
                console.log(response);
            }).catch(
                err =>
                res.status(500).json({error :err})
            )
}














