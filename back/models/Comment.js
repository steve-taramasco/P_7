const { DataTypes } = require('sequelize');
const db    = require('../config/database');
const Post = require('./Post');
const User = require('./User');

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

Comment.belongsTo(Post, { foreignKey: { name: 'postId', allowNull: false }});
Post.hasMany(Comment, { foreignKey: { name: 'postId', allowNull: false }});

Comment.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }});
User.hasMany(Comment, { foreignKey: { name: 'userId', allowNull: false }});

Comment.sync({ alter: true} );
module.exports = Comment;