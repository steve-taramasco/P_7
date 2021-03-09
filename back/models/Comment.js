const { DataTypes } = require('sequelize');
const db            = require('../config/database');
const Post          = require('./Post');
const User          = require('./User');

const Comment = db.define('comment', {
    
    id:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    comment: { type: DataTypes.STRING, allowNull: false },
},
{
    timestamps: true,
    updatedAt: false,
    modelName: 'Comment',
    engine: 'INNODB'
});

    // ASSOCIATIONS //

Comment.belongsTo(Post, { foreignKey: { allowNull: false }});
Post.hasMany(Comment, { foreignKey: { allowNull: false }});

Comment.belongsTo(User, { foreignKey: { allowNull: false }});
User.hasMany(Comment, { foreignKey: { allowNull: false }});

module.exports = Comment;