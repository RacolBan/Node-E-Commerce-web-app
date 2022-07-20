const config = require('../config/db.config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    config.DB,
    config.USERNAME,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.DIALECT,
        logging: false,
    }
)

module.exports = sequelize;
