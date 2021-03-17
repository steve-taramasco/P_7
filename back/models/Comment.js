'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {

      models.Comment.belongsTo(models.Message,
        { foreignKey: { allownull: false }});

      models.Message.hasMany(models.Comment,
        { foreignKey: { allownull: false }});

      models.Comment.belongsTo(models.User,
        { foreignKey: { allowNull: false }});

      models.User.hasMany(models.Comment,
        { foreignKey: { allowNull: false }});
    }
  };
  Comment.init({
    userId: { type: DataTypes.INTEGER, allownull: false },
    messageId: { type: DataTypes.INTEGER, allownull: false },
    content: { type: DataTypes.STRING, allownull: false }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};