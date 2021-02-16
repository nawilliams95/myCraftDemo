const express = require('express');
const schedule = require('node-schedule');
const NationalWeatherRouter = express.Router();
const axios = require('axios');
const apiAdapter = require('../services/apiAdapterService');
const dotenv = require('dotenv');


dotenv.config();

const BASE_URL = process.env.NATIONAL_WEATHER_SERVICE_URL;
const locationidApi = process.env.LOCATION_ID_URL;
const forecastaApi = process.env.FORECAST_URL;
const DELETE_URL = process.env.DELETE_URL;
/* 
 the National weather service api call. setup to operate as a scheduled as a function to run 2x's daily. It works along with 3 other helper/callback functions as well as 2 small converter functions. it currently hit the location id roue andd gets all location id info. the cycles through each on for and plugs it into the api url for the national weather service. it then takes the forcast info it gets from that call and stores it in a variable then loops through that info and configures it for our foecast api. and finally it then goes through and stores it via POST req to our api. Wheewwhh lol. all route have been tested and run. I will now add in chron job and the delete call.

*/



////////////////////////////////
///THE MAIN FUNCTION/ TIMER
///////////////////////////////

// const rule = new schedule.RecurrenceRule();
// rule.minute = 48;
// rule.tz = 'America/New_York'

// const dailyPull = schedule.scheduleJob(rule, function() {
//     console.log('fetching new forecasts at: ' + formatAMPM());
//     getLocationIds();
// });

// const rule2 = new schedule.RecurrenceRule();
// rule.hour = 20;
// rule.tz = 'America/New_York'

// const dailyPull2 = schedule.scheduleJob(rule2, function() {
//     console.log('fetching new forecasts at: ' + formatAMPM());
//     getLocationIds();
// });




//////////////////////////////////////
//DATE AND TIME HELPERS
////////////////////////////////////

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

/////////////////////////////////////
//FORECAST HELPER FUNCTIONS
////////////////////////////////////

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
    deleteForecasts(id);
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

            number: data.number,
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
        console.log('Success! forecasts sent')
    } catch (err) {
        console.error(err)
    }
}

const deleteForecasts = async (id) => {
    try {
        const response = await axios.delete(`${DELETE_URL}/${id}`);
        const result = response.data;
        console.log(result);
    } catch (err) {
        console.error(err)
    }
}



module.exports = NationalWeatherRouter
