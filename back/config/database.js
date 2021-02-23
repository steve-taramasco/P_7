const Sequelize = require('sequelize');

module.exports = new Sequelize('groupomania', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    dateStrings: 'date',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});