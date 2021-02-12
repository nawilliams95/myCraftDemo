module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    cityName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeZone : {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    }, 
    long: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    gridID: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    gridX: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    gridY: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
 });

 Location.associate = models => {
   Location.hasMany(models.Forecast);
 };
 
 return Location;
};
