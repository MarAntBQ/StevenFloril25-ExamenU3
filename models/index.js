'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const config = require('../config/config.js');
const db = {};

let sequelize;
if (config.development.use_env_variable) {
  sequelize = new Sequelize(process.env[config.development.use_env_variable], config.development);
} else {
  sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: false,
  });
}

// Asegúrate de que setupModels sea exportada correctamente
function setupModels(sequelize) {
  const models = [
    require('./event'),
    require('./booking'),
    // Puedes agregar más modelos aquí si los tienes
  ];

  models.forEach(model => model.init(sequelize));

  // Asociaciones
  models.forEach(model => model.associate && model.associate(sequelize.models));
}

module.exports = setupModels;
