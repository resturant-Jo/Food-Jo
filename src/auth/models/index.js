'use strict';

const { Sequelize, DataTypes } = require('sequelize');
// const adminModel = require('./admin/adminSchema');
const foodModel = require('./food/foodSchema');
const cartModel = require('./cart/cart');
const userModel = require('./users');
const favModel = require('./favFood/favFood');
const orderModel = require('./order/order');
const restuarantModel = require('./restuarant/restuarant');
const Collection = require('./data-collection.js');


const DATABASE_URL = process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL || 'postgres://qcdnkrcj:acDs3KhLbsnKYWDGtrO_VcJ8slutwZug@chunee.db.elephantsql.com/qcdnkrcj';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
} : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const user = userModel(sequelize, DataTypes);
const restuarant = restuarantModel(sequelize, DataTypes);
const food = foodModel(sequelize, DataTypes);
const cart = cartModel(sequelize, DataTypes);
const fav = favModel(sequelize, DataTypes);
const order = orderModel(sequelize, DataTypes);

user.hasMany(restuarant, { foreignKey: "userId", sourceKey: "id" });
restuarant.belongsTo(user, { foreignKey: "userId", targetKey: "id" });

restuarant.hasMany(food, { foreignKey: "restuarantId", sourceKey: "id" });
food.belongsTo(restuarant, { foreignKey: "restuarantId", targetKey: "id" });

restuarant.hasMany(cart, { foreignKey: "foodId", sourceKey: "id" });
cart.belongsTo(restuarant, { foreignKey: "foodId", targetKey: "id" });

cart.hasMany(order, { foreignKey: "cartId", sourceKey: "id" });
order.belongsTo(cart, { foreignKey: "cartId", targetKey: "id" });

food.hasMany(fav, { foreignKey: "foodId", sourceKey: "id" });
fav.belongsTo(food, { foreignKey: "foodId", targetKey: "id" });

food.hasMany(cart, { foreignKey: "foodId", sourceKey: "id" });
cart.belongsTo(food, { foreignKey: "foodId", targetKey: "id" });




module.exports = {
  db: sequelize,
  user: new Collection(user),
  restuarant: new Collection(restuarant),
  food: new Collection(food),
  fav: new Collection(fav),
  cart: new Collection(cart),
  order: new Collection(order),
  users: userModel(sequelize, DataTypes),
};