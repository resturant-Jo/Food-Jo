'use strict';

const foodModel = (sequelize, DataTypes) => sequelize.define('food', {
  name: { type: DataTypes.STRING, required: true ,allowNull : false},
  flaver: { type: DataTypes.STRING, required: true ,allowNull : false},
  foodType: { type: DataTypes.STRING, required: true ,allowNull : false},
  description : { type: DataTypes.STRING, required: true ,allowNull : false},
  price : { type: DataTypes.STRING, required: true ,allowNull : false }

});

module.exports = foodModel;