// Imports
const express       = require('express');
const bodyParser    = require('body-parser');
const helmet        = require('helmet');
const userRoutes    = require('./routes/user');
const postRoutes    = require('./routes/post');
const db            = require('./config/database');

// Instantiate server
const app = express();

// Test dataBase
db.authenticate()
.then(() => console.log('Connection successfully.'))
.catch(err => console.error('Unable to connect to the database:', err))

// CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Configuration 
app.use(bodyParser.json());
app.use(helmet());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;