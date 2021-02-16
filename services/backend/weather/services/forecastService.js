const db = require('../db/models');

class ForecastService {
    static async getAllForecasts() {
        try {
            return await db.Forecast.findAll();
        } catch (err) {
            throw err;
        }
    }

    static async addForecast(newForecast) {
        try {
            return await db.Forecast.create(newForecast);
        } catch (err) {
            throw err;
        }
    }

    static async updateForecast(id, updateForecast) {
        try {
            const foecastToUpdate = await db.Forecast.findOne({
                where: {
                    id: Number(id)
                }
            });

            if (foecastToUpdate) {
                await db.Forecast.update(updateForecast, {where: {id: Number(id) } });
                return updateForecast;
            }
            return null;
        } catch (err) {
            throw err;
        }
    }

    static async getAllForecastOfLocation(LocationId) {
        try {
            const theLocationsForecasts =  await db.Forecast.findAll({
                where: {
                    LocationId: Number(LocationId)
                },
                order: [
                    ['number', 'ASC'],
                ]
            });
            return theLocationsForecasts;
        } catch (err) {
            throw err;
        }
    }

    static async getAForecast(id) {
        try {
            const theForecast = await db.Forecast.findOne({
                where: {
                    id: Number(id)
                }
            });
            return theForecast;
        } catch (err) {
            throw err;
        }
    }

    static async deleteAllForecasts(LocationId) {
        try {
            const deletedForecasts = await db.Forecast.destroy({
                where: {
                    LocationId: Number(LocationId)
                }
            });
            return deletedForecasts;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ForecastService;