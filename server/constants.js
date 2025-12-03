const path = require('path');

const CONSTANTS = {
  GENDERS: ['male', 'female', 'other'],
  STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
};

module.exports = CONSTANTS;
