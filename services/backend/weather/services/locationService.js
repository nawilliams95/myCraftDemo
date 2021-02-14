const db = require('../db/models');

class LocationService {
    static async getAllLocations() {
        try {
            return await db.Location.findAll();
        } catch (err) {
            throw err;
        }
    }
    
    static async addLocation(newLocation) {
        try {
            return await db.Location.create(newLocation);
        } catch (err) {
            throw err;
        }
    }

    static async getAllLocationIds() {
        try {
            const allLocationIds = await db.Location.findAll({
                attributes: [
                    'id',
                    'gridID',
                    'gridX',
                    'gridY'
                ]
            });
            return allLocationIds;
        } catch (err) {
            throw err;
        }
    }

    

    static async updateLocation(id, updateLocation) {
        try {
            const locationToUpdate = await db.Location.findOne({
                where: { 
                    id: Number(id) 
                }
            });

            if (locationToUpdate) {
                await db.Location.update(updateLocation, {where: { id: Number(id) } });
                return updateLocation;
            }
            return null;
        } catch (err) {
            throw err;
        }
    }

    static async getALocation(id) {
        try {
            const theLocation = await db.Location.findOne({
                where: {
                    id: Number(id)
                }
            });
            return theLocation;
        } catch (err) {
            throw err;
        }
    }

    static async getLocationByName(cityName) {
        try {
            const namedLocation = await db.Location.findOne({
                where: {
                    cityName: String(cityName)
                }
            });
            return namedLocation;
        } catch (err) {
            throw err;
        }
    }

    static async deleteLocation(id) {
        try {
            const locationToDelete = await db.Location.findOne({
                where: { 
                    id: Number(id) 
                }
            });

            if (locationToDelete) {
                const deletedLocation = await db.Location.destroy({
                    where: { 
                        id: Number(id) 
                    } 
                });
                return deletedLocation;
            }
            return null;
        } catch (err) {
            throw err;
        }
    }

    static async deleteLocationByName(cityName) {
        try {
            const locationToDelete = await db.Location.findOne({
                where: { 
                    cityName: String(cityName) 
                }
            });

            if (locationToDelete) {
                const deletedLocation = await db.Location.destroy({
                    where: { 
                        cityName: String(cityName) 
                    } 
                });
                return deletedLocation;
            }
            return null;
        } catch (err) {
            throw err;
        }
    }


}

module.exports = LocationService;