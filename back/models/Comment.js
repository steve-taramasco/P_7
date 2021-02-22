const { DataTypes } = require('sequelize');
const sequelize     = require('../connection');

const Comment = sequelize.define('comment', {

    id:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    message: { type: DataTypes.STRING, allowNull: false },
    userId : { type: DataTypes.INTEGER, allowNull: false }
},
{
    sequelize,
    timestamps: true,
    updatedAt: false,
    modelName: 'Comment',
    engine: 'INNODB'
});

module.exports = Comment;