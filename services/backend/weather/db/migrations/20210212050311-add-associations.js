
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Forecasts', // name of Source model
      'LocationId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Forecasts', // name of Source model
      'LocationId' // key we want to remove
    );
  }
};
