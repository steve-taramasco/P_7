const { DataTypes } = require('sequelize');
const db            = require('../config/database');

const Like = db.define('like', {

    value: {
        type: DataTypes.ENUM,
        values: ['-1', '1'],
        allowNull: false
    }//,
    // userId: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    // },
    // postId: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    // },
},
{
    timestamps: false,
    modelName: 'Like',
    engine: 'INNODB'
});

module.exports = Like;