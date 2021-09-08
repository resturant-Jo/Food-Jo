'use strict';

const restaurantModel = (sequelize, DataTypes) => sequelize.define('restaurant', {
    foodname: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    flavour: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    description: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    location: { type: DataTypes.STRING, required: true, allowNull: false },
    price: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    userId: { type: DataTypes.INTEGER },

});

module.exports = restaurantModel;