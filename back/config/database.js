const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dateStrings: 'date',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});

db.sync();
module.exports = db;