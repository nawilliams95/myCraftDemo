module.exports = (sequelize, DataTypes) => {
  const Forecast = sequelize.define('Forecast', {
    date: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lastUpdated: {
      type:DataTypes.STRING,
      allowNull: false
    },
    day: {
      type:DataTypes.STRING,
      allowNull: false
    },
    highTemp: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    lowTemp: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    shortCast: {
      type:DataTypes.STRING,
      allowNull: false
    },
    longCast: {
      type:DataTypes.TEXT,
      allowNull: false
    }
  });
  return Forecast;
}
