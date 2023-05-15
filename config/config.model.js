const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_SQL,
  process.env.USERNAME_SQL,
  process.env.PASSWORD_SQL,
  {
    host: process.env.HOST_SQL,
    dialect: 'mysql',
    logging:false
  }
);
module.exports = sequelize;
