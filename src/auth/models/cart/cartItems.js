'use strict';

const cartItemsModel = (sequelize, DataTypes) => sequelize.define('cartitems', {
  foodId: {type:DataTypes.INTEGER},
  qty: { type: DataTypes.INTEGER },
  price: { type: DataTypes.FLOAT },
  cartId: { type: DataTypes.INTEGER },
  

});

module.exports = cartItemsModel;