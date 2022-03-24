const menuitems = require('../Models/menuitems');

exports.getmenuitemsbyresid = (req,res)=>
{
    const resid = req.params.resid;
   menuitems.find({restaurantId:resid}).then(
        response=>{
            res.status(200).json({menuitems:response})
        }
    ).catch(
        err=>{
            res.status(500).json({error:err})
        }
    )
}