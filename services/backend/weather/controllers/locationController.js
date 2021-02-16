const LocationService = require('../services/locationService');
const Util = require('../utils/utils');

const util = new Util();

class LocationController {
    static async getAllLocations(req, res) {
        try {
            const allLocations = await LocationService.getAllLocations();
            if (allLocations.length > 0) {
                util.setSuccess(200, 'All Locations have been successfully retrieved! Whoo-hoo!', allLocations);
            } else {
                util.setSuccess(200, 'Good, you made it here but.... there are NO LOCATIONS FOUND');
            }

            return util.send(res);
        } catch (err) {
            util.setErr(400, err);
            return util.send(res);
        }
    }

    static async getAllLocatinIds(req, res) {
        try {
            const allLocationIds = await LocationService.getAllLocationIds();
            if (allLocationIds.length > 0) {
                util.setSuccess(200, 'All Location IDs have been successfully retrieved! Whoo-hoo!', allLocationIds);
            } else {
                util.setSuccess(200, 'Good, you made it here but.... there are NO LOCATION IDs FOUND');
            }
            console.log('Success')
            return util.send(res);
        } catch (err) {
            throw err;
        }
    }

    static async addLocation(req, res) {
        if (!req.body.cityName || !req.body.state || !req.body.timeZone || !req.body.lat || !req.body.long || !req.body.gridID || !req.body.gridX || !req.body.gridY) {
            util.setErr(400, 'Please provide complete details. All fields are required');
            return util.send(res);
        }
        const newLocation = req.body;
        try {
            const createdLocation = await LocationService.addLocation(newLocation);
            util.setSuccess(201, 'Location was Sucessfully added! Yay!', createdLocation);
            return util.send(res);
        } catch (err) {
            util.setErr(400, error.message)
            return util.send(res);
        }
    }

    static async updateLocation(req, res) {
        const editedLocation = req.body;
        const { id } = req.params; // could also be written const id = req.params.id
        if (!Number(id)) {
            util.setErr(400, 'Please input a valid numeric ID value.... I mean is that too much to ask?');
            return util.send(res);
        }
        try {
            const updatedLocation = await LocationService.updateLocation(id, editedLocation);
            if (!updatedLocation) {
                util.setErr(404, `Could not find Location with the id: ${id}. please try again :)`);
            } else {
                util.setSuccess(200, 'Location was successfully updated! good job buddy.', updatedLocation);
            }
            return util.send(res);
        } catch (err) {
            util.setErr(404, err);
            return util.send(res);
        }
        
    }

    static async getALocation(req, res) {
        const { id } = req.params; 

        if (!Number(id)) {
            util.setErr(400, 'Please input a valid numeric ID value.... I mean is that too much to ask?');
            return util.send(res);
        }
        try {
            const theLocation = await LocationService.getALocation(id);
            if(!theLocation) {
                util.setErr(404, `Could not find Location with the id: ${id}. please try again :)`);
            } else {
                util.setSuccess(200, 'Oh look what I found!', theLocation);
            }
            return util.send(res);
        } catch (err) {
            util.setErr(404, err);
            return util.send(res);
        }
    }

    static async getLocationByName(req, res) {
        const { cityName } = req.params; 

        if (!String(cityName)) {
            util.setErr(400, 'Please input a valid Name.... I mean seriously?');
            return util.send(res);
        }
        try {
            const theNamedLocation = await LocationService.getLocationByName(cityName);
            if(!theNamedLocation) {
                util.setErr(404, `Could not find Location with the city name: ${cityName}. please try again :)`);
            } else {
                util.setSuccess(200, 'Oh look what I found!', theNamedLocation);
            }
            return util.send(res);
        } catch (err) {
            util.setErr(404, err);
            return util.send(res);
        }
    }

    static async deleteLocation(req, res) {
        const { id } = req.params;
        if (!Number(id)) {
            util.setErr(400, 'Please input a valid numeric ID value....I know your eager to get rid of this Location but I need a proper ID ok?');
            return util.send(res);
        }
        try {
            const locationToDelete = await LocationService.deleteLocation(id);
            if (locationToDelete) {
                util.setSuccess(204, 'Say bye-bye-bye...Location has been deleted...forever!!!');
            } else {
                util.setErr(404, `Ummm... the Location with the id ${id} could not be found...do you need help??`)
            }
            return util.send(res);
        } catch (err) {
            util.setErr(400, err);
            return util.send(res);
        }
    }

    static async deleteLocationByName(req, res) {
        const { cityName } = req.params;
        if (!String(cityName)) {
            util.setErr(400, 'Please input a valid city name....I know your pressed to get rid of this Location but I need the right name?');
            return util.send(res);
        }
        try {
            const locationToDelete = await LocationService.deleteLocationByName(cityName);
            if (locationToDelete) {
                util.setSuccess(204, 'Its hard to say good-bye... actually its not! Location has been deleted...forever!!!');
            } else {
                util.setErr(404, `Ummm... the Location with the city name ${cityName} could not be found...do you need help??`)
            }
            return util.send(res);
        } catch (err) {
            util.setErr(400, err);
            return util.send(res);
        }
    }
}

module.exports = LocationController; 