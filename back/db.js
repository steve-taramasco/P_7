'use strict'

const Sequelize = require('sequelize'); 
// const env = require('./.env');

const sequelize = new Sequelize('groupomania', 'root', 'root', {
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

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// DataBase
db.sequelize.authenticate()
.then(() => console.log('Connection successfully.'))
.catch(err => console.error('Unable to connect to the database:', err))

//Models/tables
db.users    = require('./models/User.js');
db.comments = require('./models/Comment.js');
db.posts    = require('./models/Post.js');
db.likes    = require('./models/Like.js');

// Relations
db.comments.belongsTo(db.posts, { foreignKey: { allowNull: false }});
db.posts.hasMany(db.comments);

db.posts.belongsTo(db.users, { foreignKey: { allowNull: false }});
db.users.hasMany(db.posts);

db.users.hasMany(db.comments);
db.comments.belongsTo(db.users);

db.likes.belongsTo(db.users);
db.users.hasMany(db.likes);

db.posts.hasMany(db.likes);
db.likes.belongsTo(db.posts);

db.posts.sync();
db.likes.sync();
db.users.sync();
db.comments.sync();

module.exports = db;