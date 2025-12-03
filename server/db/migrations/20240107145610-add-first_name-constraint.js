'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      fields: ['first_name'],
      type: 'check',
      name: 'first_name_check',
      where: {
        first_name: {
          [Sequelize.Op.regexp]: '^[A-Z][a-z]{1,63}$',
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'first_name_check');
  },
};
