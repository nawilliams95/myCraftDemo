

module.exports = (baseURL, gridID, gridX, gridY) => {
  return  `${baseURL}${gridID}/${gridX},${gridY}/forecast`
  
}

//This converts the base weatherserveice API url to the location spacifice forecast url so we can get the weekly forecast for that spacific location since the url is unique to each location in the NationalWeatherService.gov  API.  the GridID, GridX, and GridY are supplyed in the API and have been preiviously looked up and save to the locations database in our API. we will use that info to call the weather service api. 