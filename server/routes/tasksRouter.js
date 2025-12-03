const { Router } = require('express');
const { tasksController } = require('../controllers');

const tasksRouter = Router();

// /api/tasks
tasksRouter.get('/', tasksController.getTasks);

module.exports = tasksRouter;
