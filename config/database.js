const Sequelize = require('sequelize');
require('dotenv').config();
// Detemining whether the environment will be development (local) or production
const env = process.env.NODE_ENV || 'development';
// Importing configuration from config/config.js
const config = require('./config')[env];
// Initializing sequelize instance
let sequelize;
// Declaring which variables to use based on environment
if (env === 'production') {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
    });
}

module.exports = sequelize;