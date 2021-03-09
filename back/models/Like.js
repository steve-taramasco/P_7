const { DataTypes } = require('sequelize');
const db            = require('../config/database');

const Like = db.define('like', {

    value: {
        type: DataTypes.ENUM,
        values: ['-1', '1'],
        allowNull: false
    },
},
{
    timestamps: false,
    modelName: 'Like',
    engine: 'INNODB'
});

module.exports = Like;