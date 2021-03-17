'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {

    static associate(models) {

      // models.User.belongsToMany(models.Message, {
      //   through: models.Like});

      // models.Message.belongsToMany(models.User, {
      //   through: models.Like});

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      models.Like.belongsTo(models.Message, {
        foreignKey: 'messageId',
        as: 'message'
      });
    }
  };
  Like.init({
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    value: DataTypes.ENUM('1', '-1')
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};