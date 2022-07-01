const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { model, models } = require('../db');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  scores: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false },
});

module.exports = {
  User,
};
