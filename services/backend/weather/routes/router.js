const express = require('express');
const router = express.Router()
const nationalWeatherService = require('../controllers/nationalWeather');
const LocationRouter = require('./locationRouter');
const ForecastRouter = require('./forcastRouter');

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(nationalWeatherService);
router.use(LocationRouter);
router.use(ForecastRouter);


 module.exports = router;