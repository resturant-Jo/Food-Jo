'use strict';

const adminModel = (sequelize, DataTypes) => sequelize.define('admin', {
  username: { type: DataTypes.STRING, required: true ,allowNull : false},
  password: { type: DataTypes.STRING, required: true ,allowNull : false},
  email: { type: DataTypes.STRING, required: true , allowNull : false},
  image: { type: DataTypes.STRING, required: true , allowNull : false},
  userId: { type: DataTypes.INTEGER },
});

module.exports = adminModel;