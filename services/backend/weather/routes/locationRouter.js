const express = require('express');
const LocationRouter = express.Router();
const LocationController = require('../controllers/locationController');

LocationRouter.get('/locations', LocationController.getAllLocations);
LocationRouter.post('/locations', LocationController.addLocation);
LocationRouter.get('/locations/:id', LocationController.getALocation);
LocationRouter.get('/location/:cityName', LocationController.getLocationByName);
LocationRouter.put('/locations/:id', LocationController.updateLocation);
LocationRouter.delete('/locations/:id', LocationController.deleteLocation);
LocationRouter.delete('/location/:cityName', LocationController.deleteLocationByName);

LocationRouter.get('/test', LocationController.getAllLocatinIds);

module.exports = LocationRouter;