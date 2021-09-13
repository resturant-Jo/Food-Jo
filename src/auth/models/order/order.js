'use strict';

const orderModel = (sequelize, DataTypes) => sequelize.define('order', {
    // restuarantId: { type: DataTypes.INTEGER, allowNull: false },
    // foodId: { type: DataTypes.INTEGER, allowNull: false },
    cartId: { type: DataTypes.INTEGER, allowNull: false }

});

module.exports = orderModel;