module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Forecasts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastUpdated: {
        allowNull: false,
        type: Sequelize.STRING
      },
      day: {
        allowNull: false,
        type: Sequelize.STRING
      },
      highTemp: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      lowTemp: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      shortCast: {
        allowNull: false,
        type: Sequelize.STRING
      },
      longCast: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Forecasts');
  }
};