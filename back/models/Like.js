const { DataTypes } = require('sequelize');
const db    = require('../config/database');

const Like = db.define('like', {

    like: { type: DataTypes.INTEGER, defaultValue: 0 }
},
{
    // indexes: [
    //     {
    //         unique: true,
    //         fields: ['postId', 'userId']
    //     }
    // ]
},
{
    timestamps: false,
    modelName: 'Like',
    engine: 'INNODB'
});

Like.sync();
module.exports = Like;