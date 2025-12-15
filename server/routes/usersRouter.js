const { Router } = require('express');
const { usersController } = require('../controllers');
const { paginate, upload } = require('../middleware');

// api/users
const usersRouter = Router();

usersRouter
  .route('/')
  .get(paginate.paginateUsers, usersController.getUsers)
  .post(upload.uploadUserPhoto, usersController.createUser);

usersRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .put(usersController.updateOrCreateUser, usersController.createUser)
  .delete(usersController.deleteUserById);

usersRouter.get('/:id/tasks', usersController.getUserTasks);

// save image to images
usersRouter.patch(
  '/:id/images',
  upload.uploadUserPhoto,
  usersController.updateUserImage
);

module.exports = usersRouter;

// PATCH /api/users/31/images
