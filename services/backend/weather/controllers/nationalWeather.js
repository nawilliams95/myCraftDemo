const express = require('express');
const NationalWeatherRouter = express.Router();
const axios = require('axios');
const apiAdapter = require('../services/apiAdapterService');
const dotenv = require('dotenv');
dotenv.config();

//TEMPORAY TEST VERIABLES FOR CONNECTING TO THE WEATHER SERVICE// 

const testLocation = 'Mountain-View'
const testGridID = 'MTR'
const testGridX = 96
const testGridY = 108
//=======================================//

const BASE_URL = process.env.NATIONAL_WEATHER_SERVICE_URL
const api = apiAdapter(BASE_URL, testGridID, testGridX, testGridY);



const formatAMPM = () => {
    var date = new Date();
    var hours = date.getHours();
    var days = date.getDay(); 
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = date + ' ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//^^time helper function 

///////////////////////////
//INDEX
//////////////////////////


NationalWeatherRouter.get(`/national/${testLocation}/forecast`, (req, res) => {
    axios.get(api).then (resp => {
        const data = resp.data
        res.status(200).json({
            message: 'Success!',
            updatedAt: formatAMPM(),
            nationalWeatherServiceLive: api,
            forecast: data.properties.periods
        })
    })
})

module.exports = NationalWeatherRouter
