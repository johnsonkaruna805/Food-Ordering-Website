const Restaurant = require('../Models/restaurants');
const Item = require('../Models/menuitems');

exports.filterRestaurants = (req, res) => {
    let filterPayload = {};

        const reqBody = req.body;
        const location = reqBody.location;
        const mealtype = reqBody.mealtype;
        const cuisine = reqBody.cuisine;
        const lcost = reqBody.lcost;
        const hcost = reqBody.hcost;
        const sort = reqBody.sort ? reqBody.sort : 1;
        const page = reqBody.page ? reqBody.page : 1;

        const perPageCount = reqBody.perPageCount ? reqBody.perPageCount :5 ;
        const startIndex = (page * perPageCount) - perPageCount;
        const endIndex = (page * perPageCount);


    if (mealtype) {
        filterPayload = {
            mealtype_id: mealtype
        }
    }
    if (mealtype && cuisine) {
        filterPayload = {
            mealtype_id: mealtype,
            cuisine_id: { $in: cuisine }
        }
    }

   if (mealtype && hcost && lcost) {
        filterPayload = {
            mealtype_id: mealtype,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }

    
    if (mealtype && cuisine && lcost && hcost) {
        filterPayload = {
            mealtype_id: mealtype,
            cuisine_id: { $in: cuisine },
            min_price: { $lte: hcost, $gte: lcost }
        }
    }

    if (mealtype && location) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location
        }
    }

    if (mealtype && location && cuisine) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: { $in: cuisine }
        }
    }

    if (mealtype && location && lcost && hcost) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }

    if (mealtype && location && cuisine && lcost && hcost) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: { $in: cuisine },
            min_price: { $lte: hcost, $gte: lcost }
        }
    } 


    Restaurant.find(filterPayload).sort({ min_price: sort })
        .then(response => {
            const count = Math.ceil(response.length / perPageCount);
            const pageCountArr = [];
            const filteredResponse = response.slice(startIndex, endIndex);
            for (var i = 1; i <= count; i++) 
            {           
                pageCountArr.push(i);       
             }
            res.status(200).json({ message: "Restaurants Fetched Succesfully", restaurant: filteredResponse,pageCount: pageCountArr, totalCount: response.length })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getItemsByRestaurant = (req, res) => {
    const resid = req.params.resid;
    Item.find({ resid: resid }).then(result => {
        res.status(200).json({ message: "Restaurant Items Fetched Sucessfully", itemsList: result })
    }).catch(err => console.log(err));
}

exports.getRestaurantById = (req, res, next) => {
    const resid = req.params.resid;
    Restaurant.findById(resid).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: result })
    }).catch(err => console.log(err));
}


exports.getRestaurantByCity = (req, res) => {
    const cityId = req.params.cityId;
    Restaurant.find({ location_id: cityId }).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurantList: result })
    }).catch(err => console.log(err));
}