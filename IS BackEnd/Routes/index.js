const express = require('express');
const route = express.Router();
const locationcontroller = require('../Controllers/locations');
const mealtypecontroller = require('../Controllers/mealtypes');
const restaurantcontroller= require('../Controllers/restaurants');
const menuitemscontroller = require('../Controllers/menuitems')
const paymentGatewayController = require('../Controllers/PaymentGateway');
const usercontroller = require('../Controllers/User');
const orders = require('../Controllers/Order');




route.get('/locations',locationcontroller.getlocations);
route.get('/mealtypes',mealtypecontroller.getmealtypes);
route.get('/restaurants/:cityId',restaurantcontroller.getRestaurantByCity);
route.get('/restaurant/:resid',restaurantcontroller.getRestaurantById);
route.get('/getmenu/:resid',restaurantcontroller.getItemsByRestaurant);
route.get('/menuitems/:resid',menuitemscontroller.getmenuitemsbyresid);
route.post('/filter',restaurantcontroller.filterRestaurants);
route.post('/payment',paymentGatewayController.payment);
route.post('/paymentCallback',paymentGatewayController.paymentCallback);
route.post('/login',usercontroller.loginUser);
route.post('/signup',usercontroller.createUser);
route.post('/orders',orders.myOrder);

module.exports = route;
