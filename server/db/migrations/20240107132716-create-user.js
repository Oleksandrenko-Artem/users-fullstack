'use strict';
const { GENDERS } = require('./../../constants');

/** @type {import('sequelize-cli').Migration} */

// unique, allowNull, defaultValue
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      passw_hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      // male, female, other
      gender: {
        type: Sequelize.ENUM(...GENDERS),
      },
      image: {
        type: Sequelize.STRING,
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
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
