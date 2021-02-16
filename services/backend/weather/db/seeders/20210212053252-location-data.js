'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Locations', [{
      cityName: 'Mountain View',
      state: 'CA',
      timeZone: 'Pacific Standard Time(PST) [GMT-8]',
      lat: 37.4267,
      long: -122.0806,
      gridID: 'MTR',
      gridX: 96,
      gridY: 108,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cityName: 'Juneau',
      state: 'AK',
      timeZone: 'Alaska Standard Time(AKST) [GMT-9]',
      lat: 58.3019,
      long: -134.4197,
      gridID: 'AJK',
      gridX: 195,
      gridY: 164,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cityName: 'Phoenix',
      state: 'AZ',
      timeZone: 'Mountain Standard Time(MST) [GMT-7]',
      lat: 33.4811,
      long: -112.0732,
      gridID: 'PSR',
      gridX: 158,
      gridY: 58,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cityName: 'Little Rock',
      state: 'AR',
      timeZone: 'Central Standard Time(CST) [GMT-6]',
      lat: 34.7465,
      long: -92.2896,
      gridID: 'LZK',
      gridX: 81,
      gridY: 72,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cityName: 'Denver',
      state: 'CO',
      timeZone: 'Mountain Standard Time(MST) [GMT-7]',
      lat: 39.7392,
      long: -104.9903,
      gridID: 'BOU',
      gridX: 62,
      gridY: 61,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cityName: 'Birmmingham',
      state: 'AL',
      timeZone: 'Central Standard Time(CST) [GMT-6]',
      lat: 33.5436,
      long: -86.7796,
      gridID: 'BMX',
      gridX: 59,
      gridY: 85,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
