const { Sequelize } = require('sequelize');

module.exports = new Sequelize('groupomania', 'root', 'root', {
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    host: 'localhost',
    logging: false,
    dialect: 'mysql'
});

