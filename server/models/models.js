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
  name: { type: DataTypes.STRING, allowNull: false },
  scores: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false },
});

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

module.exports = {
  User,
  UserInfo,
};
