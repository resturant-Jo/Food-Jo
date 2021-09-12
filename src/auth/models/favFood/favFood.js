'use strict';

const favModel = (sequelize, DataTypes) => sequelize.define('fav', {
  foodId: {type:DataTypes.INTEGER},
  userId: { type: DataTypes.INTEGER },


});

module.exports = favModel;