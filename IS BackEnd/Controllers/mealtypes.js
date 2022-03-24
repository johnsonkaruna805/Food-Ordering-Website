const mealtypes = require('../Models/mealtypes');

exports.getmealtypes = (req,res)=>
{
    mealtypes.find().then(
        response=>{
            res.status(200).json({mealtypes:response})
        }
    ).catch(
        err=>{
            res.status(500).json({error:err})
        }
    )
}