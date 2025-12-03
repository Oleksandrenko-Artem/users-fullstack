const { Task, User } = require('../db/models');

module.exports.getTasks = async (req, res, next) => {
  try {
    const foundTasks = await Task.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    });

    res.status(200).send({ data: foundTasks });
  } catch (err) {
    next(err);
  }
};
