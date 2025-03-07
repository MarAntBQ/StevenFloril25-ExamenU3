const { Sequelize } = require('sequelize');
const setupModels = require('../models');  

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);  

module.exports = { sequelize, models: sequelize.models };
