//////////////////////////////////////
// DEPENDINCES
/////////////////////////////////////

const express = require('express'); //makes use of the Express pakge (node webframework that allows you to structure and create differnt HTTP req to a spacific URL) 
const app = express(); //Calling Express 
const PORT = process.env.PORT || 8000; //crates a PORT variable andmakes its value whatever i set port to in my .env file or 8000.
const router = require('./routes/router'); //calles the router to rerout pages to the right place
const cors = require('cors');

/////////////////////////////////////
//MIDDLEWARE
////////////////////////////////////

app.use(cors());

app.use(express.json()); //call the built in express method for recognizing JSON objects for PUT/POST requests

app.use(express.urlencoded({ extended: false }));


//////////////////////////////////////
// TEST ROUTE/DEFAULT
/////////////////////////////////////
app.get("/", (req, res) => {
    res.status(200).json({
        website: "Karri's Craft Demo Weather API",
        info: "Designed to house info on multiple major cities and thier 10-dayforecats. The fortcast is updated with daily data from the the NationalWeatherService.gov",
        message: "Hello World! Whats the weather like today? Welcome to the weather API"
    });
});

//////////////////////////////////
//USE ROUTER
/////////////////////////////////

app.use('/api', router);


//////////////////////////////////////
// LISTENERS
/////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Big Brother is listening.....on PORT ${PORT}`);
}); //listens  for port connection and lets me know if my server is running on the propper port. 

module.exports = app;