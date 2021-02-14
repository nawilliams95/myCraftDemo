const express = require('express');
const NationalWeatherRouter = express.Router();
const axios = require('axios');
const apiAdapter = require('../services/apiAdapterService');
const LocationService = require('../services/locationService');
const ForecastService = require('../services/forecastService');
const dotenv = require('dotenv');
dotenv.config();




//TEMPORAY TEST VERIABLES FOR CONNECTING TO THE WEATHER SERVICE// 


const testLocation = 'Mountain-View'
const testGridID = 'MTR'
const testGridX = 96
const testGridY = 108
//=======================================//

const BASE_URL = process.env.NATIONAL_WEATHER_SERVICE_URL
// const api = apiAdapter(BASE_URL, testGridID, testGridX, testGridY);
const locationidApi = 'http://localhost:8000/api/test';
const forecastaApi = 'http://localhost:8000/api/forecasts';

const formatAMPM = () => {
    var date = new Date();
    var hours = date.getHours();
    var days = date.getDay();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = date + ' ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//^^time helper function 

function dateConverter(currentdate) {
    date = new Date(currentdate);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return year + '-' + month + '-' + dt;
}

//=============================================================================
const getLocationIds = async () => {
    try {
        const response = await axios.get(locationidApi);
        const data = response.data;
        const refinedData = data.data
        const locationIds = refinedData
        console.log(locationIds[1])
        locationIds.forEach(index => {
            let locationID = index.id;
            let apiUrl = apiAdapter(BASE_URL, index.gridID, index.gridX, index.gridY);
            getForecastData(apiUrl, locationID)
        });
    } catch (err) {
        console.error(err)
    }
}

const getForecastData = async (api, id) => {
    try {
        const response2 = await axios.get(api);
        const data = response2.data;
        const forecastData = data.properties.periods
        forecastData.forEach(index => {
            sendForecasts(index, id)
        })
    } catch (err) {
        console.error(err)
    }
}

const sendForecasts = async (data, id) => {
    try {
        const response3 = await axios.post(forecastaApi, {

            date: dateConverter(data.startTime),
            lastUpdated: formatAMPM(),
            day: data.name,
            highTemp: data.temperature,
            lowTemp: data.temperature - 4,
            shortCast: data.shortForecast,
            longCast: data.detailedForecast,
            LocationId: id

        });
        const data3 = response3.data;
        console.log(data3)
    } catch (err) {
        console.error(err)
    }
}

// getLocationIds();

///////////////////////////
//INDEX
//////////////////////////


// NationalWeatherRouter.get(`/national/${testLocation}/forecast`, (req, res) => {
//     axios.get(api).then(resp => {
//         const data = resp.data
//         res.status(200).json({
//             message: 'Success!',
//             updatedAt: formatAMPM(),
//             nationalWeatherServiceLive: api,
//             forecast: data.properties.periods
//         })
//     })
// })

module.exports = NationalWeatherRouter
