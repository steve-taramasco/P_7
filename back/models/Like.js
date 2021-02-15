const { DataTypes } = require('sequelize');
const sequelize     = require('../connection');

const Like = sequelize.define('like', {

    like: { type: DataTypes.INTEGER, defaultValue: 0 }
},
{
    indexes: [
        {
            unique: true,
            fields: ['postId', 'userId']
        }
    ]
},
{
    sequelize,
    timestamps: false,
    modelName: 'Like',
    engine: 'INNODB'
});

module.exports = Like;