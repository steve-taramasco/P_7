'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

      models.User.hasMany(models.Message)
    }
  };
  User.init({
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.STRING, defaultValue: "à propos de moi..." },
    isAdmin:{ type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};