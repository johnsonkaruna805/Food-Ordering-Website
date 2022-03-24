const locations = require('../Models/locations');
exports.getlocations = (req,res)=>
{
    locations.find().then(
        response=>{
            res.status(200).json({locations:response})
        }
    ).catch(
        err=>{
            res.status(500).json({error:err})
        }
    )
}
