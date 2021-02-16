const ForecastService = require('../services/forecastService');
const Util = require('../utils/utils');

const util = new Util();

class ForecastController {
    static async getAllForecast(req, res) {
        try {
            const allforecasts = await ForecastService.getAllForecasts();
            if (allforecasts.length > 0) {
                util.setSuccess(200, 'All Forecasts have been retreived! whoohoo! do ya dance', allforecasts);
            } else {
                util.setSuccess(200, 'Greate well we got to the forecsat API but there are NO FORECASTS FOUND');
            }
            return util.send(res);
        } catch (err) {
            util.setErr(400, err)
            return util.send(res);
        }
    }

    static async addForecast(req, res) {
        if (!req.body.number || !req.body.date || !req.body.lastUpdated || !req.body.day || !req.body.highTemp || !req.body.lowTemp || !req.body.shortCast || !req.body.longCast || !req.body.LocationId) {
            util.setErr(400, 'Please provide complete details. All fields are required');
            return util.send(res);
        }
        const newForecast = req.body;
        try {
            const createdForecast = await ForecastService.addForecast(newForecast);
            util.setSuccess(201, 'Forecaste was created and added to the APi YAY!!', createdForecast);
            return util.send(res);
        } catch (err) {
            util.setErr(400, console.error(err))
            return util.send(res);
        }
    }

    static async updatForecast(req, res) {
        const editedForecast = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setErr(400, 'Plese input a valid numeric ID...Jeezz you do know what a number is?');
            return util.send(res);
        }
        try {
            const updatedForecast = await ForecastService.updateForecast(id, editedForecast);
            if (!updatedForecast) {
                util.setErr(404, `Could not find Forecast with id: ${id}. please try again :P`);
            } else {
                util.setSuccess(200, 'Forecast was updated. Good Job love.', updatedForecast);
            }
            return util.send(res);
        } catch (err) {
            util.setErr(404, err);
            return util.send(res);
        }
    }

    static async getAForecast(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setErr(400, 'Please input a valid numeric ID value.... I mean is that too much to ask?');
            return util.send(res);
        }
        try {
            const theForecast = await ForecastService.getAForecast(id);
            if(!theForecast) {
                util.setErr(404, `Could not find Forecast with the id: ${id}. please try again :)`);
            } else {
                util.setSuccess(200, 'Oh look what I found!', theForecast);
            }
            return util.send(res);
        } catch (err) {
            util.setErr(404, err);
            return util.send(res);
        }
    }

    static async getAllForecastOfLocation(req, res) {
        const { LocationId } = req.params;

        if(!Number(LocationId)) {
            util.setErr(400, 'Please input a valid LocationID.... I mean seriously?');
            return util.send(res);
        }
        try {
            const theLocationForecasts = await ForecastService.getAllForecastOfLocation(LocationId);
            if(!theLocationForecasts) {
                util.setErr(404, `Could not find any Forecasts with LocationId : ${LocationId}. please try again :)`);
            } else {
                util.setSuccess(200, 'Oh look what I found!', theLocationForecasts);
            }
            return util.send(res);
        } catch (err) {
            util.setErr(404, err);
            return util.send(res);
        }
    }

    static async deleteAllForecasts(req, res) {
        const { LocationId } = req.params;
        if (!Number(LocationId)) {
            util.setErr(400, 'Please input a valid numeric LocationID value....I know your eager to get rid of all these Forecasts from this location but I need a proper locationID ok?');
            return util.send(res);
        }
        try {
            const forecastsToDelete = await ForecastService.deleteAllForecasts(LocationId);
            if (forecastsToDelete) {
                util.setSuccess(204, 'Say bye-bye-bye...ALL Forecasts belonging to this location has been deleted...forever!!!');
            } else {
                util.setErr(404, `Ummm... the Forecasts with the Locationid ${LocationId} could not be found...do you need help??`)
            }
            return util.send(res);
        } catch (err) {
            util.setErr(400, err);
            return util.send(res);
        }
    }

}

module.exports = ForecastController;