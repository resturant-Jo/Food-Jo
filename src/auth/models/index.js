'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const adminModel = require('./admin/adminSchema');
const foodModel = require('./food/foodSchema');
const clientModel = require('./client/clientSchema');
const userModel = require('./users');
const favModel = require('./favSchema/favModel');
const Collection = require('./data-collection.js');


const DATABASE_URL = process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL || 'postgres://buessyxp:CfH3-kmgmqZMDtMVnDqJHS07QRs6io_W@hattie.db.elephantsql.com/buessyxp';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
} : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const client = clientModel(sequelize, DataTypes);
const fav = favModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);
const food = foodModel(sequelize, DataTypes);
const admin = adminModel(sequelize, DataTypes);

user.hasMany(food, { foreignKey: "userId", sourceKey: "id" });
food.belongsTo(user, { foreignKey: "userId", targetKey: "id" });

user.hasMany(client, { foreignKey: "userId", sourceKey: "id" });
client.belongsTo(user, { foreignKey: "userId", targetKey: "id" });

user.hasMany(fav, { foreignKey: "userId", sourceKey: "id" });
fav.belongsTo(user, { foreignKey: "userId", targetKey: "id" });

food.hasMany(fav, { foreignKey: "foodId", sourceKey: "id" });
fav.belongsTo(food, { foreignKey: "foodId", targetKey: "id" });

user.hasMany(admin, { foreignKey: "userId", sourceKey: "id" });
admin.belongsTo(user, { foreignKey: "userId", targetKey: "id" });



module.exports = {
  db: sequelize,
  food: new Collection(food),
  admin: new Collection(admin),
  client: new Collection(client),
  user: new Collection(user),
  fav: new Collection(fav),
  users: userModel(sequelize, DataTypes),
};