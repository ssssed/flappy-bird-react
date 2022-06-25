const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { model, models } = require('../db');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const UserInfo = sequelize.define('user_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  decriptin: { type: DataTypes.STRING, allowNull: false },
  avatar: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

module.exports = {
  User,
  UserInfo,
};
