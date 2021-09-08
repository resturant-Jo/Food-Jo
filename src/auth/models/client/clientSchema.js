'use strict';

const uaserModel = (sequelize, DataTypes) => sequelize.define('user', {
  favFood: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
  favRestaurant: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
  location: { type: DataTypes.STRING, required: true ,allowNull : false},
  date : { type: DataTypes.STRING, required: true ,allowNull : false},
  chat : { type: DataTypes.STRING, required: true ,allowNull : false },
  userId: { type: DataTypes.INTEGER },


});

module.exports = uaserModel;