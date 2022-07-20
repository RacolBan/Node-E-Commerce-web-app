const sequelize = require('./config.model.js');
const DataTypes = require('sequelize');

const OrderModel = sequelize.define("orders",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    },
    {
        timestamps: true
    }
);
module.exports = OrderModel