'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deadline: {
        type: Sequelize.DATEONLY,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('tasks', {
      fields: ['body'],
      type: 'check',
      where: {
        body: {
          [Sequelize.Op.ne]: '',
        },
      },
    });
    await queryInterface.addConstraint('tasks', {
      fields: ['deadline'],
      type: 'check',
      where: {
        deadline: {
          [Sequelize.Op.gte]: Sequelize.literal('CURRENT_DATE'),
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  },
};
