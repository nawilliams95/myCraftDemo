const express = require('express');
const ForecastRouter = express.Router();
const ForecastController = require('../controllers/forecastController');

ForecastRouter.get('/forecasts', ForecastController.getAllForecast);
ForecastRouter.post('/forecasts', ForecastController.addForecast);
ForecastRouter.get('/forecasts/:id', ForecastController.getAForecast);
ForecastRouter.get('/forecast/:LocationId', ForecastController.getAllForecastOfLocation);
ForecastRouter.put('/forecasts/:id', ForecastController.updatForecast );
ForecastRouter.delete('/forecast/:LocationId', ForecastController.deleteAllForecasts);

module.exports = ForecastRouter;
