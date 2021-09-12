'use strict';

const reviewModel = (sequelize, DataTypes) => sequelize.define('review', {
    reviews: { type: DataTypes.INTEGER, defaultValue:0 },
    likes: { type: DataTypes.INTEGER, defaultValue:0 },
    foodId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },


});

module.exports = reviewModel;