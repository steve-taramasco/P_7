const { DataTypes } = require('sequelize');
const sequelize     = require('../connection');

const Post = sequelize.define('post', {

    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    timestamps: true,
    updatedAt: false,
    modelName: 'Post',
    engine: 'INNODB'
});

module.exports = Post;