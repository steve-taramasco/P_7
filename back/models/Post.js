const { DataTypes } = require('sequelize');
const db            = require('../config/database');
const User          = require('../models/User');
const Like          = require('./Like');

const Post = db.define('post', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    message: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING }
},
{
    timestamps: true,
    updatedAt: false,
    modelName: 'Post',
    engine: 'INNODB'
});

    // ASSOCIATIONS //

Post.belongsTo(User, { foreignKey: { allowNull: false }});
User.hasMany(Post, { foreignKey: { allowNull: false }});

Post.belongsToMany(User, { through: Like,  });
User.belongsToMany(Post, { through: Like });

module.exports = Post;