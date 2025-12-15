const _ = require('lodash');
const { User } = require('../db/models');
const createHttpError = require('http-errors');

module.exports.createUser = async (req, res, next) => {
  const { body, file } = req;

  try {
    if (file) {
      body.image = file.filename;
    }

    const createdUser = await User.create(body);

    if (!createdUser) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    const preparedUser = _.omit(createdUser.get(), [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
      limit,
      offset,
      order: ['id'],
    });

    res.status(200).send({
      data: foundUsers,
    });
  } catch (err) {
    next(err);
  }
};

// req.params.id
// .findByPk(1, { raw: true })
// [{ status, message }];
module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundUser = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
    });

    if (!foundUser) {
      return next(createHttpError(404, 'User not found ):'));
    }

    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      return next(createHttpError(404, 'User not found ):'));
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateOrCreateUser = async (req, res, next) => {
  // перевірити, чи існує 1+1=2-
  // + оновити
  // - створити

  // спробувати оновити 1
  // якщо updatedUsersCount === 1, то все, 200      1+0=1+
  // якщо updatedUsersCount === 0, то створити, 201 1+1=2+

  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      // create
      body.id = id;
      return next();
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUsersCount = await User.destroy({ where: { id } });
    if (!deletedUsersCount) {
      return next(createHttpError(404, 'User not found ):'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  const { id } = req.params;

  try {
    // чи є користувач
    // - => 404
    // + отримати його таски
    const foundUser = await User.findByPk(id);

    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    const foundUserTasks = await foundUser.getTasks({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundUserTasks });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserImage = async (req, res, next) => {
  const {
    file,
    params: { id },
  } = req;

  try {
    if (!file) {
      return next(createHttpError(422, 'Image is required'));
    }
    const [updatedUserCount, [updatedUser]] = await User.update(
      { image: file.filename },
      { where: { id }, raw: true, returning: true }
    );

    if (!updatedUserCount) {
      return next(createHttpError(404, 'User Not Found'));
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send(preparedUser);
  } catch (err) {
    next(err);
  }
};
