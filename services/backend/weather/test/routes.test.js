const request = require('supertest');
const app = require('../server');

describe('Weather API', () => {
    test('Should SHOW all locations', async () => {
        const res = await request(app).get('/api/locations');
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
    }),
        test('Should SHOW a locations by ID', async () => {
            const res = await request(app).get('/api/locations/3');
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('data');
        }),
        test('Should SHOW a locations by NAME', async () => {
            const res = await request(app).get('/api/location/Phoenix');
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('data');
        }),
        test('Should CREATE a new location', async () => {
            const res = await request(app)
                .post('/api/locations')
                .send({
                    "cityName": "Jest",
                    "state": "AL",
                    "timeZone": "Central Standard Time(CST) [GMT-6]",
                    "lat": 33.5436,
                    "long": -86.7796,
                    "gridID": "BMX",
                    "gridX": 59,
                    "gridY": 85
                })
            expect(res.status).toEqual(201);
            expect(res.body).toHaveProperty('data');
        }),
        test('Should UPDATE a location', async () => {
            const res = await request(app)
                .put('/api/locations/4')
                .send({
                    "cityName": "Edit",
                    "state": "AL",
                    "timeZone": "My Standard Time(CST) [GMT-6]",
                    "lat": 33.5436,
                    "long": -86.7796,
                    "gridID": "BMX",
                    "gridX": 59,
                    "gridY": 85
                })
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('data');
        }),
        test('Should DELETE a location by ID', async () => {
            const res = await request(app).del('/api/locations/4');
            expect(res.status).toEqual(204);
        }),
        test('Should DELETE a location by NAME', async () => {
            const res = await request(app).del('/api/location/Jest');
            expect(res.status).toEqual(204);
        })
});