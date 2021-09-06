'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const adminModel = require('./admin/adminSchema');
const foodModel = require('./user/foodSchema');
const Collection = require('./data-collection.js');
const userModel = require("./users");

const DATABASE_URL = process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL || 'postgres://buessyxp:CfH3-kmgmqZMDtMVnDqJHS07QRs6io_W@hattie.db.elephantsql.com/buessyxp';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
} : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const food = foodModel(sequelize, DataTypes);
const admin = adminModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  admin: new Collection(admin),
  users: userModel(sequelize, DataTypes),
};