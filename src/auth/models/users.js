'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    username: { type: DataTypes.STRING, required: true, unique: true, allowNull: false },
    firstname: { type: DataTypes.STRING, required: true, allowNull: false },
    lastname: { type: DataTypes.STRING, required: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
    gender: { type: DataTypes.ENUM('male', 'female'), required: true },
    age: { type: DataTypes.INTEGER, required: true, allowNull: false },
    adress: { type: DataTypes.STRING, required: true, allowNull: false },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue:
        "https://spng.pngfind.com/pngs/s/39-398349_computer-icons-user-profile-facebook-instagram-instagram-profile.png",
    },
    phone: { type: DataTypes.INTEGER, required: true },
    password: { type: DataTypes.STRING, required: true, allowNull: false },

    role: { type: DataTypes.ENUM('user', 'manager', 'driver', 'admin'), required: true, defaultValue: 'user' },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          driver: ['read'],
          manager: ['read', 'create','update'],
          admin: ['read', 'create', 'update', 'delete']
        };
        return acl[this.role];
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.beforeUpdate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  };

  return model;
}

module.exports = userModel;