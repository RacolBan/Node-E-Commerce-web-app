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
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

module.exports = sequelize;
