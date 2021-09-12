'use strict';

const cartModel = (sequelize, DataTypes) => sequelize.define('cart', {
  foodId: {type:DataTypes.INTEGER},
  userId: { type: DataTypes.INTEGER },

});

module.exports = cartModel;