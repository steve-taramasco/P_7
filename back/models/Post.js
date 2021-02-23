const { DataTypes } = require('sequelize');
const db    = require('../config/database');
const User  = require('../models/User');

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

Post.belongsTo(User, { allowNull: false });
User.hasMany(Post);

Post.sync({ alter: true});
module.exports = Post;