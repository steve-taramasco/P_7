const { DataTypes } = require('sequelize');
const db    = require('../config/database');

const Post = db.define('post', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    message: { type: DataTypes.STRING, allowNull: false }
},
{
    timestamps: true,
    updatedAt: false,
    modelName: 'Post',
    engine: 'INNODB'
});

module.exports = Post;