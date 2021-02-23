const { DataTypes } = require('sequelize');
const db    = require('../config/database');

const Comment = db.define('comment', {

    id:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    message: { type: DataTypes.STRING, allowNull: false },
    userId : { type: DataTypes.INTEGER, allowNull: false }
},
{
    timestamps: true,
    updatedAt: false,
    modelName: 'Comment',
    engine: 'INNODB'
});

module.exports = Comment;