const express = require('express');
const cors = require('cors');
const { STATIC_PATH } = require('./constants');
const { errorHandlers } = require('./middleware');
const router = require('./routes');

const app = express();

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

app.use(express.static(STATIC_PATH));

app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;

// Add endpoints handlers

// user 1:n task

// POST /api/users {}
// GET /api/users
// GET /api/users/1
// PATCH /api/users/1 {}
// DELETE /api/users/1

// отримати задачі користувача
// GET /api/users/1/tasks

// GET /api/tasks (+user)
