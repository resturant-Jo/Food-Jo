'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const foodModel = require('./food/foodSchema');
const cartModel = require('./cart/cart');
const cartItemsModel = require('./cart/cartItems');
const userModel = require('./users');
const favModel = require('./favFood/favFood');
const orderModel = require('./order/order');
const restuarantModel = require('./restuarant/restuarant');
const admin = require('./admin/admin');

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
const cartItems = cartItemsModel(sequelize, DataTypes);
const fav = favModel(sequelize, DataTypes);
const order = orderModel(sequelize, DataTypes);
const adminModel = admin(sequelize, DataTypes);

// ------------------- RESTUARANT ----------------

user.hasMany(restuarant, { foreignKey: "userId", sourceKey: "id" });
restuarant.belongsTo(user, { foreignKey: "userId", targetKey: "id" });

restuarant.hasMany(food, { foreignKey: "restuarantId", sourceKey: "id" });
food.belongsTo(restuarant, { foreignKey: "restuarantId", targetKey: "id" });

// --------------- END RESTUARANT ----------------

// ----------------- FAV -----------------

user.hasMany(fav, { foreignKey: "userId", sourceKey: "id" });
fav.belongsTo(user, { foreignKey: "userId", targetKey: "id" });

food.hasMany(fav, { foreignKey: "foodId", sourceKey: "id" });
fav.belongsTo(food, { foreignKey: "foodId", targetKey: "id" });

// ---------------- END FAV ----------------

// ---------------- CART ------------------
user.hasMany(cart, { foreignKey: "userId", sourceKey: "id" });
cart.belongsTo(user, { foreignKey: "userId", targetKey: "id" });

cart.hasMany(order, { foreignKey: "cartId", sourceKey: "id" });
order.belongsTo(cart, { foreignKey: "cartId", targetKey: "id" });

cartItems.belongsTo(cart, { foreignKey: "cartId", targetKey: "id" });

// -------------------- END CART -----------------
user.hasMany(adminModel, { foreignKey: "userId", sourceKey: "id" });
adminModel.belongsTo(user, { foreignKey: "userId", targetKey: "id" });
// ----------------- ADMIN ------------------


const adminCollection = new Collection(adminModel);



module.exports = {
  db: sequelize,
  user: new Collection(user),
  restuarant: new Collection(restuarant),
  food: new Collection(food),

  adminModel: adminModel,
  fav: new Collection(fav),
  cart: new Collection(cart),
  cartItems: new Collection(cartItems),
  order: new Collection(order),
  users: userModel(sequelize, DataTypes),
  adminCollection: adminCollection,
};