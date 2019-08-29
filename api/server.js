// Imports

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const countries = require('./countries');

// Connect to routers

const userRouter = require('./user-router');
const authRouter = require('./auth-router');
// const contRouter = require('./countries-router');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger('dev'));

server.use('/api', userRouter);
server.use('/api', authRouter);
// server.use('/api', contRouter);

// Test Route

server.get('/', (req, res) => {
    res.send('Hello, this is a test');
});

module.exports = server;