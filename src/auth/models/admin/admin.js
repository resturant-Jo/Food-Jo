"use strict";

const adminModel = (sequelize, DataTypes) => {
  const model = sequelize.define("admin", {
    support: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    userId:{type: DataTypes.INTEGER },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: "https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg",
    },
  });
  return model;
};

module.exports = adminModel;