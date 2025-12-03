'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          not: /^$/,
        },
      },
      deadline: {
        type: DataTypes.DATEONLY,
        validate: {
          // пізніше за вчора // date-fns: const yesturday = addDays(new Date(), -1)
          isAfter: new Date(
            new Date().setDate(new Date().getDate() - 15)
          ).toISOString(),
        },
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Task',
    }
  );
  return Task;
};
