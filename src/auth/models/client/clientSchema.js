'use strict';

const clientModel = (sequelize, DataTypes) => sequelize.define('client', {
  favFood: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
  favRestaurant: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
  location: { type: DataTypes.STRING, required: true ,allowNull : false},
  date : { type: DataTypes.STRING, required: true ,allowNull : false,defaultValue: new Date()},
  userId: { type: DataTypes.INTEGER },


});

module.exports = clientModel;