'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {

      models.Message.hasMany(models.Like, {
        foreignKey: 'messageId'
      });

      models.Message.belongsTo(models.User, {
        foreignKey: { allowNull: false }
      });

    }
  };
  Message.init({
    content: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};