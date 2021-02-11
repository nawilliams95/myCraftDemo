const express = require('express');
const router = express.Router()
const nationalWeatherService = require('../controllers/nationalWeather');

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(nationalWeatherService);

module.exports = router