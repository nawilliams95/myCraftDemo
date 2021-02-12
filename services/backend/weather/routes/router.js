const express = require('express');
const router = express.Router()
const nationalWeatherService = require('../controllers/nationalWeather');
const LocationRouter = require('./locationRouter');

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(nationalWeatherService);
router.use(LocationRouter);


 module.exports = router;