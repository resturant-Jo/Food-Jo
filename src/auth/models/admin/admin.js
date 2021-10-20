"use strict";

const adminModel = (sequelize, DataTypes) => {
  const model = sequelize.define("admin", {
    support: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    userId:{type: DataTypes.INTEGER },
  });
  return model;
};

module.exports = adminModel;