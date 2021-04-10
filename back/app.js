// Imports
const express       = require('express');
const helmet        = require('helmet');
const path          = require('path');
const userRoutes    = require('./routes/user');
const messageRoutes = require('./routes/message');

// Instantiate server
const app = express();

// CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Configuration 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

module.exports = app;