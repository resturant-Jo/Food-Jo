'use strict';

const foodModel = (sequelize, DataTypes) => sequelize.define('food', {
  name: { type: DataTypes.STRING, required: true ,allowNull : false},
  image: { type: DataTypes.STRING, required: true ,allowNull : false},
  description: { type: DataTypes.STRING, required: true ,allowNull : false},
  price : { type: DataTypes.STRING, required: true ,allowNull : false },
  userId: { type: DataTypes.INTEGER,allowNull:false },

});

module.exports = foodModel;