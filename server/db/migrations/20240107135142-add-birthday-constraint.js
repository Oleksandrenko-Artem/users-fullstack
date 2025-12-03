'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      fields: ['birthday'],
      type: 'check',
      name: 'birthday_check',
      where: {
        // CHECK (birthday <= CURRENT_DATE)
        birthday: {
          [Op.lte]: Sequelize.literal('CURRENT_DATE'),
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'birthday_check');
  },
};
