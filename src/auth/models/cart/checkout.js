'use strict';

const checkoutModel = (sequelize, DataTypes) => sequelize.define('checkout', {
  cartId: {type:DataTypes.INTEGER},
  firstName: { type: DataTypes.STRING, allowNull: false},
  lastName: { type: DataTypes.STRING ,allowNull: false},
  company: { type: DataTypes.STRING ,allowNull: false},
  address1: { type: DataTypes.STRING ,allowNull: false},
  address2: { type: DataTypes.STRING ,allowNull: false},
  city: { type: DataTypes.STRING ,allowNull: false},
  country: { type: DataTypes.STRING ,allowNull: false},
  postCode: { type: DataTypes.INTEGER ,allowNull: false},
  phone: { type: DataTypes.INTEGER ,allowNull: false},
  email: { type: DataTypes.STRING ,allowNull: false},
  

});

module.exports = checkoutModel;