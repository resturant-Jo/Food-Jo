'use strict';

const restuarantModel = (sequelize, DataTypes) => sequelize.define('restuarant', {
  name: { type: DataTypes.STRING, required: true ,allowNull : false},
  image: { type: DataTypes.STRING, required: true ,allowNull : false},
  foodType: { type: DataTypes.STRING, required: true ,allowNull : false},
  location: { type: DataTypes.STRING, required: true ,allowNull : false},
  description : { type: DataTypes.STRING, required: true ,allowNull : false },
  userId: { type: DataTypes.INTEGER,allowNull:false },

});

module.exports = restuarantModel;