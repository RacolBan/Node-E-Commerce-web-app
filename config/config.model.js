const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_SQL,
  process.env.USERNAME_SQL,
  process.env.PASSWORD_SQL,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
  }
);
module.exports = sequelize;
