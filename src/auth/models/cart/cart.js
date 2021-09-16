'use strict';

const cartModel = (sequelize, DataTypes) => sequelize.define('cart', {
  userId: { type: DataTypes.INTEGER },
  status: { type: DataTypes.BOOLEAN, defaultValue: true},
  // favId: { type: DataTypes.INTEGER, defaultValue: 0},
});

module.exports = cartModel;